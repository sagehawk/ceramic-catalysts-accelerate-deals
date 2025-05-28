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
  // Example plans - replace with your actual plan details
  // Ensure planId here matches what you send from the frontend
  // And priceInCents is the actual amount in cents for Stripe
  1: { id: 1, priceInCents: 10000, currency: 'usd' }, // Example: Plan ID 1, $100.00 USD
  2: { id: 2, priceInCents: 5000, currency: 'usd' },  // Example: Plan ID 2, $50.00 USD
  // Add your other plans here...
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { paymentMethodId, planId, email, fullName, currency } = req.body;

    if (!paymentMethodId || !planId) {
      return res.status(400).json({ error: 'Missing paymentMethodId or planId.' });
    }

    // --- IMPORTANT: Amount Determination --- 
    // Fetch plan details from your server-side source using planId
    // DO NOT rely on an amount sent from the client-side for the final charge.
    const selectedPlanDetails = plans[planId]; // Fetch from your defined plans

    if (!selectedPlanDetails) {
        return res.status(404).json({ error: 'Invalid plan selected.' });
    }
    const amount = selectedPlanDetails.priceInCents;
    const planCurrency = selectedPlanDetails.currency || currency || 'usd';
    // --- End Amount Determination ---

    // Optional: Create or retrieve a Stripe Customer
    // This is useful if you want to save card details for future payments or manage subscriptions.
    let customer;
    const existingCustomers = await stripe.customers.list({ email: email, limit: 1 });
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: email,
        name: fullName,
        payment_method: paymentMethodId, // Optionally set default payment method
        invoice_settings: {
            default_payment_method: paymentMethodId, // For subscriptions
        },
      });
    }

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: planCurrency,
      payment_method: paymentMethodId,
      customer: customer.id, // Associate with the customer
      confirm: true, // Attempt to confirm the payment immediately
      automatic_payment_methods: { enabled: true, allow_redirects: 'never' }, // Handles SCA like 3D Secure
      // off_session: false, // Set to true if this is for a subscription renewal or similar off-session payment
      description: `Enrollment for Plan ID: ${planId}`,
      receipt_email: email, // Send Stripe receipt to this email
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