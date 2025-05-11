
import React from 'react';

const PageFooter: React.FC = () => {
  return (
    <div className="container mx-auto text-center text-sm text-gray-500 mt-12">
      <p>© 2023 Ceramic Catalysts. All rights reserved.</p>
      <p className="mt-2">Secure payment processing by Stripe</p>
      <p className="mt-2">
        <a href="#" className="text-accent-red hover:underline mr-4">Terms & Conditions</a>
        <a href="#" className="text-accent-red hover:underline">Privacy Policy</a>
      </p>
    </div>
  );
};

export default PageFooter;
