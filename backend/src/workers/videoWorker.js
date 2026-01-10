import { videoQueue } from '../services/queueService.js';
import { renderMemorialVideo } from '../services/videoService.js';
import { uploadToS3, getSignedDownloadUrl } from '../services/s3Service.js';
import { sendDownloadEmail, sendErrorEmail } from '../services/emailService.js';
import logger from '../utils/logger.js';

// Process video rendering jobs
// Using concurrency of 3 to process multiple videos at once
videoQueue.process('render-video', 3, async (job) => {
  const { orderId, email, petName } = job.data;
  
  try {
    logger.info(`Starting render for order ${orderId}`);
    
    // Render video with progress updates
    const result = await renderMemorialVideo(job.data, (progress) => {
      job.progress(progress);
    });
    
    if (!result.success) {
      throw new Error(result.error || 'Video rendering failed');
    }
    
    // Upload to S3
    // Note: In a real app, renderMemorialVideo would write to a temporary file,
    // which would then be read and uploaded here.
    const mockFileBuffer = Buffer.from('mock-video-data');
    const s3Result = await uploadToS3(result.outputPath, mockFileBuffer, 'video/mp4');
    
    // Generate download URL (valid for 7 days / 604800 seconds)
    const downloadUrl = await getSignedDownloadUrl(s3Result.Key || result.outputPath, 604800);
    
    // Send email with download link
    await sendDownloadEmail(email, petName, downloadUrl);
    
    logger.info(`Render complete for order ${orderId}`);
    
    return {
      videoKey: s3Result.Key || result.outputPath,
      downloadUrl,
      duration: result.duration
    };
    
  } catch (error) {
    logger.error(`Render failed for order ${orderId}:`, error);
    
    // Send error email to notify the customer of the delay
    await sendErrorEmail(email, petName, error.message);
    
    // Rethrow to let Bull handle the retry logic
    throw error;
  }
});

logger.info('🚀 Video worker started and listening for jobs');