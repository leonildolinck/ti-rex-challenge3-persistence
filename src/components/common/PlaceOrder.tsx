import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectProductsTotalPrice } from "../cart/cart.selectors";
import { useUser } from "@clerk/clerk-react";
import { RootState } from "../../redux/store";

interface CheckoutFormProps {
  formData: {
    zipCode: string;
    streetAddress: string;
    province: string;
    townCity: string;
    country: string;
    addOnAddress: string;
    additionalInfo: string;
  };
}

const PlaceOrder: React.FC<CheckoutFormProps> = ({ formData }) => {
  const { user } = useUser();
  const email = user.emailAddresses?.[0]?.emailAddress || "Not available";
  const productsTotalPrice = useSelector(selectProductsTotalPrice);
  const { products } = useSelector((state: RootState) => state.cart);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cartItems = products.map((product) => ({
    name: product.name,
    price: product.actual_price,
    quantity: product.quantity,
  }));

  const handlePlaceOrder = async () => {
    const orderData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: email,
      zipCode: formData.zipCode,
      streetAddress: formData.streetAddress,
      province: formData.province,
      townCity: formData.townCity,
      country: formData.country,
      addOnAddress: formData.addOnAddress,
      additionalInfo: formData.additionalInfo,
      cartItems: cartItems,
      totalPrice: productsTotalPrice,
    };

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://ec2-34-239-122-225.compute-1.amazonaws.com:3000/invoices",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      alert("Order placed successfully!");
    } catch (err) {
      console.log(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-[608px] h-[789px] bg-white mx-auto mt-[50px]">
      <div className="w-[533px] mx-auto mt-[50px]">
        <h2 className="text-[24px] font-medium text-black">Product</h2>
        <h2 className="text-[24px] font-medium text-black text-right">
          Subtotal
        </h2>

        <div className="flex justify-between items-center mt-[20px]">
          <div className="text-[16px] font-light text-gray-600">
            Asgaard sofa
          </div>
          <div className="flex items-center mr-20">
            <span className="text-[12px] mr-10font-medium text-black">X</span>
            <span className="ml-[10px] text-[12px] font-medium text-black">
              1
            </span>
          </div>
          <div className="text-[16px] font-light text-black">
            Rs. {productsTotalPrice}
          </div>
        </div>

        <div className="flex justify-between items-center mt-[20px]">
          <div className="text-[16px] font-light text-black">Subtotal</div>
          <div className="text-[16px] font-light text-black">
            Rs. {productsTotalPrice}
          </div>
        </div>

        <div className="flex justify-between items-center mt-[20px]">
          <div className="text-[16px] font-light text-black">Total</div>
          <div className="text-[24px] font-bold text-[#B88E2F]">
            Rs. {productsTotalPrice}
          </div>
        </div>
      </div>
      <div className="w-[529px] mx-auto mt-[50px]">
        <p className="text-[16px] font-light text-justify text-black">
          Your personal data will be used to support your experience throughout
          this website, to manage access to your account, and for other purposes
          described in our privacy policy.
        </p>

        <hr className="my-[20px] border-[#D9D9D9]" />

        <div>
          <div className="flex items-center mb-[15px]">
            <div className="w-[14px] h-[14px] bg-black rounded-full"></div>
            <h3 className="ml-[15px] text-[16px] font-normal text-black">
              Direct Bank Transfer
            </h3>
          </div>
          <p className="text-[16px] font-light text-justify text-gray-600">
            Make your payment directly into our bank account. Please use your
            Order ID as the payment reference. Your order will not be shipped
            until the funds have cleared in our account.
          </p>
        </div>

        <div className="flex items-center mt-[15px]">
          <div className="w-[14px] h-[14px] border border-gray-400 rounded-full"></div>
          <h3 className="ml-[15px] text-[16px] font-medium text-gray-600">
            Direct Bank Transfer
          </h3>
        </div>

        <div className="flex items-center mt-[15px]">
          <div className="w-[14px] h-[14px] border border-gray-400 rounded-full"></div>
          <h3 className="ml-[15px] text-[16px] font-medium text-gray-600">
            Cash On Delivery
          </h3>
        </div>
      </div>

      <div className="w-[318px] h-[64px] border border-black rounded-[15px] mx-auto mt-[50px] flex items-center justify-center">
        <button
          className="text-[20px] font-normal text-black"
          onClick={handlePlaceOrder}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
