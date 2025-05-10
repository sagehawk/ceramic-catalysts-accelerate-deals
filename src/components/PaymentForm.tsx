
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PaymentFormProps {
  selectedPlan: {
    title: string;
    totalPrice: number;
    installments: number;
  } | null;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ selectedPlan }) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPlan) {
      toast({
        title: "Please select a plan",
        description: "You must select a payment plan before proceeding.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Thank you!",
        description: `Thank you, ${formData.fullName}! You've chosen the ${selectedPlan.title} at ${selectedPlan.installments > 1 ? `${selectedPlan.installments}× $${(selectedPlan.totalPrice / selectedPlan.installments).toLocaleString()}` : `$${selectedPlan.totalPrice.toLocaleString()}`}. We'll start driving results soon.`,
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

  const getButtonText = () => {
    if (!selectedPlan) return "Please select a plan";
    
    if (selectedPlan.installments === 1) {
      return `Pay $${selectedPlan.totalPrice.toLocaleString()}`;
    } else {
      const installmentAmount = selectedPlan.totalPrice / selectedPlan.installments;
      return `Pay ${selectedPlan.installments}× $${installmentAmount.toLocaleString()}`;
    }
  };

  return (
    <div className="bg-charcoal rounded-2xl shadow-lg p-6 w-full max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-white mb-6">Payment Details</h3>
      
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
        
        <Button
          type="submit"
          className="w-full py-6 bg-accent-blue hover:bg-blue-500 transition-all duration-300 hover:animate-button-hover text-white font-medium rounded-xl shadow text-lg mt-6"
          disabled={isSubmitting || !selectedPlan}
        >
          {isSubmitting ? "Processing..." : getButtonText()}
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
