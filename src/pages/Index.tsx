
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import PaymentCard from "@/components/PaymentCard";
import PaymentForm from "@/components/PaymentForm";
import { ChevronDown, ChevronUp } from "lucide-react";

const Index = () => {
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visiblePlans, setVisiblePlans] = useState<any[]>([]);

  const plans = [
    {
      id: 1,
      title: "Pay in Full (6 months)",
      totalPrice: 4500,
      installments: 1,
      daysInPlan: 180,
      monthlySavings: 4500,
      includesGift: true,
    },
    {
      id: 2,
      title: "2 Installments",
      totalPrice: 7200,
      installments: 2,
      daysInPlan: 180,
      monthlySavings: 1800,
      includesGift: true,
    },
    {
      id: 3,
      title: "3 Installments",
      totalPrice: 7650,
      installments: 3,
      daysInPlan: 180,
      monthlySavings: 1350,
      includesGift: true,
    },
    {
      id: 4,
      title: "Monthly (6 × $1,500)",
      totalPrice: 9000,
      installments: 6,
      daysInPlan: 180,
      monthlySavings: 0,
      includesGift: true,
    },
  ];

  // Set initial visible plans
  useEffect(() => {
    setVisiblePlans([plans[0], plans[plans.length - 1]]);
  }, []);

  const selectedPlan = selectedPlanId 
    ? plans.find(plan => plan.id === selectedPlanId) || null
    : null;

  const handleToggleOptions = () => {
    setIsAnimating(true);
    
    // If showing more options, first fade out
    setTimeout(() => {
      // After fade out, update the plans
      if (showMoreOptions) {
        setVisiblePlans([plans[0], plans[plans.length - 1]]);
      } else {
        setVisiblePlans([...plans]);
      }
      
      // Toggle the state
      setShowMoreOptions(!showMoreOptions);
      
      // Add a small delay before fading back in
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 300); // Match this duration with the CSS transition
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-charcoal to-slate text-white px-4 py-8">
      {/* Logo Header */}
      <div className="container mx-auto">
        <Logo />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto flex flex-col items-center justify-center pt-16 pb-12 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h1>
        <p className="text-base text-gray-300 max-w-xl">
          Select the best option for your business and see the daily cost that fits your budget.
        </p>
      </div>

      {/* Plan Cards Section */}
      <div className="container mx-auto max-w-5xl mb-16">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${showMoreOptions ? "2" : "2"} gap-6 mb-4 transition-opacity duration-300 ease-in-out ${isAnimating ? "opacity-0" : "opacity-100"}`}>
          {visiblePlans.map((plan) => (
            <PaymentCard
              key={plan.id}
              title={plan.title}
              totalPrice={plan.totalPrice}
              installments={plan.installments}
              daysInPlan={plan.daysInPlan}
              monthlySavings={plan.monthlySavings}
              isSelected={selectedPlanId === plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              includesGift={plan.includesGift}
            />
          ))}
        </div>

        {/* Toggle More Options */}
        <div className="flex justify-center mb-8">
          <Button
            variant="ghost"
            className="text-text-secondary hover:text-white"
            onClick={handleToggleOptions}
          >
            {showMoreOptions ? (
              <>
                <span className="mr-2">Hide payment options</span>
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                <span className="mr-2">See more payment options</span>
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        {/* Payment Form */}
        <div className="mt-8">
          <PaymentForm selectedPlan={selectedPlan} />
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto text-center text-sm text-gray-500 mt-12">
        <p>© 2023 Ceramic Catalysts. All rights reserved.</p>
        <p className="mt-2">Secure payment processing by Stripe</p>
      </div>
    </div>
  );
};

export default Index;
