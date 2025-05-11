
import React from 'react';
import PaymentOptions from './PaymentOptions';
import PlanOptionsToggle from './PlanOptionsToggle';
import { Button } from "@/components/ui/button";

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

interface PlanSelectionProps {
  visiblePlans: Plan[];
  selectedPlanId: number | null;
  setSelectedPlanId: (id: number) => void;
  isAnimating: boolean;
  showCompactView: boolean;
  handleToggleOptions: () => void;
  showAllOptions: boolean;
  handleContinueToPayment: () => void;
}

const PlanSelection: React.FC<PlanSelectionProps> = ({
  visiblePlans,
  selectedPlanId,
  setSelectedPlanId,
  isAnimating,
  showCompactView,
  handleToggleOptions,
  showAllOptions,
  handleContinueToPayment
}) => {
  return (
    <div className="mb-8">
      <PaymentOptions
        visiblePlans={visiblePlans}
        selectedPlanId={selectedPlanId}
        setSelectedPlanId={setSelectedPlanId}
        isAnimating={isAnimating}
        showCompactView={showCompactView}
      />
      
      <PlanOptionsToggle
        showAllOptions={showAllOptions}
        handleToggleOptions={handleToggleOptions}
      />

      <div className="flex justify-center mt-8">
        <Button 
          onClick={handleContinueToPayment}
          disabled={!selectedPlanId}
          className={`py-6 px-10 text-lg w-full max-w-md ${
            selectedPlanId ? 'bg-accent-red hover:bg-accent-red/90 animate-red-glow' : 'bg-gray-500'
          }`}
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default PlanSelection;
