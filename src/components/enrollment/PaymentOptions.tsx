
import React from 'react';
import PaymentCard from '../PaymentCard';

interface Plan {
  id: number;
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
}

interface PaymentOptionsProps {
  visiblePlans: Plan[];
  selectedPlanId: number | null;
  setSelectedPlanId: (id: number) => void;
  isAnimating: boolean;
  showCompactView: boolean;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  visiblePlans,
  selectedPlanId,
  setSelectedPlanId,
  isAnimating,
  showCompactView
}) => {
  return (
    <div className={`grid grid-cols-1 gap-6 mb-4 transition-opacity duration-300 ease-in-out ${isAnimating ? "opacity-0" : "opacity-100"}`}>
      {visiblePlans.map((plan) => (
        <PaymentCard
          key={plan.id}
          title={plan.title}
          totalPrice={plan.totalPrice}
          installments={plan.installments}
          daysInPlan={plan.daysInPlan}
          benefit={plan.benefit}
          description={plan.description}
          valueProposition={plan.valueProposition}
          features={plan.features}
          isPrimary={plan.isPrimary}
          isBestValue={plan.isBestValue}
          isSelected={selectedPlanId === plan.id}
          onClick={() => setSelectedPlanId(plan.id)}
          showCompactView={showCompactView}
        />
      ))}
    </div>
  );
};

export default PaymentOptions;
