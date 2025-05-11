
import React from 'react';

interface SelectedPlanInfoProps {
  selectedPlan: {
    title: string;
    totalPrice: number;
    installments: number;
    isBestValue?: boolean;
  } | null;
}

const SelectedPlanInfo: React.FC<SelectedPlanInfoProps> = ({ selectedPlan }) => {
  if (!selectedPlan) return null;

  const getSelectedPlanText = () => {
    if (!selectedPlan) return "";
    
    if (selectedPlan.installments === 1) {
      return `${selectedPlan.title} - $${selectedPlan.totalPrice.toLocaleString()} one-time payment ${selectedPlan.isBestValue ? '(Best Value!)' : ''}`;
    } else if (selectedPlan.installments === 6) {
      const monthlyAmount = selectedPlan.totalPrice / selectedPlan.installments;
      return `${selectedPlan.title} - $${monthlyAmount.toLocaleString()} first month payment`;
    } else {
      const installmentAmount = selectedPlan.totalPrice / selectedPlan.installments;
      return `${selectedPlan.title} - $${installmentAmount.toLocaleString()} first payment`;
    }
  };

  return (
    <div className="bg-slate bg-opacity-70 p-4 rounded-xl mb-6">
      <p className="text-white">
        <span className="font-medium">Selected plan:</span> {getSelectedPlanText()}
      </p>
    </div>
  );
};

export default SelectedPlanInfo;
