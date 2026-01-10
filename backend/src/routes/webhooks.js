import express from 'express';
import Stripe from 'stripe';
import { addRenderJob } from '../services/queueService.js';
import { sendConfirmationEmail } from '../services/emailService.js';
import logger from '../utils/logger.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/stripe', 
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      logger.error('Webhook signature verification failed:', err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const { orderId, packageType } = session.metadata;
        const customerEmail = session.customer_email;

        logger.info(`Payment completed for order ${orderId}`);

        await sendConfirmationEmail(customerEmail, 'Pet', packageType);
        await addRenderJob({
          orderId,
          email: customerEmail,
          package: packageType
        });
      }
      res.json({ received: true });
    } catch (error) {
      logger.error('Webhook handling error:', error);
      res.status(500).json({ error: 'Webhook handling failed' });
    }
  }
);

export default router;