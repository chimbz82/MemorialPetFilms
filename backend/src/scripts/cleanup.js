import { S3Client, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const RETENTION_DAYS = parseInt(process.env.FILE_RETENTION_DAYS) || 30;

async function cleanupOldFiles() {
  logger.info(`Starting cleanup of files older than ${RETENTION_DAYS} days`);
  
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - RETENTION_DAYS);
  
  const folders = ['uploads/', 'audio/', 'videos/'];
  let deletedCount = 0;
  
  for (const folder of folders) {
    try {
      const listCommand = new ListObjectsV2Command({
        Bucket: BUCKET_NAME,
        Prefix: folder
      });
      
      const response = await s3Client.send(listCommand);
      
      if (!response.Contents) continue;
      
      for (const obj of response.Contents) {
        if (obj.LastModified && obj.LastModified < cutoffDate) {
          const deleteCommand = new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: obj.Key
          });
          
          await s3Client.send(deleteCommand);
          deletedCount++;
          
          logger.info(`Deleted: ${obj.Key}`);
        }
      }
    } catch (error) {
      logger.error(`Error cleaning up ${folder}:`, error);
    }
  }
  
  logger.info(`Cleanup complete. Deleted ${deletedCount} files.`);
}

// Run cleanup
cleanupOldFiles()
  .then(() => process.exit(0))
  .catch((error) => {
    logger.error('Cleanup failed:', error);
    process.exit(1);
  });