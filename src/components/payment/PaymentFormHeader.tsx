
import React from 'react';
import { CreditCard } from 'lucide-react';

const PaymentFormHeader: React.FC = () => {
  return (
    <div className="flex items-center mb-6">
      <CreditCard className="h-6 w-6 text-accent-red mr-3" />
      <h3 className="text-xl font-semibold text-white">Secure Payment Details</h3>
    </div>
  );
};

export default PaymentFormHeader;
