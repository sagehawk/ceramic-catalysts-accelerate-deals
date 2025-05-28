
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader, Shield } from 'lucide-react';

// Load Stripe with the publishable key from environment variables
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_TEST_KEY as string);

interface Plan {
  id: number;
  title: string;
  totalPrice: number; // Amount in cents for Stripe
  installments: number;
  isBestValue?: boolean;
}

interface StripePaymentFormProps {
  selectedPlan: Plan | null;
  onBackClick: () => void;
}

const CheckoutForm: React.FC<StripePaymentFormProps> = ({ selectedPlan, onBackClick }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    agreeToTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPlan || !stripe || !elements) {
      setError("Stripe.js has not loaded yet. Please try again in a moment.");
      return;
    }
    
    if (!formData.agreeToTerms) {
      toast({
        title: "Terms Agreement Required",
        description: "Please read and agree to the Terms of Agreement to continue.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
        setIsSubmitting(false);
        setError("Card element not found. Please refresh and try again.");
        return;
    }

    // 1. Create a PaymentMethod
    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: formData.fullName,
        email: formData.email,
      },
    });

    if (paymentMethodError || !paymentMethod) {
      setError(paymentMethodError?.message || "Failed to create PaymentMethod. Please check your card details.");
      setIsSubmitting(false);
      return;
    }

    // 2. Send PaymentMethod ID and plan details to your backend
    try {
      const response = await fetch('/api/create-payment-intent', { // This is the backend endpoint we'll create
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          planId: selectedPlan.id, // Send plan ID to determine amount on backend
          amount: getAmountDueToday(true), // Send amount in cents
          currency: 'usd', // Or your desired currency
          email: formData.email,
          fullName: formData.fullName
        }),
      });

      const paymentResult = await response.json();

      if (!response.ok || paymentResult.error) {
        setError(paymentResult.error || 'Payment failed. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // 3. Handle successful payment (or further actions like 3D Secure)
      if (paymentResult.requiresAction) {
        // Payment requires further action (e.g., 3D Secure)
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
          paymentResult.clientSecret // The client secret from your backend
        );
        if (confirmError) {
          setError(confirmError.message || 'Failed to confirm payment. Please try again.');
          setIsSubmitting(false);
        } else if (paymentIntent?.status === 'succeeded') {
          toast({
            title: "Enrollment Complete!",
            description: `Welcome to the program, ${formData.fullName}! Check your email for next steps.`,
          });
          // Optionally, clear form, redirect, etc.
        } else {
            setError(`Payment status: ${paymentIntent?.status}. Please contact support.`);
        }
      } else if (paymentResult.success) {
        // Payment successful without further action
        toast({
          title: "Enrollment Complete!",
          description: `Welcome to the program, ${formData.fullName}! Check your email for next steps.`,
        });
         // Optionally, clear form, redirect, etc.
      }

    } catch (err: any) {
      console.error("API call failed:", err);
      setError("An unexpected error occurred while processing your payment. Please try again.");
    }

    setIsSubmitting(false);
  };

  const getAmountDueToday = (inCents: boolean = false) => {
    if (!selectedPlan) return 0;

    // Calculate the price for one installment in DOLLARS
    const priceInDollars = selectedPlan.installments === 1 
      ? selectedPlan.totalPrice 
      : Math.round(selectedPlan.totalPrice / selectedPlan.installments);

    // If inCents is true, convert to cents; otherwise, return dollars
    return inCents ? Math.round(priceInDollars * 100) : priceInDollars;
  };

  if (!selectedPlan) return null;

  const cardElementOptions = {
    style: {
      base: {
        color: '#ffffff',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a', // Typically red for errors
        iconColor: '#fa755a'
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <button 
        onClick={onBackClick} 
        className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to plans
      </button>

      <div className="bg-charcoal rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Complete Your Enrollment</h2>
          <div className="bg-slate/50 p-4 rounded-xl">
            <div className="text-white font-medium">{selectedPlan.title}</div>
            <div className="text-2xl font-bold text-accent-red mt-1">
              ${getAmountDueToday().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              {selectedPlan.installments > 1 && (
                <span className="text-sm text-gray-400 block">
                  First of {selectedPlan.installments} payments
                </span>
              )}
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-gray-300">Full Name</Label>
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="John Smith"
              className="bg-slate border-gray-600 text-white mt-1"
            />
          </div>
          
          <div>
            <Label className="text-gray-300">Email</Label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
              className="bg-slate border-gray-600 text-white mt-1"
            />
          </div>
          
          <div>
            <Label className="text-gray-300">Card Details</Label>
            <div className="bg-slate border border-gray-600 text-white mt-1 p-3 rounded-md">
                 <CardElement options={cardElementOptions} />
            </div>
          </div>
          
          {error && <div className="text-accent-red text-sm p-2 bg-red-900/30 rounded-md">{error}</div>}

          <div className="flex items-start space-x-3 mt-6">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
              className="mt-1 h-4 w-4 text-accent-red bg-slate border-gray-600 rounded focus:ring-accent-red focus:ring-2"
            />
            <label htmlFor="agreeToTerms" className="text-sm text-gray-300 leading-tight">
              I have read and agree to the{' '}
              <a 
                href="/terms" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent-red hover:text-accent-red/80 underline"
              >
                Terms of Agreement
              </a>
            </label>
          </div>
          
          <div className="flex items-center justify-center text-gray-400 text-sm mt-6 mb-6">
            <Shield className="h-4 w-4 mr-2" />
            Secure payment with Stripe
          </div>
          
          <Button
            type="submit"
            className="w-full py-6 bg-accent-red hover:bg-accent-red/90 text-white font-bold text-lg"
            disabled={isSubmitting || !formData.agreeToTerms || !stripe || !elements}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader className="animate-spin h-5 w-5 mr-2" />
                Processing...
              </span>
            ) : (
              `Complete Enrollment - $${getAmountDueToday().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

const StripePaymentFormWrapper: React.FC<StripePaymentFormProps> = (props) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm {...props} />
  </Elements>
);

export default StripePaymentFormWrapper;
