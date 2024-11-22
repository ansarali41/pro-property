import Stripe from 'stripe';

// Only initialize Stripe on the server side
const stripe = typeof window === 'undefined' ? new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
  typescript: true,
}) : null;

export const SUBSCRIPTION_PLANS = {
  BASIC: {
    name: 'Basic',
    id: 'price_basic',
    priceId: 'price_basic',
    price: 29,
    properties: 5,
    features: [
      'Up to 5 properties',
      'Basic analytics',
      'Email support',
      'Basic maintenance tracking'
    ]
  },
  PRO: {
    name: 'Pro',
    id: 'price_pro',
    priceId: 'price_pro',
    price: 79,
    properties: 20,
    features: [
      'Up to 20 properties',
      'Advanced analytics',
      'Priority support',
      'Advanced maintenance tracking',
      'Custom reports'
    ]
  },
  PREMIUM: {
    name: 'Premium',
    id: 'price_premium',
    priceId: 'price_premium',
    price: 199,
    properties: 50,
    features: [
      'Unlimited properties',
      'Enterprise analytics',
      '24/7 phone support',
      'Full maintenance system',
      'Custom reports',
      'API access',
      'Dedicated account manager'
    ]
  }
};

export { stripe };