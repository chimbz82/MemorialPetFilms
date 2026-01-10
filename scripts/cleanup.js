import { query } from '../shared/db.js';
import { deleteFiles, listFilesByPrefix } from '../shared/s3.js';
import dotenv from 'dotenv';

dotenv.config();

console.log('Starting 30-day cleanup...');

const cutoffDate = new Date();
cutoffDate.setDate(cutoffDate.getDate() - 30);

try {
  // Get jobs older than 30 days
  const result = await query(
    `SELECT id, output_key FROM jobs WHERE created_at < $1`,
    [cutoffDate]
  );
  
  const jobIds = result.rows.map(r => r.id);
  
  console.log(`Found ${jobIds.length} jobs to clean up`);
  
  // Delete S3 files for each job
  for (const jobId of jobIds) {
    // Delete uploads/{jobId}/*
    const uploadKeys = await listFilesByPrefix(`uploads/${jobId}/`, cutoffDate);
    if (uploadKeys.length > 0) {
      await deleteFiles(uploadKeys);
      console.log(`Deleted ${uploadKeys.length} upload files for job ${jobId}`);
    }
    
    // Delete renders/{jobId}/*
    const renderKeys = await listFilesByPrefix(`renders/${jobId}/`, cutoffDate);
    if (renderKeys.length > 0) {
      await deleteFiles(renderKeys);
      console.log(`Deleted ${renderKeys.length} render files for job ${jobId}`);
    }
  }
  
  // Delete DB records (cascades to job_files and download_tokens)
  if (jobIds.length > 0) {
    await query(
      `DELETE FROM orders WHERE created_at < $1`,
      [cutoffDate]
    );
    console.log(`Deleted ${jobIds.length} database records`);
  }
  
  console.log('✓ Cleanup complete');
  process.exit(0);
  
} catch (error) {
  console.error('❌ Cleanup failed:', error);
  process.exit(1);
}