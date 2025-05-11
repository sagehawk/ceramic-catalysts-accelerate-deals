
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import PaymentFormHeader from './PaymentFormHeader';
import SelectedPlanInfo from './SelectedPlanInfo';
import PaymentFormFields from './PaymentFormFields';
import PaymentFormFooter from './PaymentFormFooter';

interface PaymentFormProps {
  selectedPlan: {
    title: string;
    totalPrice: number;
    installments: number;
    isBestValue?: boolean;
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
        title: "Please select a payment plan",
        description: "You must select one of the payment options before proceeding.",
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

  return (
    <div className="bg-charcoal rounded-2xl shadow-lg p-8 w-full max-w-lg mx-auto">
      <PaymentFormHeader />
      <SelectedPlanInfo selectedPlan={selectedPlan} />
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <PaymentFormFields formData={formData} handleChange={handleChange} />
        <PaymentFormFooter selectedPlan={selectedPlan} isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};

export default PaymentForm;
