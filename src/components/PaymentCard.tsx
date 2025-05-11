
import React from 'react';
import { Check } from 'lucide-react';

interface PaymentCardProps {
  title: string;
  totalPrice: number;
  installments: number;
  daysInPlan: number;
  benefit?: string;
  isPrimary?: boolean;
  description?: string;
  valueProposition?: string;
  isBestValue?: boolean;
  features?: string[];
  isSelected: boolean;
  onClick: () => void;
  showCompactView?: boolean;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  title,
  totalPrice,
  installments,
  daysInPlan,
  benefit,
  isPrimary,
  description,
  valueProposition,
  isBestValue,
  features,
  isSelected,
  onClick,
  showCompactView = false,
}) => {
  // Calculate the price per installment
  const installmentPrice = totalPrice / installments;
  
  return (
    <div 
      className={`
        relative rounded-xl p-6 transition-all duration-300 cursor-pointer
        ${isSelected 
          ? 'bg-slate border-2 border-accent-red shadow-lg transform scale-[1.01]' 
          : 'bg-slate/80 border border-gray-700 hover:border-accent-red hover:bg-slate'
        }
      `}
      onClick={onClick}
    >
      {/* Best Value Badge */}
      {isBestValue && (
        <div className="absolute -top-3 -right-3 bg-accent-red text-white px-4 py-1 rounded-full font-semibold text-sm shadow-md">
          🔥 Best Value
        </div>
      )}

      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 bg-accent-red/20 rounded-full p-1">
          <Check className="h-5 w-5 text-accent-red" />
        </div>
      )}

      <div className="flex flex-col h-full">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        
        {/* Pricing Information */}
        {installments === 1 ? (
          <div className="mb-4">
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-white">${totalPrice.toLocaleString()}</span>
              <span className="text-gray-400 ml-2">one-time payment</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">{description}</p>
          </div>
        ) : installments === 6 ? (
          <div className="mb-4">
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-white">${installmentPrice.toLocaleString()}</span>
              <span className="text-gray-400 ml-2">/month for 6 months</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">Total: ${totalPrice.toLocaleString()}</p>
          </div>
        ) : (
          <div className="mb-4">
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-white">${installmentPrice.toLocaleString()}</span>
              <span className="text-gray-400 ml-2">× {installments} payments</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">Total: ${totalPrice.toLocaleString()} {description}</p>
          </div>
        )}
        
        {/* Value Proposition */}
        {valueProposition && (
          <div className={`
            mb-4 py-2 px-3 rounded-lg text-sm font-medium
            ${valueProposition.includes('Save') 
              ? 'bg-green-900/30 text-green-400' 
              : 'bg-blue-900/30 text-blue-300'
            }
          `}>
            {valueProposition}
          </div>
        )}
        
        {/* Features */}
        {features && features.length > 0 && (
          <div className="mt-auto">
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-4 w-4 text-accent-red mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentCard;
