
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PaymentFormFieldsProps {
  formData: {
    fullName: string;
    email: string;
    cardNumber: string;
    expiry: string;
    cvc: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentFormFields: React.FC<PaymentFormFieldsProps> = ({ formData, handleChange }) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-text-secondary">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          placeholder="John Smith"
          className="bg-slate border-gray-700 text-white placeholder:text-gray-500"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" className="text-text-secondary">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="john@example.com"
          className="bg-slate border-gray-700 text-white placeholder:text-gray-500"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="cardNumber" className="text-text-secondary">Card Number</Label>
        <Input
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          required
          placeholder="4242 4242 4242 4242"
          className="bg-slate border-gray-700 text-white placeholder:text-gray-500"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry" className="text-text-secondary">Expiry Date</Label>
          <Input
            id="expiry"
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
            required
            placeholder="MM/YY"
            className="bg-slate border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cvc" className="text-text-secondary">CVC</Label>
          <Input
            id="cvc"
            name="cvc"
            value={formData.cvc}
            onChange={handleChange}
            required
            placeholder="123"
            maxLength={3}
            className="bg-slate border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>
      </div>
    </>
  );
};

export default PaymentFormFields;
