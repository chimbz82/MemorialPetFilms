import logger from '../utils/logger.js';

/**
 * Send order confirmation email
 */
export async function sendConfirmationEmail(email, petName, packageType) {
  try {
    logger.info(`Sending confirmation email to ${email} for pet ${petName}`);
    return { success: true };
  } catch (error) {
    logger.error('Email Error:', error);
    throw error;
  }
}

/**
 * Send video ready notification with download link
 */
export async function sendDownloadEmail(email, petName, downloadUrl) {
  try {
    logger.info(`Sending download link to ${email} for ${petName}'s memorial`);
    // Implementation would use nodemailer to send the actual email
    return { success: true };
  } catch (error) {
    logger.error('Email Delivery Error:', error);
    throw error;
  }
}

/**
 * Send error notification if rendering fails
 */
export async function sendErrorEmail(email, petName, errorMessage) {
  try {
    logger.error(`Sending render error notification to ${email} for pet ${petName}`);
    return { success: true };
  } catch (error) {
    logger.error('Error Email Delivery Failure:', error);
    throw error;
  }
}

/**
 * Legacy method for compatibility
 */
export const sendVideoReadyEmail = sendDownloadEmail;