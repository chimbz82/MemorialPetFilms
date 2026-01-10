import Queue from 'bull';
import logger from '../utils/logger.js';

// Initialize the video processing queue
// Note: Requires a Redis server running
export const videoQueue = new Queue('render-video', process.env.REDIS_URL || 'redis://127.0.0.1:6379');

/**
 * Add a rendering job to the queue
 */
export async function addRenderJob(jobData) {
  try {
    logger.info(`Adding render job to queue for order: ${jobData.orderId}`);
    
    const job = await videoQueue.add(jobData, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000
      },
      removeOnComplete: true
    });

    return { success: true, jobId: job.id };
  } catch (error) {
    logger.error('Queue Error:', error);
    throw error;
  }
}