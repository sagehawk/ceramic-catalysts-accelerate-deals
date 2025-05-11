
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock, ArrowLeft, Loader } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_your_publishable_key');

interface Plan {
  id: number;
  title: string;
  totalPrice: number;
  installments: number;
  isBestValue?: boolean;
}

interface StripePaymentFormProps {
  selectedPlan: Plan | null;
  onBackClick: () => void;
}

// Inner form component that uses Stripe hooks
const CheckoutForm = ({ selectedPlan, onBackClick }: StripePaymentFormProps) => {
  const { toast } = useToast();
  const stripe = useStripe();
  const elements = useElements();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cardError, setCardError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements || !selectedPlan) {
      toast({
        title: "Error",
        description: "Please select a payment plan and ensure Stripe is loaded.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Get card element
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Card element not found.",
        variant: "destructive",
      });
      return;
    }

    // Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: formData.fullName,
        email: formData.email,
      }
    });

    if (error) {
      setIsSubmitting(false);
      setCardError(error.message || 'An error occurred with your payment method.');
      return;
    }

    // Here you would normally send this paymentMethod.id to your server
    // For now, we'll simulate a successful payment
    
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Enrollment Complete!",
        description: `Thank you, ${formData.fullName}! Your enrollment in the 90-Job Guarantee Program is confirmed with the ${selectedPlan.title} option. You'll receive onboarding details via email shortly.`,
      });
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
      });
      cardElement.clear();
      setCardError('');
    }, 1500);
  };

  const getAmountDueToday = () => {
    if (!selectedPlan) return 0;
    
    if (selectedPlan.installments === 1) {
      // One-time payment
      return selectedPlan.totalPrice;
    } else {
      // Installment or monthly - first payment
      return Math.round(selectedPlan.totalPrice / selectedPlan.installments);
    }
  };

  const getButtonText = () => {
    if (!selectedPlan) return "Please select a plan";
    
    const amountDue = getAmountDueToday();
    return `Complete Enrollment & Pay $${amountDue.toLocaleString()}`;
  };

  const getPaymentSummary = () => {
    if (!selectedPlan) return "No plan selected";
    
    let summary = `You're enrolling in: ${selectedPlan.title}`;
    
    if (selectedPlan.installments === 1) {
      return `${summary}\nAmount due today: $${selectedPlan.totalPrice.toLocaleString()}`;
    } else if (selectedPlan.installments > 1) {
      const installmentAmount = Math.round(selectedPlan.totalPrice / selectedPlan.installments);
      return `${summary}\nAmount due today: $${installmentAmount.toLocaleString()} (First of ${selectedPlan.installments} payments)\nTotal program cost: $${selectedPlan.totalPrice.toLocaleString()}\nRemaining payments will be charged automatically.`;
    } else {
      return summary;
    }
  };

  return (
    <div className="bg-charcoal rounded-2xl shadow-lg p-8 w-full max-w-lg mx-auto">
      <button 
        onClick={onBackClick} 
        className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Plan Selection
      </button>

      <div className="flex items-center mb-6">
        <CreditCard className="h-6 w-6 text-accent-red mr-3" />
        <h3 className="text-xl font-semibold text-white">Secure Payment Details</h3>
      </div>
      
      {selectedPlan && (
        <div className="bg-slate bg-opacity-70 p-4 rounded-xl mb-6">
          <div className="text-white whitespace-pre-line">
            {getPaymentSummary()}
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-text-secondary">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="John Smith"
            className="bg-slate border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-text-secondary">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            className="bg-slate border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="card-element" className="text-text-secondary">Card Details</Label>
          <div className="bg-slate border border-gray-700 rounded-md p-3 focus-within:ring-1 focus-within:ring-accent-red">
            <CardElement
              id="card-element"
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#FFFFFF',
                    '::placeholder': {
                      color: 'rgba(156, 163, 175, 0.7)',
                    },
                  },
                  invalid: {
                    color: '#EF4444',
                  },
                },
              }}
            />
          </div>
          {cardError && <p className="text-red-500 text-sm mt-1">{cardError}</p>}
        </div>
        
        <div className="flex items-center pt-2">
          <Lock className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-gray-500 text-sm">Secure 256-bit SSL encrypted payment</span>
        </div>
        
        <Button
          type="submit"
          className={`w-full py-6 bg-accent-red hover:bg-accent-red/90 transition-all duration-300 text-white font-medium rounded-xl shadow text-lg mt-4 ${selectedPlan ? 'animate-red-glow' : ''}`}
          disabled={isSubmitting || !stripe || !selectedPlan}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <Loader className="animate-spin h-5 w-5 mr-2" />
              Processing...
            </span>
          ) : getButtonText()}
        </Button>
      </form>
    </div>
  );
};

// Wrapper component that provides the Stripe context
const StripePaymentForm: React.FC<StripePaymentFormProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
};

export default StripePaymentForm;
