import React, { useState } from "react";
import PlaceOrder from "../common/PlaceOrder";
import CheckoutForm from "../common/CheckoutForm";

interface FormData {
  zipCode: string;
  streetAddress: string;
  province: string;
  townCity: string;
  country: string;
  addOnAddress: string;
  additionalInfo: string;
}

const CheckoutSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    zipCode: '',
    streetAddress: '',
    province: '',
    townCity: '',
    country: '',
    addOnAddress: '',
    additionalInfo: ''
  });

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
  };

  return (
    <div className="lg:flex lg:flex-row sm:flex sm:flex-col">
      <CheckoutForm onFormSubmit={handleFormSubmit} />
      <PlaceOrder formData={formData} />
    </div>
  );
};

export default CheckoutSection;
