
import React from 'react';
import { Shield, CheckCircle, Users, Facebook, BarChart, FileText, CreditCard } from 'lucide-react';

const ProgramBenefits = () => {
  const benefits = [
    {
      icon: <Users className="h-8 w-8 text-accent-blue" />,
      title: "90+ New Jobs Guaranteed",
      description: "High-value ceramic coating & PPF jobs in 6 months"
    },
    {
      icon: <Facebook className="h-8 w-8 text-accent-blue" />,
      title: "Expert Ad Campaigns",
      description: "Targeting Tesla, trucks, premium vehicles"
    },
    {
      icon: <FileText className="h-8 w-8 text-accent-blue" />,
      title: "Converting Landing Pages",
      description: "Custom designed for your business"
    },
    {
      icon: <BarChart className="h-8 w-8 text-accent-blue" />,
      title: "Conversion Assistance",
      description: "Offer creation, scripts, time management"
    },
    {
      icon: <CreditCard className="h-8 w-8 text-accent-blue" />,
      title: "Proven Pricing Strategy",
      description: "$897 Ceramic Coating Special Offer"
    },
    {
      icon: <Shield className="h-8 w-8 text-accent-blue" />,
      title: "Results Guarantee",
      description: "We refund the difference if we don't deliver 90 jobs"
    }
  ];

  return (
    <div className="container mx-auto max-w-6xl mb-16">
      <h2 className="text-2xl font-semibold text-white mb-8 text-center">What Your Setup Fee Unlocks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-slate rounded-xl p-5 flex flex-col">
            <div className="bg-charcoal rounded-lg p-3 inline-block mb-3">
              {benefit.icon}
            </div>
            <h3 className="text-xl font-medium text-white mb-2">{benefit.title}</h3>
            <p className="text-gray-400 text-sm">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramBenefits;
