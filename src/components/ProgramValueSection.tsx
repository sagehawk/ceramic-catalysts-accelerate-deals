
import React from 'react';
import { CheckCircle, Shield } from 'lucide-react';

const ProgramValueSection = () => {
  const benefits = [
    "Guaranteed 90 new ceramic coating/PPF jobs in 6 months",
    "Expertly managed Facebook ad campaigns targeting premium vehicles",
    "High-converting custom landing pages optimized for auto detailing",
    "Comprehensive conversion assistance (offer creation, scripts, time management)",
    "Proven $897 Ceramic Coating Special Offer strategy for your ads"
  ];

  return (
    <div className="container mx-auto max-w-5xl mb-12">
      <div className="bg-gradient-to-r from-slate to-charcoal rounded-2xl p-8 border border-gray-700 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">What Your Program Investment Unlocks</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-accent-red mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-white">{benefit}</span>
              </div>
            ))}
          </div>
          
          <div className="bg-slate bg-opacity-40 rounded-xl p-5 flex flex-col justify-center">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-accent-red mr-3" />
              <h3 className="text-xl font-semibold text-white">Our "Refund The Difference" Guarantee</h3>
            </div>
            <p className="text-gray-300">
              If we fail to deliver 90 jobs in 6 months (with the required $1.5k/mo ad spend), 
              we'll refund the difference. For example, if we only deliver 80 jobs, 
              you get a refund for the 10 missing jobs.
            </p>
            <div className="mt-4 bg-accent-red bg-opacity-20 p-3 rounded-lg">
              <p className="text-white font-medium text-sm">
                We take on the risk, so you can invest with confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramValueSection;
