// Fixed imports/**
 * Memorial Pet Films - API Server
 * Production-ready backend with real FFmpeg rendering
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import Stripe from 'stripe';
import { Queue } from 'bullmq';
import { nanoid } from 'nanoid';
import { query, transaction } from '../shared/db.js';
import { validateTemplate, validateLibraryTrack } from '../shared/templates.js';
import { 
  getPresignedUploadUrl, 
  getPresignedDownloadUrl, 
  ALLOWED_TYPES, 
  MAX_SIZES, 
  MAX_COUNTS 
} from '../shared/s3.js';

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Redis connection for BullMQ
const redisConnection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379')
};

// Create render queue
const renderQueue = new Queue('render', { connection: redisConnection });

// Middleware
app.use(helmet());
app.use(cors({ 
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true 
}));

// Rate limiters
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: { error: 'Too many requests' }
});

const checkoutLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: { error: 'Too many checkout attempts' }
});

const presignLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 50,
  message: { error: 'Too many presign requests' }
});

app.use(generalLimiter);

// Body parsing - RAW for webhooks, JSON for others
app.use('/webhook/stripe', express.raw({ type: 'application/json' }));
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'memorial-pet-films-api'
  });
});

//==============================================================================
// CREATE JOB
//==============================================================================
app.post('/api/jobs', async (req, res) => {
  try {
    const { 
      templateId, 
      petName, 
      petBirthDate, 
      petPassedDate, 
      message, 
      musicSource, 
      musicTrackId, 
      musicUploadKey 
    } = req.body;
    
    // Validation
    if (!templateId || !validateTemplate(templateId)) {
      return res.status(400).json({ error: 'Invalid template' });
    }
    
    if (!petName || petName.trim().length === 0) {
      return res.status(400).json({ error: 'Pet name required' });
    }
    
    if (!musicSource || !['library', 'upload'].includes(musicSource)) {
      return res.status(400).json({ error: 'Invalid music source' });
    }
    
    // FIX C: Enforce music validation based on source
    if (musicSource === 'library') {
      if (!musicTrackId || !validateLibraryTrack(musicTrackId)) {
        return res.status(400).json({ error: 'Valid library track required when using library music' });
      }
    }
    
    if (musicSource === 'upload') {
      if (!musicUploadKey) {
        return res.status(400).json({ error: 'Music upload key required when using uploaded music' });
      }
    }
    
    // Create job
    const result = await query(
      `INSERT INTO jobs (
        template_id, pet_name, pet_birth_date, pet_passed_date, 
        message, music_source, music_key_or_track_id, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending')
      RETURNING id`,
      [
        templateId,
        petName.trim(),
        petBirthDate || null,
        petPassedDate || null,
        message || null,
        musicSource,
        musicSource === 'library' ? musicTrackId : musicUploadKey
      ]
    );
    
    const jobId = result.rows[0].id;
    
    console.log(`✓ Created job: ${jobId}`);
    
    res.json({ jobId });
    
  } catch (error) {
    console.error('Job creation error:', error);
    res.status(500).json({ error: 'Failed to create job' });
  }
});

