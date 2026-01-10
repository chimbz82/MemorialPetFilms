import { 
  S3Client, 
  PutObjectCommand, 
  GetObjectCommand,
  DeleteObjectsCommand,
  ListObjectsV2Command
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'eu-west-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const BUCKET = process.env.AWS_BUCKET_NAME || 'memorial-pet-films';

export const ALLOWED_TYPES = {
  image: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  video: ['video/mp4', 'video/quicktime'],
  audio: ['audio/mpeg', 'audio/mp4', 'audio/x-m4a', 'audio/wav']
};

export const MAX_SIZES = {
  image: 50 * 1024 * 1024,
  video: 100 * 1024 * 1024,
  audio: 20 * 1024 * 1024
};

export const MAX_COUNTS = {
  image: 30,
  video: 10,
  audio: 1
};

export async function getPresignedUploadUrl(jobId, kind, filename, contentType) {
  if (!ALLOWED_TYPES[kind]?.includes(contentType)) {
    throw new Error(`Invalid content type for ${kind}: ${contentType}`);
  }
  
  const ext = getExtension(contentType);
  const safeFilename = `${crypto.randomUUID()}.${ext}`;
  const key = `uploads/${jobId}/${kind}s/${safeFilename}`;
  
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
    ServerSideEncryption: 'AES256'
  });
  
  const url = await getSignedUrl(s3Client, command, { expiresIn: 300 });
  
  return { url, key, filename: safeFilename };
}

export async function getPresignedDownloadUrl(key, expiresIn = 3600) {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ResponseContentDisposition: 'attachment'
  });
  
  return await getSignedUrl(s3Client, command, { expiresIn });
}

export async function uploadFile(key, body, contentType) {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
    ServerSideEncryption: 'AES256'
  });
  
  await s3Client.send(command);
  return { key };
}

export async function downloadFile(key) {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key
  });
  
  const response = await s3Client.send(command);
  return response.Body;
}

export async function deleteFiles(keys) {
  if (!keys || keys.length === 0) return;
  
  const batches = [];
  for (let i = 0; i < keys.length; i += 1000) {
    batches.push(keys.slice(i, i + 1000));
  }
  
  for (const batch of batches) {
    const command = new DeleteObjectsCommand({
      Bucket: BUCKET,
      Delete: {
        Objects: batch.map(key => ({ Key: key })),
        Quiet: true
      }
    });
    
    await s3Client.send(command);
  }
}

export async function listFilesByPrefix(prefix, olderThan) {
  const command = new ListObjectsV2Command({
    Bucket: BUCKET,
    Prefix: prefix
  });
  
  const response = await s3Client.send(command);
  
  if (!response.Contents) return [];
  
  return response.Contents
    .filter(obj => obj.LastModified < olderThan)
    .map(obj => obj.Key);
}

function getExtension(mimeType) {
  const extensions = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'video/mp4': 'mp4',
    'video/quicktime': 'mov',
    'audio/mpeg': 'mp3',
    'audio/mp4': 'm4a',
    'audio/x-m4a': 'm4a',
    'audio/wav': 'wav'
  };
  
  return extensions[mimeType] || 'bin';
}

export default {
  getPresignedUploadUrl,
  getPresignedDownloadUrl,
  uploadFile,
  downloadFile,
  deleteFiles,
  listFilesByPrefix
};