
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PlanSelection from './PlanSelection';
import StripePaymentForm from '../payment/StripePaymentForm';
import ProgramValueSection from '../ProgramValueSection';
import Testimonials from '../Testimonials';
import TrustIndicators from '../TrustIndicators';
import AdSpendNotice from './AdSpendNotice';

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
  const [showAllOptions, setShowAllOptions] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visiblePlans, setVisiblePlans] = useState<Plan[]>([]);

  // Find the selected plan from all available plans
  const selectedPlan = selectedPlanId 
    ? allPlans.find(plan => plan.id === selectedPlanId) || null
    : null;

  // Set initial visible plans to show primary plans
  useEffect(() => {
    setVisiblePlans([...primaryPlans]);
  }, [primaryPlans]);

  const handleToggleOptions = () => {
    setIsAnimating(true);
    
    setTimeout(() => {
      if (showAllOptions) {
        setVisiblePlans([...primaryPlans]);
      } else {
        setVisiblePlans([...allPlans]);
      }
      
      setShowAllOptions(!showAllOptions);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }, 300);
  };

  const handleContinueToPayment = () => {
    if (selectedPlanId) {
      setCurrentStep(2);
      // Scroll to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToPlanSelection = () => {
    setCurrentStep(1);
  };

  // Get dynamic subheader text based on selected plan
  const getDynamicSubheader = () => {
    if (!selectedPlan) {
      return "Choose the investment model that works best for your business";
    }
    
    if (selectedPlan.id === 1) {
      return (
        <>
          <span className="font-semibold">Your $4,500 setup investment</span> averages to just $25/day over 6 months for guaranteed results!
        </>
      );
    } else if (selectedPlan.id === 2) {
      return "Our Flexible Monthly option gives you peace of mind with manageable payments";
    } else {
      return "Installment plans offer flexibility while still saving significantly compared to monthly";
    }
  };

  return (
    <div className="container mx-auto max-w-5xl mb-10">
      <AnimatePresence mode="wait">
        {currentStep === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Secure Your Spot: The 90-Job Guarantee Program
            </h2>
            <p className="text-xl text-center text-gray-300 mb-8">
              Let's Get You 90+ High-Value Ceramic Coating & PPF Jobs in 6 Months – Guaranteed!
            </p>

            {/* Program Value Section */}
            <ProgramValueSection />
            
            {/* Plan Selection */}
            <h2 className="text-2xl font-semibold text-white mb-6 text-center mt-12">
              {showAllOptions ? "Choose Your Payment Option" : "Select Your Investment Model"}
            </h2>
            
            <PlanSelection 
              visiblePlans={visiblePlans}
              selectedPlanId={selectedPlanId}
              setSelectedPlanId={setSelectedPlanId}
              isAnimating={isAnimating}
              showCompactView={showAllOptions}
              handleToggleOptions={handleToggleOptions}
              showAllOptions={showAllOptions}
              handleContinueToPayment={handleContinueToPayment}
            />
            
            {/* Ad Spend Notice */}
            <AdSpendNotice />

            {/* Testimonials */}
            <Testimonials />

            {/* Trust Indicators */}
            <TrustIndicators />
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">
              Complete Your Enrollment
            </h2>
            
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