//==============================================================================
// GET JOB STATUS
//==============================================================================
app.get('/api/jobs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await query(
      `SELECT 
        j.id, j.status, j.progress, j.error, j.output_key, j.completed_at,
        dt.token as download_token
      FROM jobs j
      LEFT JOIN download_tokens dt ON dt.job_id = j.id AND dt.expires_at > NOW()
      WHERE j.id = $1`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    const job = result.rows[0];
    
    const response = {
      jobId: job.id,
      status: job.status,
      progress: job.progress,
      error: job.error
    };
    
    if (job.status === 'completed' && job.download_token) {
      response.downloadUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/download/${job.download_token}`;
    }
    
    res.json(response);
    
  } catch (error) {
    console.error('Job status error:', error);
    res.status(500).json({ error: 'Failed to get job status' });
  }
});

//==============================================================================
// PRESIGNED UPLOAD URLS
//==============================================================================
app.post('/api/presign', presignLimiter, async (req, res) => {
  try {
    const { jobId, files } = req.body;
    
    if (!jobId || !files || !Array.isArray(files)) {
      return res.status(400).json({ error: 'Invalid request' });
    }
    
    // Verify job exists
    const jobCheck = await query('SELECT id FROM jobs WHERE id = $1', [jobId]);
    if (jobCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    // FIX B: Count existing files by kind and enforce limits
    const existingCounts = await query(
      `SELECT kind, COUNT(*)::integer as count 
       FROM job_files 
       WHERE job_id = $1 
       GROUP BY kind`,
      [jobId]
    );
    
    const counts = {
      image: 0,
      video: 0,
      audio: 0
    };
    
    existingCounts.rows.forEach(row => {
      counts[row.kind] = row.count;
    });
    
    // Count requested files by kind
    const requestedCounts = { image: 0, video: 0, audio: 0 };
    for (const file of files) {
      if (!['image', 'video', 'audio'].includes(file.kind)) {
        return res.status(400).json({ error: `Invalid kind: ${file.kind}` });
      }
      requestedCounts[file.kind]++;
    }
    
    // Check if adding requested files would exceed limits
    for (const kind of ['image', 'video', 'audio']) {
      const totalCount = counts[kind] + requestedCounts[kind];
      if (totalCount > MAX_COUNTS[kind]) {
        return res.status(400).json({ 
          error: `Maximum ${MAX_COUNTS[kind]} ${kind} files allowed. You already have ${counts[kind]} and are trying to add ${requestedCounts[kind]}.` 
        });
      }
    }
    
    // Process upload requests
    const uploads = [];
    
    for (const file of files) {
      const { kind, filename, contentType } = file;
      
      // Validate content type
      if (!ALLOWED_TYPES[kind]?.includes(contentType)) {
        return res.status(400).json({ 
          error: `Invalid content type ${contentType} for ${kind}. Allowed: ${ALLOWED_TYPES[kind].join(', ')}` 
        });
      }
      
      // FIXED: Get all fields from presigned POST including 'fields'
      const { url, fields, key, filename: safeFilename, maxSize } = await getPresignedUploadUrl(
        jobId, 
        kind, 
        filename, 
        contentType
      );
      
      // Store file reference
      await query(
        `INSERT INTO job_files (job_id, kind, s3_key, filename, content_type)
         VALUES ($1, $2, $3, $4, $5)`,
        [jobId, kind, key, filename, contentType]
      );
      
      // FIXED: Return all necessary fields for presigned POST upload
      uploads.push({ 
        url,
        fields,  // ← CRITICAL FIX: Must include fields for POST upload
        key, 
        filename: safeFilename,
        maxSize
      });
    }
    
    console.log(`✓ Generated ${uploads.length} presigned URLs for job ${jobId}`);
    
    res.json({ uploads });
    
  } catch (error) {
    console.error('Presign error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate upload URLs' });
  }
});

//==============================================================================
// CREATE CHECKOUT SESSION
//==============================================================================
app.post('/api/checkout/session', checkoutLimiter, async (req, res) => {
  try {
    const { jobId, plan, email } = req.body;
    
    // Validation
    if (!jobId || !plan || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (!['standard', 'premium', 'rush'].includes(plan)) {
      return res.status(400).json({ error: 'Invalid plan' });
    }
    
    // Verify job exists and has minimum files
    const jobCheck = await query(
      `SELECT 
        j.id,
        j.music_source,
        j.music_key_or_track_id,
        COUNT(jf.id) FILTER (WHERE jf.kind IN ('image', 'video'))::integer as media_count
       FROM jobs j
       LEFT JOIN job_files jf ON jf.job_id = j.id
       WHERE j.id = $1
       GROUP BY j.id, j.music_source, j.music_key_or_track_id`,
      [jobId]
    );
    
    if (jobCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    const job = jobCheck.rows[0];
    
    if (job.media_count < 5) {
      return res.status(400).json({ error: 'Minimum 5 images/videos required' });
    }
    
    // Verify music requirements are met
    if (job.music_source === 'library' && !validateLibraryTrack(job.music_key_or_track_id)) {
      return res.status(400).json({ error: 'Invalid library track' });
    }
    
    if (job.music_source === 'upload' && !job.music_key_or_track_id) {
      return res.status(400).json({ error: 'Audio file not uploaded' });
    }
    
    // Get Stripe price ID
    const priceIds = {
      standard: process.env.STRIPE_PRICE_STANDARD,
      premium: process.env.STRIPE_PRICE_PREMIUM,
      rush: process.env.STRIPE_PRICE_RUSH
    };
    
    if (!priceIds[plan]) {
      return res.status(500).json({ error: 'Stripe price not configured for this plan' });
    }
    
    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: priceIds[plan],
        quantity: 1
      }],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      customer_email: email,
      metadata: {
        jobId,
        plan
      }
    });
    
    // Create order record
    await query(
      `INSERT INTO orders (email, plan, stripe_session_id, status)
       VALUES ($1, $2, $3, 'pending')`,
      [email, plan, session.id]
    );
    
    // Link order to job
    await query(
      `UPDATE jobs 
       SET order_id = (SELECT id FROM orders WHERE stripe_session_id = $1)
       WHERE id = $2`,
      [session.id, jobId]
    );
    
    console.log(`✓ Created checkout session for job ${jobId}`);
    
    res.json({ 
      sessionId: session.id,
      url: session.url 
    });
    
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

//==============================================================================
// STRIPE WEBHOOK
//==============================================================================
app.post('/webhook/stripe', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const { jobId, plan } = session.metadata;
      
      console.log(`✓ Payment completed for job ${jobId}`);
      
      // Update order
      await query(
        `UPDATE orders 
         SET status = 'paid', 
             paid_at = NOW(), 
             amount_paid = $1,
             stripe_payment_intent = $2
         WHERE stripe_session_id = $3`,
        [session.amount_total, session.payment_intent, session.id]
      );
      
      // Fetch complete job data including all file keys
      const jobData = await query(
        `SELECT 
          j.id,
          j.template_id,
          j.pet_name,
          j.pet_birth_date,
          j.pet_passed_date,
          j.message,
          j.music_source,
          j.music_key_or_track_id,
          o.email,
          COALESCE(
            ARRAY_AGG(jf.s3_key ORDER BY jf.created_at) FILTER (WHERE jf.s3_key IS NOT NULL),
            ARRAY[]::text[]
          ) as file_keys
        FROM jobs j
        JOIN orders o ON o.id = j.order_id
        LEFT JOIN job_files jf ON jf.job_id = j.id
        WHERE j.id = $1
        GROUP BY j.id, j.template_id, j.pet_name, j.pet_birth_date, 
                 j.pet_passed_date, j.message, j.music_source, 
                 j.music_key_or_track_id, o.email`,
        [jobId]
      );
      
      if (jobData.rows.length === 0) {
        throw new Error(`Job ${jobId} not found`);
      }
      
      const job = jobData.rows[0];
      
      // Update job status
      await query(
        `UPDATE jobs SET status = 'queued' WHERE id = $1`,
        [jobId]
      );
      
      // Queue render job with full payload
      await renderQueue.add('render-video', {
        jobId: job.id,
        templateId: job.template_id,
        petName: job.pet_name,
        petBirthDate: job.pet_birth_date,
        petPassedDate: job.pet_passed_date,
        message: job.message,
        musicSource: job.music_source,
        musicKeyOrTrackId: job.music_key_or_track_id,
        fileKeys: job.file_keys,
        email: job.email,
        plan
      }, {
        priority: plan === 'rush' ? 1 : (plan === 'premium' ? 2 : 3),
        attempts: 3,
        backoff: { type: 'exponential', delay: 5000 }
      });
      
      console.log(`✓ Queued render job ${jobId} with ${job.file_keys.length} files`);
    }
    
    res.json({ received: true });
    
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

//==============================================================================
// DOWNLOAD VIDEO
//==============================================================================
app.get('/download/:token', async (req, res) => {
  try {
    const { token } = req.params;
    
    // Fetch token and job data
    const result = await query(
      `SELECT dt.*, j.output_key, j.status, o.email
       FROM download_tokens dt
       JOIN jobs j ON j.id = dt.job_id
       JOIN orders o ON o.id = j.order_id
       WHERE dt.token = $1 AND dt.expires_at > NOW()`,
      [token]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Invalid or expired download link' });
    }
    
    const { output_key, job_id, status } = result.rows[0];
    
    if (status !== 'completed') {
      return res.status(400).json({ error: 'Video not ready yet', status });
    }
    
    if (!output_key) {
      return res.status(400).json({ error: 'Video file not found' });
    }
    
    // Update access tracking
    await query(
      `UPDATE download_tokens 
       SET accessed_at = NOW(), access_count = access_count + 1
       WHERE token = $1`,
      [token]
    );
    
    // Generate signed download URL (1 hour expiry)
    const downloadUrl = await getPresignedDownloadUrl(output_key, 3600);
    
    console.log(`✓ Download requested for job ${job_id} (token: ${token.substring(0, 8)}...)`);
    
    // Redirect to signed URL
    res.redirect(downloadUrl);
    
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Failed to generate download link' });
  }
});

//==============================================================================
// 404 Handler
//==============================================================================
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

//==============================================================================
// Error Handler
//==============================================================================
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

//==============================================================================
// START SERVER
//==============================================================================
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✓ Memorial Pet Films API running on port ${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✓ Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`✓ Stripe configured: ${!!process.env.STRIPE_SECRET_KEY}`);
  console.log(`✓ S3 bucket: ${process.env.AWS_BUCKET_NAME}`);
});
