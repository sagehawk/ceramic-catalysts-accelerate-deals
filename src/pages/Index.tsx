
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import PaymentCard from "@/components/PaymentCard";
import PaymentForm from "@/components/PaymentForm";
import ProgramBenefits from "@/components/ProgramBenefits";
import Testimonials from "@/components/Testimonials";
import TrustIndicators from "@/components/TrustIndicators";
import { Shield, Info, CheckCircle } from "lucide-react";

const Index = () => {
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visiblePlans, setVisiblePlans] = useState<any[]>([]);

  const plans = [
    {
      id: 1,
      title: "Pay in Full",
      totalPrice: 4500,
      installments: 1,
      daysInPlan: 180,
      benefit: "Priority Onboarding & Setup",
      description: "One-time payment for program setup"
    },
    {
      id: 2,
      title: "2 Installments",
      totalPrice: 4500,
      installments: 2,
      daysInPlan: 180,
      description: "First payment today, second payment in 30 days"
    },
    {
      id: 3,
      title: "3 Installments",
      totalPrice: 4500,
      installments: 3,
      daysInPlan: 180,
      description: "First payment today, remaining payments monthly"
    }
  ];

  // Set initial visible plans to show all plans
  useEffect(() => {
    setVisiblePlans([...plans]);
  }, []);

  const selectedPlan = selectedPlanId 
    ? plans.find(plan => plan.id === selectedPlanId) || null
    : null;

  // The function below is no longer needed as we're showing all plans by default
  const handleToggleOptions = () => {
    setIsAnimating(true);
    
    setTimeout(() => {
      if (showMoreOptions) {
        setVisiblePlans([plans[0], plans[plans.length - 1]]);
      } else {
        setVisiblePlans([...plans]);
      }
      
      setShowMoreOptions(!showMoreOptions);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
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
        <div className="bg-slate bg-opacity-50 p-4 rounded-xl mb-8 max-w-3xl">
          <p className="text-lg text-white">
            <span className="font-semibold">One-time setup fee:</span> $4,500 - Choose your preferred payment plan below
          </p>
        </div>
        
        {/* Value Statement */}
        <div className="mb-8 text-accent-blue">
          <p className="text-lg font-medium">Your $4,500 setup investment averages to just $25/day over 6 months for guaranteed results!</p>
        </div>
      </div>

      {/* Program Benefits */}
      <ProgramBenefits />

      {/* Plan Cards Section */}
      <div className="container mx-auto max-w-5xl mb-10">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Choose Your Payment Option</h2>
        
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4 transition-opacity duration-300 ease-in-out ${isAnimating ? "opacity-0" : "opacity-100"}`}>
          {visiblePlans.map((plan) => (
            <PaymentCard
              key={plan.id}
              title={plan.title}
              totalPrice={plan.totalPrice}
              installments={plan.installments}
              daysInPlan={plan.daysInPlan}
              benefit={plan.benefit}
              description={plan.description}
              isSelected={selectedPlanId === plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
            />
          ))}
        </div>

        {/* Ad Spend Notice */}
        <div className="bg-slate rounded-xl p-4 mb-10 max-w-3xl mx-auto border border-gray-700">
          <div className="flex items-start">
            <Info className="h-6 w-6 text-accent-blue mr-3 mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-300 text-sm">
                <span className="font-semibold text-white">Program Success Requirement:</span> A minimum ad spend of $1,500 per month (paid directly to ad platforms) is required to achieve the 90-job guarantee. This is separate from the setup fee.
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
          <a href="#" className="text-accent-blue hover:underline mr-4">Terms & Conditions</a>
          <a href="#" className="text-accent-blue hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default Index;
