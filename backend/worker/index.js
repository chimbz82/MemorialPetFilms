/**
 * Memorial Pet Films - Video Rendering Worker
 * Real FFmpeg implementation with title cards, image/video processing, and audio
 */

import 'dotenv/config';
import { Worker } from 'bullmq';
import ffmpeg from 'fluent-ffmpeg';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';
import nodemailer from 'nodemailer';
import { query } from '../shared/db.js';
import { getTemplate, getLibraryTrackPath } from '../shared/templates.js';
import { uploadFile, downloadFile } from '../shared/s3.js';

const ffprobeAsync = promisify(ffmpeg.ffprobe);

// Redis connection
const redisConnection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379')
};

// Temp working directory
const TEMP_DIR = '/tmp/memorial-renders';
await fs.mkdir(TEMP_DIR, { recursive: true });

// Email transporter
const emailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.sendgrid.net',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'apikey',
    pass: process.env.SMTP_PASS
  }
});

//==============================================================================
// MAIN WORKER
//==============================================================================
const worker = new Worker('render', async (job) => {
  const { jobId, templateId, petName, petBirthDate, petPassedDate, message, 
          musicSource, musicKeyOrTrackId, fileKeys, email, plan } = job.data;
  
  console.log(`[Job ${jobId}] Starting render`);
  console.log(`[Job ${jobId}] Template: ${templateId}, Files: ${fileKeys.length}, Music: ${musicSource}`);
  
  const workDir = path.join(TEMP_DIR, jobId);
  await fs.mkdir(workDir, { recursive: true });
  
  try {
    // Update job status
    await query(
      `UPDATE jobs SET status = 'processing', started_at = NOW(), progress = 0 WHERE id = $1`,
      [jobId]
    );
    await job.updateProgress(0);
    
    // Get template config
    const template = getTemplate(templateId);
    const resolution = plan === 'standard' ? '1280x720' : '1920x1080';
    
    console.log(`[Job ${jobId}] Resolution: ${resolution}, Photo duration: ${template.photoDuration}s`);
    
    // Step 1: Download media files from S3 (20% progress)
    await job.updateProgress(10);
    const mediaFiles = await downloadMediaFiles(workDir, fileKeys);
    console.log(`[Job ${jobId}] Downloaded ${mediaFiles.length} media files`);
    
    // Step 2: Get audio file (25% progress)
    await job.updateProgress(20);
    const audioPath = await getAudioFile(workDir, musicSource, musicKeyOrTrackId);
    console.log(`[Job ${jobId}] Audio ready: ${path.basename(audioPath)}`);
    
    // Step 3: Create title card (30% progress)
    await job.updateProgress(25);
    const titleCardPath = await createTitleCard(workDir, petName, petBirthDate, petPassedDate, message);
    console.log(`[Job ${jobId}] Title card created`);
    
    // Step 4: Process media files (50% progress)
    await job.updateProgress(30);
    const processedMedia = await processMediaFiles(workDir, mediaFiles, template, (progress) => {
      const overallProgress = 30 + (progress * 0.2);
      job.updateProgress(overallProgress).catch(() => {});
    });
    console.log(`[Job ${jobId}] Processed ${processedMedia.length} media files`);
    
    // Step 5: Calculate durations
    const photoDuration = template.photoDuration;
    const allMedia = [titleCardPath, ...processedMedia];
    const totalVideoDuration = allMedia.length * photoDuration;
    
    console.log(`[Job ${jobId}] Total video duration: ${totalVideoDuration}s (${allMedia.length} clips)`);
    
    // Step 6: Process audio (60% progress)
    await job.updateProgress(50);
    const finalAudioPath = await processAudio(workDir, audioPath, totalVideoDuration);
    console.log(`[Job ${jobId}] Audio processed with fades`);
    
    // Step 7: Create concat file (65% progress)
    await job.updateProgress(60);
    const concatFile = await createConcatFile(workDir, allMedia, photoDuration);
    
    // Step 8: Render final video (85% progress)
    await job.updateProgress(65);
    const outputPath = path.join(workDir, 'final.mp4');
    await renderFinalVideo(concatFile, finalAudioPath, outputPath, resolution, template, (progress) => {
      const overallProgress = 65 + (progress * 0.2);
      job.updateProgress(overallProgress).catch(() => {});
    });
    console.log(`[Job ${jobId}] Video rendered: ${outputPath}`);
    
    // Step 9: Upload to S3 (90% progress)
    await job.updateProgress(85);
    const videoBuffer = await fs.readFile(outputPath);
    const outputKey = `renders/${jobId}/final.mp4`;
    await uploadFile(outputKey, videoBuffer, 'video/mp4');
    console.log(`[Job ${jobId}] Uploaded to S3: ${outputKey}`);
    
    // Step 10: Create download token (95% progress)
    await job.updateProgress(90);
    const downloadToken = nanoid(64);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    
    await query(
      `INSERT INTO download_tokens (token, job_id, expires_at)
       VALUES ($1, $2, $3)`,
      [downloadToken, jobId, expiresAt]
    );
    
    // Step 11: Update job as completed
    await query(
      `UPDATE jobs 
       SET status = 'completed', output_key = $1, progress = 100, completed_at = NOW()
       WHERE id = $2`,
      [outputKey, jobId]
    );
    
    // Step 12: Send email
    const downloadUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/download/${downloadToken}`;
    await sendCompletionEmail(email, petName, downloadUrl);
    console.log(`[Job ${jobId}] Completion email sent to ${email}`);
    
    // Cleanup temp files
    await fs.rm(workDir, { recursive: true, force: true });
    console.log(`[Job ${jobId}] Temp files cleaned up`);
    
    await job.updateProgress(100);
    console.log(`[Job ${jobId}] ✓ COMPLETED SUCCESSFULLY`);
    
  } catch (error) {
    console.error(`[Job ${jobId}] ✗ FAILED:`, error);
    
    // Update job as failed
    await query(
      `UPDATE jobs SET status = 'failed', error = $1 WHERE id = $2`,
      [error.message, jobId]
    );
    
    // Cleanup temp files
    try {
      await fs.rm(workDir, { recursive: true, force: true });
    } catch (cleanupError) {
      console.error(`[Job ${jobId}] Cleanup error:`, cleanupError);
    }
    
    throw error;
  }
}, { 
  connection: redisConnection,
  concurrency: 2 // Process 2 videos simultaneously
});

//==============================================================================
// HELPER FUNCTIONS
//==============================================================================

async function downloadMediaFiles(workDir, fileKeys) {
  const files = [];
  
  for (let i = 0; i < fileKeys.length; i++) {
    const key = fileKeys[i];
    const ext = path.extname(key);
    const localPath = path.join(workDir, `media_${String(i).padStart(3, '0')}${ext}`);
    
    try {
      const stream = await downloadFile(key);
      const chunks = [];
      
      for await (const chunk of stream) {
        chunks.push(chunk);
      }
      
      await fs.writeFile(localPath, Buffer.concat(chunks));
      files.push(localPath);
    } catch (error) {
      console.error(`Error downloading ${key}:`, error);
      throw new Error(`Failed to download media file: ${key}`);
    }
  }
  
  return files;
}

async function getAudioFile(workDir, musicSource, musicKeyOrTrackId) {
  if (musicSource === 'library') {
    return getLibraryTrackPath(musicKeyOrTrackId);
  } else {
    // Download uploaded audio from S3
    const localPath = path.join(workDir, 'uploaded_audio.mp3');
    const stream = await downloadFile(musicKeyOrTrackId);
    const chunks = [];
    
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    
    await fs.writeFile(localPath, Buffer.concat(chunks));
    return localPath;
  }
}

async function createTitleCard(workDir, petName, birthDate, passedDate, message) {
  const outputPath = path.join(workDir, 'title.png');
  
  return new Promise((resolve, reject) => {
    const dateText = [birthDate, passedDate].filter(Boolean).join(' - ') || '';
    
    const filters = [
      `drawtext=text='${escapeText(petName)}':fontsize=80:fontcolor=white:` +
      `x=(w-text_w)/2:y=(h-text_h)/2-80:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf`
    ];
    
    if (dateText) {
      filters.push(
        `drawtext=text='${escapeText(dateText)}':fontsize=40:fontcolor=white:` +
        `x=(w-text_w)/2:y=(h-text_h)/2:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf`
      );
    }
    
    if (message) {
      // Split long messages into multiple lines
      const words = message.split(' ');
      const lines = [];
      let currentLine = '';
      
      for (const word of words) {
        if ((currentLine + ' ' + word).length > 40) {
          lines.push(currentLine.trim());
          currentLine = word;
        } else {
          currentLine += (currentLine ? ' ' : '') + word;
        }
      }
      if (currentLine) lines.push(currentLine.trim());
      
      lines.forEach((line, idx) => {
        filters.push(
          `drawtext=text='${escapeText(line)}':fontsize=28:fontcolor=white:` +
          `x=(w-text_w)/2:y=(h-text_h)/2+100+${idx * 35}:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSerif-Italic.ttf`
        );
      });
    }
    
    ffmpeg()
      .input('color=c=#2c2c2c:s=1920x1080:d=5')
      .inputFormat('lavfi')
      .complexFilter(filters)
      .frames(1)
      .output(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', reject)
      .run();
  });
}

async function processMediaFiles(workDir, files, template, progressCallback) {
  const processed = [];
  const total = files.length;
  
  for (let i = 0; i < files.length; i++) {
    const inputPath = files[i];
    const outputPath = path.join(workDir, `processed_${String(i).padStart(3, '0')}.mp4`);
    
    // Check if video or image
    try {
      const metadata = await ffprobeAsync(inputPath);
      const isVideo = metadata.streams.some(s => s.codec_type === 'video');
      
      if (isVideo) {
        await processVideo(inputPath, outputPath, template);
      } else {
        await processImage(inputPath, outputPath, template);
      }
      
      processed.push(outputPath);
      
      if (progressCallback) {
        progressCallback((i + 1) / total);
      }
    } catch (error) {
      console.error(`Error processing ${inputPath}:`, error);
      throw new Error(`Failed to process media file: ${path.basename(inputPath)}`);
    }
  }
  
  return processed;
}

async function processVideo(inputPath, outputPath, template) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .setDuration(template.photoDuration)
      .size('1920x1080')
      .aspect('16:9')
      .autopad()
      .videoCodec('libx264')
      .outputOptions(['-pix_fmt yuv420p', '-preset fast', '-crf 23'])
      .output(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', reject)
      .run();
  });
}

async function processImage(inputPath, outputPath, template) {
  return new Promise((resolve, reject) => {
    let filters = [
      'scale=1920:1080:force_original_aspect_ratio=decrease',
      'pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=#2c2c2c'
    ];
    
    // Apply Ken Burns zoom effect if template requires
    if (template.kenBurns) {
      filters.push("zoompan=z='min(zoom+0.0015,1.5)':d=125:s=1920x1080:fps=25");
    }
    
    ffmpeg()
      .input(inputPath)
      .loop(template.photoDuration)
      .fps(25)
      .complexFilter(filters)
      .outputOptions(['-pix_fmt yuv420p', '-t', template.photoDuration])
      .output(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', reject)
      .run();
  });
}

async function processAudio(workDir, audioPath, videoDuration) {
  const outputPath = path.join(workDir, 'audio_final.mp3');
  
  // Get audio duration
  const metadata = await ffprobeAsync(audioPath);
  const audioDuration = parseFloat(metadata.format.duration);
  
  console.log(`Audio duration: ${audioDuration}s, Video duration: ${videoDuration}s`);
  
  return new Promise((resolve, reject) => {
    let command = ffmpeg(audioPath);
    
    // If audio is shorter than video, loop it
    if (audioDuration < videoDuration) {
      const loopCount = Math.ceil(videoDuration / audioDuration);
      console.log(`Looping audio ${loopCount} times`);
      command = ffmpeg().input(audioPath).inputOptions([`-stream_loop ${loopCount}`]);
    }
    
    // Audio filters: fade in 1.5s, fade out 2.5s, volume 30%
    const fadeOutStart = Math.max(0, videoDuration - 2.5);
    command
      .audioFilters([
        'volume=0.3',
        'afade=t=in:st=0:d=1.5',
        `afade=t=out:st=${fadeOutStart}:d=2.5`
      ])
      .setDuration(videoDuration)
      .audioCodec('libmp3lame')
      .audioBitrate('192k')
      .output(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', reject)
      .run();
  });
}

async function createConcatFile(workDir, mediaFiles, photoDuration) {
  const concatPath = path.join(workDir, 'concat.txt');
  
  const content = mediaFiles.map(file => 
    `file '${file}'\nduration ${photoDuration}`
  ).join('\n') + `\nfile '${mediaFiles[mediaFiles.length - 1]}'`;
  
  await fs.writeFile(concatPath, content);
  return concatPath;
}

async function renderFinalVideo(concatFile, audioPath, outputPath, resolution, template, progressCallback) {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(concatFile)
      .inputOptions(['-f concat', '-safe 0'])
      .input(audioPath)
      .videoCodec('libx264')
      .audioCodec('aac')
      .audioBitrate('192k')
      .size(resolution)
      .fps(25)
      .outputOptions([
        '-pix_fmt yuv420p',
        '-preset fast',
        '-crf 23',
        '-movflags +faststart',
        '-shortest',
        '-map 0:v',
        '-map 1:a'
      ])
      .output(outputPath)
      .on('progress', (progress) => {
        if (progress.percent && progressCallback) {
          progressCallback(progress.percent / 100);
        }
      })
      .on('end', () => resolve(outputPath))
      .on('error', reject)
      .run();
  });
}

async function sendCompletionEmail(email, petName, downloadUrl) {
  try {
    await emailTransporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@memorialpetfilms.com',
      to: email,
      subject: `Your Memorial Film for ${petName} is Ready`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Georgia, serif; color: #4a4a4a; line-height: 1.6; background: #f5f5f0; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; padding: 40px; background: white; border-radius: 12px; }
            .header { text-align: center; margin-bottom: 30px; }
            h1 { color: #2c2c2c; font-size: 28px; margin: 0; }
            .button { 
              display: inline-block;
              background: #FFB347;
              color: #2c2c2c;
              padding: 16px 32px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
              margin: 20px 0;
            }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🐾 Your Memorial Film is Ready</h1>
            </div>
            
            <p>Dear Friend,</p>
            
            <p>Your memorial film for <strong>${petName}</strong> has been completed with care and respect.</p>
            
            <p>This is a private download link that will remain active for 7 days. All files are automatically and permanently deleted from our servers after 30 days.</p>
            
            <p style="text-align: center;">
              <a href="${downloadUrl}" class="button">Download Your Memorial Film</a>
            </p>
            
            <p><strong>Technical Details:</strong></p>
            <ul>
              <li>Format: MP4 (H.264 with AAC audio)</li>
              <li>Compatible with all devices</li>
              <li>Download link expires in 7 days</li>
              <li>Files permanently deleted after 30 days</li>
            </ul>
            
            <p style="margin-top: 30px; font-size: 14px; color: #666; font-style: italic;">
              We hope this tribute brings you comfort during this difficult time.
            </p>
            
            <div class="footer">
              <p>If you have any questions or concerns, please contact us at:</p>
              <p><strong>${process.env.EMAIL_CONTACT || 'MemorialPetFilms@protonmail.com'}</strong></p>
              <p style="margin-top: 20px;">© ${new Date().getFullYear()} Memorial Pet Films<br>All memories kept safe.</p>
            </div>
          </div>
        </body>
        </html>
      `
    });
    
    console.log(`✓ Completion email sent to ${email}`);
  } catch (error) {
    console.error('Failed to send completion email:', error);
    // Don't throw - email failure shouldn't fail the entire job
  }
}

function escapeText(text) {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\\\\\\\')
    .replace(/'/g, "'\\\\\\\\\\\\''")
    .replace(/:/g, '\\\\:')
    .replace(/\n/g, ' ');
}

//==============================================================================
// WORKER EVENTS
//==============================================================================
worker.on('completed', (job) => {
  console.log(`✓ Job ${job.id} completed successfully`);
});

worker.on('failed', (job, err) => {
  console.error(`✗ Job ${job?.id} failed:`, err.message);
});

worker.on('error', (err) => {
  console.error('Worker error:', err);
});

console.log('✓ Memorial Pet Films Worker started');
console.log(`✓ Concurrency: 2 videos at a time`);
console.log(`✓ Temp directory: ${TEMP_DIR}`);
console.log(`✓ Library audio: ${process.env.LIBRARY_AUDIO_DIR || './library-audio'}`);
