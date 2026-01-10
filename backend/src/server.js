import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import orderRoutes from './routes/orders.js';
import checkoutRoutes from './routes/checkout.js';
import webhookRoutes from './routes/webhooks.js';
import downloadRoutes from './routes/download.js';
import logger from './utils/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Stripe webhooks need raw body
app.use('/api/webhooks', webhookRoutes);

// Regular JSON parsing for other routes
app.use(express.json());

// Routes
app.use('/api/orders', orderRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/download', downloadRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Error handling - MUST be after all routes
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  logger.info(`🚀 Memorial Pet Films Server running on port ${PORT}`);
});