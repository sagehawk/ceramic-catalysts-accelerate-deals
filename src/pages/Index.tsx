
import { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import PaymentForm from "@/components/payment/PaymentForm";
import ProgramBenefits from "@/components/ProgramBenefits";
import Testimonials from "@/components/Testimonials";
import TrustIndicators from "@/components/TrustIndicators";
import ProgramValueSection from "@/components/ProgramValueSection";
import HeroSection from "@/components/enrollment/HeroSection";
import PaymentOptions from "@/components/enrollment/PaymentOptions";
import PlanOptionsToggle from "@/components/enrollment/PlanOptionsToggle";
import AdSpendNotice from "@/components/enrollment/AdSpendNotice";
import PageFooter from "@/components/enrollment/PageFooter";

const Index = () => {
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [showAllOptions, setShowAllOptions] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visiblePlans, setVisiblePlans] = useState<any[]>([]);

  // Primary plan options (initially visible)
  const primaryPlans = [
    {
      id: 1,
      title: "6-Month Plan (One-Time Payment)",
      totalPrice: 4500,
      installments: 1,
      daysInPlan: 180,
      benefit: "Priority Onboarding & Setup",
      isPrimary: true,
      description: "One-time payment for full program access",
      valueProposition: "Save 50% vs. monthly payments",
      isBestValue: true,
      features: ["Full 6-month program access", "Priority Onboarding & Setup"]
    },
    {
      id: 2,
      title: "6-Month Plan (Monthly Billing)",
      totalPrice: 9000, // Total cost for monthly plan
      installments: 6,
      daysInPlan: 180,
      isPrimary: true,
      description: "$1,500 per month for 6 months",
      valueProposition: "No discount",
      features: ["Full 6-month program access"]
    }
  ];

  // All plan options (shown when "See All Options" is clicked)
  const allPlans = [
    // Include primary plans first (best value)
    primaryPlans[0], // One-time payment (Best value - 50% savings)
    
    // Then installment plans in order of savings
    {
      id: 3,
      title: "2-Payment Plan",
      totalPrice: 5000,
      installments: 2,
      daysInPlan: 180,
      isPrimary: false,
      description: "2 × $2,500 (today & 30 days)",
      valueProposition: "Save 44% vs. monthly payments",
      features: ["Full 6-month program access"]
    },
    {
      id: 4,
      title: "3-Payment Plan",
      totalPrice: 5400,
      installments: 3,
      daysInPlan: 180,
      isPrimary: false,
      description: "3 × $1,800 (today, 30 days, 60 days)",
      valueProposition: "Save 40% vs. monthly payments",
      features: ["Full 6-month program access"]
    },
    
    // Lastly, the monthly plan (no discount)
    primaryPlans[1] // Monthly plan (moved to the end as it has no discount)
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
    <div className="min-h-screen bg-gradient-to-b from-charcoal to-slate text-white px-4 py-8">
      {/* Logo Header */}
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
      </div>

      {/* Hero Section */}
      <HeroSection dynamicSubheader={getDynamicSubheader()} />

      {/* Program Benefits */}
      <ProgramValueSection />

      {/* Plan Cards Section */}
      <div className="container mx-auto max-w-5xl mb-10">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          {showAllOptions ? "Choose Your Payment Option" : "Select Your Investment Model"}
        </h2>
        
        <PaymentOptions
          visiblePlans={visiblePlans}
          selectedPlanId={selectedPlanId}
          setSelectedPlanId={setSelectedPlanId}
          isAnimating={isAnimating}
          showCompactView={showAllOptions}
        />
        
        <PlanOptionsToggle
          showAllOptions={showAllOptions}
          handleToggleOptions={handleToggleOptions}
        />

        {/* Ad Spend Notice */}
        <AdSpendNotice />

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
      <PageFooter />
    </div>
  );
};

export default Index;
