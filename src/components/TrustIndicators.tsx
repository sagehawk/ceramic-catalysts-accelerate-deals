
import React from 'react';

const TrustIndicators = () => {
  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="bg-slate bg-opacity-50 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-blue mb-1">17+</div>
            <div className="text-gray-300 text-sm">Successful Auto Detail Shops</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-blue mb-1">$2.4M+</div>
            <div className="text-gray-300 text-sm">Additional Revenue Generated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-blue mb-1">5-10</div>
            <div className="text-gray-300 text-sm">New Clients Per Month Only</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;
