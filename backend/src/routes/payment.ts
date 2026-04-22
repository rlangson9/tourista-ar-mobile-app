import express from 'express';
import { protect } from '../middleware/auth.js';
import stripe from 'stripe';

const router = express.Router();
const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16'
});

// @route   POST /api/payments/intent
// @desc    Create payment intent
// @access  Private
router.post('/intent', protect, async (req, res) => {
  try {
    const { amount, currency, description } = req.body;

    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: currency || 'usd',
      description: description || 'Tourista AR Payment',
      metadata: {
        userId: req.user.id
      }
    });

    res.status(200).json({
      success: true,
      message: 'Payment intent created successfully',
      data: {
        clientSecret: paymentIntent.client_secret
      }
    });
  } catch (error: any) {
    res.status(500).json({
      error: {
        message: error.message || 'Server error',
        status: 500
      }
    });
  }
});

// @route   POST /api/payments/webhook
// @desc    Handle Stripe webhook events
// @access  Public
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const signature = req.headers['stripe-signature'];
    const event = stripeInstance.webhooks.constructEvent(
      req.body,
      signature as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        // Update order/booking status
        break;
      case 'payment_intent.payment_failed':
        const failedPaymentIntent = event.data.object;
        // Handle failed payment
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error: any) {
    res.status(400).json({
      error: {
        message: error.message || 'Webhook error',
        status: 400
      }
    });
  }
});

export default router;
