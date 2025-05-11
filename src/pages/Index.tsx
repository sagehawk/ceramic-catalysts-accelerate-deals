
import { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import ProgramBenefits from "@/components/ProgramBenefits";
import HeroSection from "@/components/enrollment/HeroSection";
import PageFooter from "@/components/enrollment/PageFooter";
import MultiStepEnrollment from "@/components/enrollment/MultiStepEnrollment";

const Index = () => {
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

  // Get dynamic subheader text based on current view
  const getDynamicSubheader = () => {
    return "Choose the investment model that works best for your business";
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
      <ProgramBenefits />

      {/* Multi-Step Enrollment Flow */}
      <MultiStepEnrollment 
        allPlans={allPlans}
        primaryPlans={primaryPlans}
      />

      {/* Footer */}
      <PageFooter />
    </div>
  );
};

export default Index;
