
import React from 'react';
import { Button } from "@/components/ui/button";
import { Lock } from 'lucide-react';

interface PaymentFormFooterProps {
  selectedPlan: {
    title: string;
    totalPrice: number;
    installments: number;
  } | null;
  isSubmitting: boolean;
}

const PaymentFormFooter: React.FC<PaymentFormFooterProps> = ({ selectedPlan, isSubmitting }) => {
  const getButtonText = () => {
    if (!selectedPlan) return "Select a payment plan";
    
    if (selectedPlan.installments === 1) {
      return `Complete Enrollment & Pay $${selectedPlan.totalPrice.toLocaleString()}`;
    } else if (selectedPlan.installments === 6) { // Monthly plan
      const monthlyAmount = selectedPlan.totalPrice / selectedPlan.installments;
      return `Start Monthly Plan & Pay $${monthlyAmount.toLocaleString()}`;
    } else {
      const installmentAmount = selectedPlan.totalPrice / selectedPlan.installments;
      return `Pay First Installment ($${installmentAmount.toLocaleString()})`;
    }
  };
  
  return (
    <>
      <div className="flex items-center pt-2">
        <Lock className="h-4 w-4 text-gray-500 mr-2" />
        <span className="text-gray-500 text-sm">Secure 256-bit SSL encrypted payment</span>
      </div>
      
      <Button
        type="submit"
        className={`w-full py-6 bg-accent-red hover:bg-accent-red/90 transition-all duration-300 text-white font-medium rounded-xl shadow text-lg mt-4 ${selectedPlan ? 'animate-red-glow' : ''}`}
        disabled={isSubmitting || !selectedPlan}
      >
        {isSubmitting ? "Processing..." : getButtonText()}
      </Button>
    </>
  );
};

export default PaymentFormFooter;
