
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import PaymentCard from "@/components/PaymentCard";
import PaymentForm from "@/components/PaymentForm";
import ProgramBenefits from "@/components/ProgramBenefits";
import Testimonials from "@/components/Testimonials";
import TrustIndicators from "@/components/TrustIndicators";
import { Info } from "lucide-react";
import ProgramValueSection from "@/components/ProgramValueSection";

const Index = () => {
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [showAllOptions, setShowAllOptions] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visiblePlans, setVisiblePlans] = useState<any[]>([]);

  // Primary plan options (initially visible)
  const primaryPlans = [
    {
      id: 1,
      title: "Pay Upfront & Save",
      totalPrice: 4500,
      installments: 1,
      daysInPlan: 180,
      benefit: "Priority Onboarding & Setup",
      isPrimary: true,
      description: "One-time payment for full program access",
      valueProposition: "Save $4,500 compared to monthly payments!",
      dailyEquivalent: "$25/day for guaranteed results"
    },
    {
      id: 2,
      title: "Flexible Monthly",
      totalPrice: 9000, // Total cost for monthly plan
      installments: 6,
      daysInPlan: 180,
      isPrimary: true,
      description: "$1,500 per month for 6 months",
      valueProposition: "Easy monthly payments",
      dailyEquivalent: "$50/day for guaranteed results"
    }
  ];

  // All plan options (shown when "See All Options" is clicked)
  const allPlans = [
    // Include primary plans
    ...primaryPlans,
    // Additional installment options
    {
      id: 3,
      title: "2 Installments",
      totalPrice: 4600,
      installments: 2,
      daysInPlan: 180,
      isPrimary: false,
      description: "First payment today, second in 30 days",
      valueProposition: "Save $4,400 vs. standard monthly!",
      dailyEquivalent: "$25.56/day"
    },
    {
      id: 4,
      title: "3 Installments",
      totalPrice: 4650,
      installments: 3,
      daysInPlan: 180,
      isPrimary: false,
      description: "First payment today, then monthly for 2 months",
      valueProposition: "Save $4,350 vs. standard monthly!",
      dailyEquivalent: "$25.83/day"
    }
  ];

  // Set initial visible plans to show primary plans
  useEffect(() => {
    setVisiblePlans([...primaryPlans]);
  }, []);

  const selectedPlan = selectedPlanId 
    ? allPlans.find(plan => plan.id === selectedPlanId) || null
    : null;

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-charcoal to-slate text-white px-4 py-8">
      {/* Logo Header */}
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto flex flex-col items-center justify-center pt-16 pb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Secure Your Spot: The 90-Job Guarantee Program</h1>
        <p className="text-xl text-gray-300 max-w-3xl mb-6">
          Let's Get You 90+ High-Value Ceramic Coating & PPF Jobs in 6 Months – Guaranteed!
        </p>
        
        {/* Dynamic value proposition based on selection */}
        {!selectedPlan && (
          <div className="bg-slate bg-opacity-50 p-4 rounded-xl mb-8 max-w-3xl">
            <p className="text-lg text-white">
              Choose the investment model that works best for your business
            </p>
          </div>
        )}
        
        {selectedPlan && selectedPlan.id === 1 && (
          <div className="bg-slate bg-opacity-50 p-4 rounded-xl mb-8 max-w-3xl">
            <p className="text-lg text-white">
              <span className="font-semibold">Your $4,500 setup investment</span> averages to just $25/day over 6 months for guaranteed results!
            </p>
          </div>
        )}
      </div>

      {/* Program Benefits */}
      <ProgramValueSection />

      {/* Plan Cards Section */}
      <div className="container mx-auto max-w-5xl mb-10">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          {showAllOptions ? "Choose Your Payment Option" : "Select Your Investment Model"}
        </h2>
        
        <div className={`grid grid-cols-1 md:grid-cols-${visiblePlans.length > 2 ? '2' : visiblePlans.length} lg:grid-cols-${visiblePlans.length > 2 ? allPlans.length / 2 : visiblePlans.length} gap-6 mb-4 transition-opacity duration-300 ease-in-out ${isAnimating ? "opacity-0" : "opacity-100"}`}>
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
              dailyEquivalent={plan.dailyEquivalent}
              isPrimary={plan.isPrimary}
              isSelected={selectedPlanId === plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
            />
          ))}
        </div>
        
        <div className="flex justify-center mt-6">
          <Button 
            variant="outline"
            className="border-accent-red text-accent-red hover:bg-accent-red hover:text-white"
            onClick={handleToggleOptions}
          >
            {showAllOptions ? "Show Primary Options Only" : "See All Payment Options & Installments"}
          </Button>
        </div>

        {/* Ad Spend Notice */}
        <div className="bg-slate rounded-xl p-4 mb-10 mt-8 max-w-3xl mx-auto border border-gray-700">
          <div className="flex items-start">
            <Info className="h-6 w-6 text-accent-red mr-3 mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-300 text-sm">
                <span className="font-semibold text-white">Program Success Requirement:</span> A minimum ad spend of $1,500 per month (paid directly to ad platforms) is required to achieve the 90-job guarantee. This is separate from the program investment.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <Testimonials />

        {/* Trust Indicators */}
        <TrustIndicators />

        {/* Payment Form */}
        <div className="mt-10">
          <PaymentForm selectedPlan={selectedPlan} />
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto text-center text-sm text-gray-500 mt-12">
        <p>© 2023 Ceramic Catalysts. All rights reserved.</p>
        <p className="mt-2">Secure payment processing by Stripe</p>
        <p className="mt-2">
          <a href="#" className="text-accent-red hover:underline mr-4">Terms & Conditions</a>
          <a href="#" className="text-accent-red hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default Index;
