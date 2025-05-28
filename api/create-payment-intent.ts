import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

// Initialize Stripe with your secret key from environment variables
// Ensure STRIPE_SECRET_KEY is set in your Vercel project settings
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil', // Use the latest API version
  typescript: true,
});

// Define a simple structure for your plans if you need to validate planId against a known list
// This is a good place to ensure the amount comes from a trusted server-side source
// For a real application, you'd fetch this from a database or a secure configuration
interface Plan {
  id: number | string; // Match the type of planId you send from frontend
  priceInCents: number;
  currency: string;
}

const plans: Record<string | number, Plan> = {
  1: { id: 1, priceInCents: 450000, currency: 'usd' }, // $4500.00 total
  3: { id: 3, priceInCents: 500000, currency: 'usd' }, // $5000.00 total
  4: { id: 4, priceInCents: 540000, currency: 'usd' }, // $5400.00 total
  2: { id: 2, priceInCents: 900000, currency: 'usd' }, // $9000.00 total
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { paymentMethodId, planId, email, fullName, currency, amount: amountFromClient } = req.body;

    if (!paymentMethodId || !planId || amountFromClient === undefined) {
      return res.status(400).json({ error: 'Missing paymentMethodId, planId, or amount.' });
    }

    const selectedPlanDetails = plans[planId];

    if (!selectedPlanDetails) {
        return res.status(404).json({ error: 'Invalid plan selected.' });
    }
    
    const amountToCharge = Number(amountFromClient);
    if (isNaN(amountToCharge) || amountToCharge <= 0) {
        return res.status(400).json({ error: 'Invalid amount.' });
    }

    const planCurrency = selectedPlanDetails.currency || currency || 'usd';

    // Optional: Create or retrieve a Stripe Customer
    let customer;
    const existingCustomers = await stripe.customers.list({ email: email, limit: 1 });
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: email,
        name: fullName,
        payment_method: paymentMethodId, 
        invoice_settings: {
            default_payment_method: paymentMethodId, 
        },
      });
    }

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountToCharge, // USE THE AMOUNT FROM CLIENT
      currency: planCurrency,
      payment_method: paymentMethodId,
      customer: customer.id, 
      confirm: true, 
      automatic_payment_methods: { enabled: true, allow_redirects: 'never' }, 
      description: `Enrollment for Plan ID: ${planId} - ${selectedPlanDetails.title || ''}`,
      receipt_email: email, 
    });

    // Handle the PaymentIntent status
    if (paymentIntent.status === 'requires_action') {
      // Payment requires further action (e.g., 3D Secure)
      // Send the client secret back to the frontend to handle it
      return res.status(200).json({
        requiresAction: true,
        clientSecret: paymentIntent.client_secret,
      });
    } else if (paymentIntent.status === 'succeeded') {
      // Payment successful
      // You can add logic here to update your database, send a custom confirmation email, etc.
      return res.status(200).json({ success: true, paymentIntentId: paymentIntent.id });
    } else {
      // Other statuses (e.g., 'requires_payment_method', 'canceled')
      console.error('Unhandled PaymentIntent status:', paymentIntent.status);
      return res.status(500).json({ error: 'Payment failed with an unexpected status.' });
    }

  } catch (error: any) {
    console.error('Stripe API Error:', error);
    // Differentiate Stripe errors from other errors for better client-side messages
    if (error.type && error.type.startsWith('Stripe')) {
        return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal Server Error. Please try again.' });
  }
}