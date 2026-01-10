import express from 'express';
import Stripe from 'stripe';
import logger from '../utils/logger.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICE_IDS = {
  standard: process.env.STRIPE_STANDARD_PRICE_ID,
  premium: process.env.STRIPE_PREMIUM_PRICE_ID,
  rush: process.env.STRIPE_RUSH_PRICE_ID
};

/**
 * POST /api/checkout/create-session
 */
router.post('/create-session', async (req, res) => {
  try {
    const { orderId, packageType, email } = req.body;

    if (!orderId || !packageType || !email) {
      return res.status(400).json({ success: false, error: 'Missing fields' });
    }

    const priceId = PRICE_IDS[packageType];
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/creator`,
      customer_email: email,
      metadata: { orderId, packageType }
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    logger.error('Stripe Session Error:', error);
    res.status(500).json({ success: false, error: 'Payment setup failed' });
  }
});

export default router;