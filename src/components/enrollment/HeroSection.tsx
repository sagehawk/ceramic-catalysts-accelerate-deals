
import React from 'react';

interface HeroSectionProps {
  dynamicSubheader: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({ dynamicSubheader }) => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center pt-16 pb-8 text-center">
      <h1 className="text-4xl font-bold text-white mb-2">Secure Your Spot: The 90-Job Guarantee Program</h1>
      <p className="text-xl text-gray-300 max-w-3xl mb-6">
        Let's Get You 90+ High-Value Ceramic Coating & PPF Jobs in 6 Months – Guaranteed!
      </p>
      
      {/* Dynamic value proposition based on selection */}
      <div className="bg-slate bg-opacity-50 p-4 rounded-xl mb-8 max-w-3xl">
        <p className="text-lg text-white">
          {dynamicSubheader}
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
