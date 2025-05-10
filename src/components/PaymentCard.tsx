
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
}) => {
  const dailyCost = totalPrice / daysInPlan;
  const installmentAmount = totalPrice / installments;

  return (
    <div
      className={cn(
        "bg-slate p-6 rounded-2xl shadow-lg cursor-pointer transition-all duration-200",
        "border-2 border-transparent hover:border-accent-blue",
        isSelected ? "border-accent-blue animate-card-select" : ""
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
      <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
      
      <div className="text-3xl font-bold text-white mb-1">
        ${totalPrice.toLocaleString()}
      </div>
      
      {installments > 1 && (
        <div className="text-gray-300 text-lg font-medium mb-2">
          {installments} payments of ${installmentAmount.toLocaleString()}
        </div>
      )}
      
      {description && (
        <div className="text-gray-400 text-sm mb-4">
          {description}
        </div>
      )}
      
      {benefit && (
        <div className="flex items-center mt-3 mb-3 bg-accent-blue bg-opacity-10 py-2 px-3 rounded-lg">
          <CheckCircle className="h-4 w-4 text-accent-blue mr-2" />
          <span className="text-white text-sm font-medium">
            {benefit}
          </span>
        </div>
      )}
      
      <div className="text-sm text-gray-400 mt-3">
        ${dailyCost.toFixed(2)} per day
      </div>
    </div>
  );
};

export default PaymentCard;
