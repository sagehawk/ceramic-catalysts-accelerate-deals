
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StripePaymentForm from '../payment/StripePaymentForm';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X, ExternalLink } from 'lucide-react';

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
  isPopular?: boolean;
  costPerJob: number;
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
  const [showTerms, setShowTerms] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Update plans with cost per job and popularity
  const updatedAllPlans = allPlans.map(plan => ({
    ...plan,
    costPerJob: plan.id === 1 ? 50 : plan.id === 3 ? 56 : plan.id === 4 ? 60 : 100,
    isPopular: plan.id === 3 // 2-Pay plan is most popular
  }));

  // Show only 6-month and 2-pay initially
  const defaultPlans = updatedAllPlans.filter(plan => plan.id === 1 || plan.id === 3);
  const visiblePlans = showAllPlans ? updatedAllPlans : defaultPlans;

  // Find the selected plan from all available plans
  const selectedPlan = selectedPlanId 
    ? updatedAllPlans.find(plan => plan.id === selectedPlanId) || null
    : null;

  const handleContinueToPayment = () => {
    if (selectedPlanId && agreedToTerms) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToPlanSelection = () => {
    setCurrentStep(1);
  };

  const handleShowMoreOptions = () => {
    setShowAllPlans(true);
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

            <div className="max-w-2xl mx-auto">
              {/* Plan Cards */}
              <motion.div 
                className={`grid gap-6 mb-6 transition-all duration-250 ease-out ${
                  showAllPlans 
                    ? 'grid-cols-1 md:grid-cols-2' 
                    : 'grid-cols-1 max-w-md mx-auto'
                }`}
                layout
              >
                {visiblePlans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    layout
                    initial={showAllPlans ? { opacity: 0, y: 20 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`
                      relative p-6 rounded-2xl cursor-pointer transition-all duration-300
                      ${selectedPlanId === plan.id 
                        ? 'bg-slate border-2 border-accent-red transform scale-105' 
                        : 'bg-slate/80 border border-gray-700 hover:border-accent-red hover:scale-102'
                      }
                    `}
                    role="button"
                    aria-label={`Select ${plan.title} plan`}
                  >
                    {/* Badges */}
                    {plan.isBestValue && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent-red text-white px-6 py-2 rounded-full font-bold text-sm">
                        BEST VALUE
                      </div>
                    )}
                    {plan.isPopular && (
                      <div className="absolute -top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-sm">
                        MOST POPULAR
                      </div>
                    )}
                    
                    <h3 className="text-2xl font-bold text-white mb-4 mt-2">{plan.title}</h3>
                    
                    {/* Pricing */}
                    <div className="mb-4">
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

                    {/* Cost per job bar */}
                    <div className="bg-emerald-900 text-emerald-200 py-2 px-4 rounded-lg text-sm font-medium mb-4 text-center">
                      ${plan.costPerJob} per booked job
                    </div>

                    {/* Footnote */}
                    <p className="text-sm text-gray-400 italic text-center">
                      10% success fee only after $45k revenue.
                    </p>

                    {/* Selection indicator */}
                    {selectedPlanId === plan.id && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-accent-red rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              {/* Show more options button */}
              {!showAllPlans && (
                <button
                  onClick={handleShowMoreOptions}
                  className="text-accent-red hover:text-accent-red/80 underline mb-6 transition-colors text-lg"
                  aria-label="Show all payment plan options"
                >
                  Show all plans (3-Pay & Monthly)
                </button>
              )}

              {/* Rationale copy */}
              <p className="text-sm text-gray-400 text-center mb-8 max-w-lg mx-auto">
                Both plans deliver 90+ booked jobs in 6 months.<br />
                +$1,500/mo ad budget paid direct to Meta/Google.
              </p>

              {/* Terms checkbox */}
              <div className="mb-6 text-left max-w-md mx-auto">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 text-accent-red bg-slate border-gray-600 rounded focus:ring-accent-red focus:ring-2"
                  />
                  <label htmlFor="agreeToTerms" className="text-white text-base leading-tight">
                    I've read and agree to the{' '}
                    <button
                      onClick={() => setShowTerms(true)}
                      className="text-accent-red hover:text-accent-red/80 underline"
                      aria-label="View Key Service Terms"
                    >
                      Key Service Terms
                    </button>
                    {' '}and the{' '}
                    <a
                      href="https://drive.google.com/drive/folders/1nlfofC3loLvx6BJ0TVrMgYBOso9FaISl?usp=drive_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-red hover:text-accent-red/80 underline inline-flex items-center"
                      aria-label="View full Terms of Service (opens in new tab)"
                    >
                      full Terms of Service
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                    .
                  </label>
                </div>
                <p className="text-xs text-gray-400 mt-2 ml-7">
                  Includes 90-Job Guarantee, ad budget requirements, and 10% success fee.
                </p>
              </div>

              {/* CTA Button */}
              <Button
                onClick={handleContinueToPayment}
                disabled={!selectedPlanId || !agreedToTerms}
                className={`
                  w-full h-14 text-lg font-bold rounded-xl shadow-lg transition-all duration-300
                  ${selectedPlanId && agreedToTerms
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                Lock In My 90 Jobs
              </Button>
            </div>
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

      {/* Terms of Service Sheet */}
      <Sheet open={showTerms} onOpenChange={setShowTerms}>
        <SheetContent className="w-full max-w-[560px] bg-charcoal border-gray-700 text-white overflow-y-auto">
          <SheetHeader className="border-b border-gray-700 pb-4 mb-6">
            <SheetTitle className="text-xl font-bold text-white flex items-center justify-between">
              Key Service Terms
              <button
                onClick={() => setShowTerms(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close terms panel"
              >
                <X className="h-5 w-5" />
              </button>
            </SheetTitle>
          </SheetHeader>
          
          <div className="space-y-6 text-gray-300">
            <div>
              <h3 className="text-white font-semibold mb-2">Program you chose</h3>
              <p>• 90-Job Guarantee: 90 ceramic/PPF bookings in 180 days.</p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">Your investment</h3>
              <p>• Set-up fee: based on plan you select.</p>
              <p>• Ad budget: min $1,500/mo paid direct to Meta/Google.</p>
              <p>• Success fee: after we help you clear $45k revenue, you share 10% of any revenue we generated.</p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">Our guarantee</h3>
              <p>• Fall short of 90 jobs? We refund the pro-rata difference on the set-up fee.</p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">Your part</h3>
              <p>• Pay ads + fees on time, give us account access, follow up leads within 15 min, and keep shop capacity ready.</p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">Key legal bits</h3>
              <p>• We own our marketing IP; you own your customers.</p>
              <p>• Liability limited as described in full TOS.</p>
              <p>• British Columbia law; good-faith arbitration first.</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700">
            <p className="text-xs text-gray-400 text-center mb-4">
              This is a plain-language summary. The full Terms of Service are legally binding.
            </p>
            <Button 
              onClick={() => setShowTerms(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Back to Checkout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MultiStepEnrollment;
