
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

interface PaymentCardProps {
  title: string;
  totalPrice: number;
  installments: number;
  daysInPlan: number;
  isSelected: boolean;
  onClick: () => void;
  benefit?: string;
  description?: string;
  valueProposition?: string;
  dailyEquivalent?: string;
  isPrimary?: boolean;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  title,
  totalPrice,
  installments,
  daysInPlan,
  isSelected,
  onClick,
  benefit,
  description,
  valueProposition,
  dailyEquivalent,
  isPrimary = false,
}) => {
  const installmentAmount = totalPrice / installments;
  
  // For monthly payments (installments === 6), we want to emphasize the monthly amount
  const displayAmount = installments === 6 
    ? `$${installmentAmount.toLocaleString()}/mo`
    : `$${totalPrice.toLocaleString()}`;
  
  // For installment plans (2+ payments, but not the monthly plan)
  const isInstallmentPlan = installments > 1 && installments !== 6;

  return (
    <div
      className={cn(
        "bg-slate p-6 rounded-2xl shadow-lg cursor-pointer transition-all duration-300",
        "border-2 hover:border-accent-red",
        isPrimary ? "bg-gradient-to-b from-slate to-charcoal" : "bg-slate/80",
        isSelected 
          ? "border-accent-red bg-opacity-90 shadow-xl transform scale-[1.02] ring-2 ring-accent-red ring-opacity-50 animate-red-glow" 
          : "border-transparent"
      )}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
        {isSelected && (
          <div className="bg-accent-red text-white text-xs font-medium py-1 px-3 rounded-full">
            Selected
          </div>
        )}
      </div>
      
      <div className="text-3xl font-bold text-white mb-1">
        {displayAmount}
      </div>
      
      {isInstallmentPlan && (
        <div className="text-gray-300 text-lg font-medium mb-2">
          {installments} payments of ${installmentAmount.toLocaleString()}
        </div>
      )}
      
      {installments === 6 && (
        <div className="text-gray-300 text-lg font-medium mb-2">
          Total: ${totalPrice.toLocaleString()} over 6 months
        </div>
      )}
      
      {description && (
        <div className="text-gray-400 text-sm mb-3">
          {description}
        </div>
      )}
      
      {valueProposition && (
        <div className="flex items-center mb-3 bg-accent-red bg-opacity-20 py-2 px-3 rounded-lg">
          <span className="text-white text-sm font-medium">
            {valueProposition}
          </span>
        </div>
      )}
      
      {dailyEquivalent && (
        <div className="text-gray-300 text-sm mb-3">
          {dailyEquivalent}
        </div>
      )}
      
      {benefit && (
        <div className="flex items-center mt-3 mb-2 bg-accent-red bg-opacity-10 py-2 px-3 rounded-lg">
          <CheckCircle className="h-4 w-4 text-accent-red mr-2" />
          <span className="text-white text-sm font-medium">
            {benefit}
          </span>
        </div>
      )}
    </div>
  );
};

export default PaymentCard;
