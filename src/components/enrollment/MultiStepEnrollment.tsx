
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StripePaymentForm from '../payment/StripePaymentForm';

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

interface MultiStepEnrollmentProps {
  allPlans: Plan[];
  primaryPlans: Plan[];
}

const MultiStepEnrollment: React.FC<MultiStepEnrollmentProps> = ({ allPlans, primaryPlans }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [showAllPlans, setShowAllPlans] = useState(false);

  // Show only the 6-month plan initially (best value plan)
  const bestValuePlan = allPlans.find(plan => plan.isBestValue);
  const visiblePlans = showAllPlans ? allPlans : (bestValuePlan ? [bestValuePlan] : []);

  // Find the selected plan from all available plans
  const selectedPlan = selectedPlanId 
    ? allPlans.find(plan => plan.id === selectedPlanId) || null
    : null;

  const handleContinueToPayment = () => {
    if (selectedPlanId) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToPlanSelection = () => {
    setCurrentStep(1);
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <AnimatePresence mode="wait">
        {currentStep === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              Choose Your Investment Plan
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Get 90+ high-value jobs in 6 months - guaranteed
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {visiblePlans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`
                    relative p-8 rounded-2xl cursor-pointer transition-all duration-300
                    ${selectedPlanId === plan.id 
                      ? 'bg-slate border-2 border-accent-red transform scale-105' 
                      : 'bg-slate/80 border border-gray-700 hover:border-accent-red hover:scale-102'
                    }
                  `}
                >
                  {plan.isBestValue && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent-red text-white px-6 py-2 rounded-full font-bold text-sm">
                      BEST VALUE
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold text-white mb-4">{plan.title}</h3>
                  
                  <div className="mb-6">
                    {plan.installments === 1 ? (
                      <div className="text-center">
                        <div className="text-4xl font-bold text-white">${plan.totalPrice.toLocaleString()}</div>
                        <div className="text-gray-400">one-time payment</div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-4xl font-bold text-white">
                          ${Math.round(plan.totalPrice / plan.installments).toLocaleString()}
                        </div>
                        <div className="text-gray-400">
                          {plan.installments === 6 ? '/month' : `× ${plan.installments} payments`}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Total: ${plan.totalPrice.toLocaleString()}
                        </div>
                      </div>
                    )}
                  </div>

                  {plan.valueProposition && (
                    <div className={`
                      text-center py-2 px-4 rounded-lg text-sm font-medium mb-4
                      ${plan.valueProposition.includes('Save') 
                        ? 'bg-green-900/30 text-green-400' 
                        : 'bg-gray-900/30 text-gray-300'
                      }
                    `}>
                      {plan.valueProposition}
                    </div>
                  )}

                  {selectedPlanId === plan.id && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-accent-red rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!showAllPlans && (
              <button
                onClick={() => setShowAllPlans(true)}
                className="text-accent-red hover:text-accent-red/80 underline mb-8 transition-colors"
              >
                Show more payment options
              </button>
            )}

            <button
              onClick={handleContinueToPayment}
              disabled={!selectedPlanId}
              className={`
                px-12 py-4 text-xl font-bold rounded-xl transition-all duration-300
                ${selectedPlanId 
                  ? 'bg-accent-red hover:bg-accent-red/90 text-white shadow-lg hover:shadow-xl' 
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              Continue to Payment
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <StripePaymentForm 
              selectedPlan={selectedPlan} 
              onBackClick={handleBackToPlanSelection} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MultiStepEnrollment;
