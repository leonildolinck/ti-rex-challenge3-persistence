import React from "react";
import PlaceOrder from "../common/PlaceOrder";
import CheckoutForm from "../common/CheckoutForm";

const CheckoutSection: React.FC = () => {
  return (
    <div className="flex flex-row">
      <CheckoutForm />
      <PlaceOrder />
    </div>
  );
};

export default CheckoutSection;
