import AWS from 'aws-sdk';
import logger from '../utils/logger.js';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

/**
 * Generate a signed URL for private file download
 */
export async function getSignedDownloadUrl(key, expiresIn = 3600) {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
      Expires: expiresIn
    };

    return await s3.getSignedUrlPromise('getObject', params);
  } catch (error) {
    logger.error('S3 Signed URL Error:', error);
    throw error;
  }
}

/**
 * Upload a file to S3
 */
export async function uploadToS3(key, body, contentType) {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: body,
      ContentType: contentType
    };

    return await s3.upload(params).promise();
  } catch (error) {
    logger.error('S3 Upload Error:', error);
    throw error;
  }
}