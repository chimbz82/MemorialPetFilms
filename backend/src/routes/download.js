import express from 'express';
import { getSignedDownloadUrl } from '../services/s3Service.js';
import logger from '../utils/logger.js';

const router = express.Router();

/**
 * GET /api/download/:key
 * Get signed download URL
 */
router.get('/:key', async (req, res) => {
  try {
    const { key } = req.params;
    
    // Generate signed URL (valid for 1 hour)
    const url = await getSignedDownloadUrl(key, 3600);
    
    res.json({
      success: true,
      downloadUrl: url,
      expiresIn: 3600
    });
    
  } catch (error) {
    logger.error('Download URL generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate download link'
    });
  }
});

export default router;