
import React from 'react';
import { Info } from 'lucide-react';

const AdSpendNotice: React.FC = () => {
  return (
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
  );
};

export default AdSpendNotice;
