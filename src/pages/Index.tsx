
import { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import MultiStepEnrollment from "@/components/enrollment/MultiStepEnrollment";

const Index = () => {
  const allPlans = [
    {
      id: 1,
      title: "6-Month Plan (One-Time Payment)",
      totalPrice: 4500,
      installments: 1,
      daysInPlan: 180,
      valueProposition: "Save 50% vs. monthly payments",
      isBestValue: true,
    },
    {
      id: 3,
      title: "2-Payment Plan",
      totalPrice: 5000,
      installments: 2,
      daysInPlan: 180,
      valueProposition: "Save 44% vs. monthly payments",
    },
    {
      id: 4,
      title: "3-Payment Plan",
      totalPrice: 5400,
      installments: 3,
      daysInPlan: 180,
      valueProposition: "Save 40% vs. monthly payments",
    },
    {
      id: 2,
      title: "6-Month Plan (Monthly Billing)",
      totalPrice: 9000,
      installments: 6,
      daysInPlan: 180,
      valueProposition: "Maximum Flexibility",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-charcoal to-slate text-white px-4 py-8">
      <div className="container mx-auto flex justify-center mb-12">
        <Logo />
      </div>

      <MultiStepEnrollment 
        allPlans={allPlans}
        primaryPlans={allPlans.slice(0, 2)}
      />
    </div>
  );
};

export default Index;
