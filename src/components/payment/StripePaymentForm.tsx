
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock, ArrowLeft, Loader } from 'lucide-react';

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

// For now, we'll use a simplified form without Stripe Elements
// This can be upgraded to use Stripe Elements when you have your Stripe keys configured
const StripePaymentForm: React.FC<StripePaymentFormProps> = ({ selectedPlan, onBackClick }) => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData({
        ...formData,
        [name]: formatted.substring(0, 19), // limit to 16 digits + 3 spaces
      });
      return;
    }
    
    // Format expiry date
    if (name === 'expiry') {
      const formatted = value.replace(/\D/g, '');
      if (formatted.length <= 2) {
        setFormData({ ...formData, [name]: formatted });
      } else {
        setFormData({
          ...formData,
          [name]: `${formatted.substring(0, 2)}/${formatted.substring(2, 4)}`,
        });
      }
      return;
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPlan) {
      toast({
        title: "Error",
        description: "Please select a payment plan.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
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
        cardNumber: '',
        expiry: '',
        cvc: '',
      });
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
          <Label htmlFor="cardNumber" className="text-text-secondary">Card Number</Label>
          <Input
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            required
            placeholder="4242 4242 4242 4242"
            className="bg-slate border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry" className="text-text-secondary">Expiry Date</Label>
            <Input
              id="expiry"
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              required
              placeholder="MM/YY"
              className="bg-slate border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cvc" className="text-text-secondary">CVC</Label>
            <Input
              id="cvc"
              name="cvc"
              value={formData.cvc}
              onChange={handleChange}
              required
              placeholder="123"
              maxLength={3}
              className="bg-slate border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>
        </div>
        
        <div className="flex items-center pt-2">
          <Lock className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-gray-500 text-sm">Secure 256-bit SSL encrypted payment</span>
        </div>
        
        <Button
          type="submit"
          className={`w-full py-6 bg-accent-red hover:bg-accent-red/90 transition-all duration-300 text-white font-medium rounded-xl shadow text-lg mt-4 ${selectedPlan ? 'animate-red-glow' : ''}`}
          disabled={isSubmitting || !selectedPlan}
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

export default StripePaymentForm;
