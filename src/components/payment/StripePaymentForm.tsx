
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader, Shield } from 'lucide-react';

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

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({ selectedPlan, onBackClick }) => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    agreeToTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
      return;
    }
    
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData({ ...formData, [name]: formatted.substring(0, 19) });
      return;
    }
    
    if (name === 'expiry') {
      const formatted = value.replace(/\D/g, '');
      if (formatted.length <= 2) {
        setFormData({ ...formData, [name]: formatted });
      } else {
        setFormData({ ...formData, [name]: `${formatted.substring(0, 2)}/${formatted.substring(2, 4)}` });
      }
      return;
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPlan) return;
    
    if (!formData.agreeToTerms) {
      toast({
        title: "Terms Agreement Required",
        description: "Please read and agree to the Terms of Agreement to continue.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Enrollment Complete!",
        description: `Welcome to the program, ${formData.fullName}! Check your email for next steps.`,
      });
    }, 2000);
  };

  const getAmountDueToday = () => {
    if (!selectedPlan) return 0;
    return selectedPlan.installments === 1 
      ? selectedPlan.totalPrice 
      : Math.round(selectedPlan.totalPrice / selectedPlan.installments);
  };

  if (!selectedPlan) return null;

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
              ${getAmountDueToday().toLocaleString()}
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
            <Label className="text-gray-300">Card Number</Label>
            <Input
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              required
              placeholder="4242 4242 4242 4242"
              className="bg-slate border-gray-600 text-white mt-1"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">Expiry</Label>
              <Input
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                required
                placeholder="MM/YY"
                className="bg-slate border-gray-600 text-white mt-1"
              />
            </div>
            <div>
              <Label className="text-gray-300">CVC</Label>
              <Input
                name="cvc"
                value={formData.cvc}
                onChange={handleChange}
                required
                placeholder="123"
                maxLength={3}
                className="bg-slate border-gray-600 text-white mt-1"
              />
            </div>
          </div>
          
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
            Secure 256-bit SSL encryption
          </div>
          
          <Button
            type="submit"
            className="w-full py-6 bg-accent-red hover:bg-accent-red/90 text-white font-bold text-lg"
            disabled={isSubmitting || !formData.agreeToTerms}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader className="animate-spin h-5 w-5 mr-2" />
                Processing...
              </span>
            ) : (
              `Complete Enrollment - $${getAmountDueToday().toLocaleString()}`
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default StripePaymentForm;
