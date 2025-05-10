
import React from 'react';
import { cn } from '@/lib/utils';

interface PaymentCardProps {
  title: string;
  totalPrice: number;
  installments: number;
  daysInPlan: number;
  monthlySavings?: number;
  isSelected: boolean;
  onClick: () => void;
  includesGift?: boolean;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  title,
  totalPrice,
  installments,
  daysInPlan,
  monthlySavings,
  isSelected,
  onClick,
  includesGift = false,
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
      
      <div className="text-sm text-gray-400 mb-2">
        ${dailyCost.toFixed(2)} per day
      </div>
      
      {installments > 1 && (
        <div className="text-gray-400 text-sm mb-2">
          {installments} payments of ${installmentAmount.toLocaleString()}
        </div>
      )}
      
      {monthlySavings && monthlySavings > 0 && (
        <div className="bg-savings-green bg-opacity-20 text-savings-green py-1 px-3 rounded-full text-sm inline-block mb-3">
          Save ${monthlySavings.toLocaleString()} vs monthly
        </div>
      )}

      {includesGift && (
        <div className="mt-3 border-t border-gray-700 pt-3">
          <div className="flex items-center">
            <span className="text-accent-blue text-lg mr-2">✓</span>
            <span className="text-white text-sm">
              Includes "10 Clients in 10 Days" package as a complementary gift
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentCard;
