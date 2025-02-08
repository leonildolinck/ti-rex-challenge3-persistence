import React from "react";
import Form from "../common/Form";
import PlaceOrder from "../common/PlaceOrder";

const CheckoutSection: React.FC = () => {
  return (
    <div className="flex flex-row">
      <Form />
      <PlaceOrder />
    </div>
  );
};

export default CheckoutSection;
