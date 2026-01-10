#!/usr/bin/env node

/**
 * Cleanup script for 30-day file retention
 * Run daily via cron: 0 2 * * * /path/to/cleanup.js
 * 
 * FIX D: Delete records based on jobs selected for cleanup,
 * not unrelated orders. Logs reflect real counts.
 */

import 'dotenv/config';
import { query } from '../shared/db.js';
import { deleteFiles, listFilesByPrefix } from '../shared/s3.js';

console.log('='.repeat(80));
console.log('Memorial Pet Films - 30-Day Cleanup');
console.log(`Started: ${new Date().toISOString()}`);
console.log('='.repeat(80));

const cutoffDate = new Date();
cutoffDate.setDate(cutoffDate.getDate() - 30);

console.log(`Cutoff date: ${cutoffDate.toISOString()}`);
console.log(`Deleting all data older than this date...`);
console.log('');

try {
  // FIX D: Get jobs older than 30 days with their associated order IDs
  const result = await query(
    `SELECT 
      j.id as job_id,
      j.output_key,
      j.order_id,
      j.created_at
    FROM jobs j
    WHERE j.created_at < $1
    ORDER BY j.created_at`,
    [cutoffDate]
  );
  
  const jobs = result.rows;
  
  console.log(`Found ${jobs.length} jobs older than 30 days`);
  
  if (jobs.length === 0) {
    console.log('✓ No jobs to clean up');
    console.log('='.repeat(80));
    process.exit(0);
  }
  
  console.log('');
  
  // Track statistics
  let totalFilesDeleted = 0;
  let jobsWithFiles = 0;
  
  // Delete S3 files for each job
  for (const job of jobs) {
    const jobId = job.job_id;
    const createdDaysAgo = Math.floor((Date.now() - new Date(job.created_at)) / (1000 * 60 * 60 * 24));
    
    console.log(`Processing job ${jobId} (created ${createdDaysAgo} days ago)...`);
    
    let jobFilesDeleted = 0;
    
    // Delete uploads/{jobId}/*
    const uploadKeys = await listFilesByPrefix(`uploads/${jobId}/`);
    if (uploadKeys.length > 0) {
      await deleteFiles(uploadKeys);
      jobFilesDeleted += uploadKeys.length;
      console.log(`  ✓ Deleted ${uploadKeys.length} upload files`);
    }
    
    // Delete renders/{jobId}/*
    const renderKeys = await listFilesByPrefix(`renders/${jobId}/`);
    if (renderKeys.length > 0) {
      await deleteFiles(renderKeys);
      jobFilesDeleted += renderKeys.length;
      console.log(`  ✓ Deleted ${renderKeys.length} render files`);
    }
    
    if (jobFilesDeleted > 0) {
      jobsWithFiles++;
      totalFilesDeleted += jobFilesDeleted;
    } else {
      console.log(`  - No S3 files found`);
    }
  }
  
  console.log('');
  console.log('S3 cleanup complete');
  console.log('');
  
  // Delete expired download tokens (regardless of job age)
  const expiredTokens = await query(
    `DELETE FROM download_tokens WHERE expires_at < NOW() RETURNING token`
  );
  console.log(`✓ Deleted ${expiredTokens.rows.length} expired download tokens`);
  
  // FIX D: Delete database records for these specific jobs
  // This will cascade to job_files and download_tokens via FK constraints
  const jobIds = jobs.map(j => j.job_id);
  
  if (jobIds.length > 0) {
    // Get unique order IDs that are associated ONLY with old jobs
    const ordersToDelete = await query(
      `SELECT DISTINCT o.id, o.stripe_session_id
       FROM orders o
       WHERE NOT EXISTS (
         SELECT 1 FROM jobs j 
         WHERE j.order_id = o.id 
         AND j.created_at >= $1
       )
       AND o.created_at < $1`,
      [cutoffDate]
    );
    
    // Delete orders (this will cascade delete associated jobs)
    if (ordersToDelete.rows.length > 0) {
      const orderIds = ordersToDelete.rows.map(o => o.id);
      const placeholders = orderIds.map((_, i) => `$${i + 1}`).join(',');
      
      await query(
        `DELETE FROM orders WHERE id IN (${placeholders})`,
        orderIds
      );
      
      console.log(`✓ Deleted ${ordersToDelete.rows.length} orders (cascade deletes jobs, job_files, download_tokens)`);
    } else {
      console.log(`✓ No orders to delete (all have recent jobs)`);
    }
  }
  
  console.log('');
  console.log('='.repeat(80));
  console.log('CLEANUP SUMMARY');
  console.log('='.repeat(80));
  console.log(`Jobs processed:       ${jobs.length}`);
  console.log(`Jobs with S3 files:   ${jobsWithFiles}`);
  console.log(`Total S3 files:       ${totalFilesDeleted}`);
  console.log(`Expired tokens:       ${expiredTokens.rows.length}`);
  console.log(`Database records:     ${jobs.length} jobs + associated data`);
  console.log('='.repeat(80));
  console.log(`Completed: ${new Date().toISOString()}`);
  console.log('='.repeat(80));
  
  process.exit(0);
  
} catch (error) {
  console.error('');
  console.error('='.repeat(80));
  console.error('❌ CLEANUP FAILED');
  console.error('='.repeat(80));
  console.error('Error:', error.message);
  console.error('Stack:', error.stack);
  console.error('='.repeat(80));
  process.exit(1);
}
