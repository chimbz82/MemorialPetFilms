
import express from 'express';
import { body, validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import { isValidTemplate } from '../config/templates.js';
import { isValidLibraryTrack } from '../services/musicLibraryService.js';
import logger from '../utils/logger.js';

const router = express.Router();

// In-memory order storage (replace with database in production)
const orders = new Map();

/**
 * POST /api/orders
 * Create new order
 */
router.post('/',
  [
    body('petName').trim().notEmpty().withMessage('Pet name is required'),
    body('template').custom(value => {
      if (!isValidTemplate(value)) {
        throw new Error('Invalid template');
      }
      return true;
    }),
    body('music.source').isIn(['library', 'upload']).withMessage('Invalid music source'),
    body('music.libraryTrackId').if(body('music.source').equals('library'))
      .custom(value => {
        if (!isValidLibraryTrack(value)) {
          throw new Error('Invalid library track');
        }
        return true;
      }),
    body('package').isIn(['standard', 'premium', 'rush']).withMessage('Invalid package'),
    body('files').isArray({ min: 5, max: 30 }).withMessage('5-30 files required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const orderId = uuidv4();
      const orderData = {
        orderId,
        ...req.body,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      orders.set(orderId, orderData);
      
      logger.info(`Order created: ${orderId}`);

      res.json({
        success: true,
        order: {
          orderId,
          status: 'pending'
        }
      });

    } catch (error) {
      logger.error('Order creation error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create order'
      });
    }
  }
);

/**
 * GET /api/orders/:id
 * Get order status
 */
router.get('/:id', (req, res) => {
  const order = orders.get(req.params.id);
  
  if (!order) {
    return res.status(404).json({
      success: false,
      error: 'Order not found'
    });
  }
  
  res.json({
    success: true,
    order: {
      orderId: order.orderId,
      status: order.status,
      createdAt: order.createdAt,
      completedAt: order.completedAt,
      downloadUrl: order.downloadUrl
    }
  });
});

export default router;
