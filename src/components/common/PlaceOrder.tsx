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
  const [showThankYou, setShowThankYou] = useState(false);

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

      setShowThankYou(true);
    } catch (err) {
      console.log(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lg:w-[608px] sm:px-10 lg:h-[789px] sm:w-full md:w-full sm:h-full md-h-full bg-white mx-auto lg:mt-[50px] relative sm:mb-8">   
      <div className="lg:w-[533px] mx-auto mt-[50px]">
        <div className="flex flex-row justify-between">
          <h2 className="text-[24px] font-medium text-black">Product</h2>
          <h2 className="text-[24px] font-medium text-black text-right">
            Subtotal
          </h2>
        </div>

        <div className="flex justify-between items-center mt-[20px] font-poppins lg:text-[16px] sm:text-[10px] md:text-[14px]">
          <div className="flex-1 overflow-auto">
            {products.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-3 items-center gap-4 text-left" 
              >
                <p className="text-left">{product.name}</p>
                <p className="text-center">x{product.quantity}</p>
                <p className="text-right">
                  R${" "}
                  {new Intl.NumberFormat("pt-BR").format(
                    product.actual_price * product.quantity
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mt-[20px]">
          <div className="lg:text-[16px] sm:text-[10px] md:text-[14px] font-light text-black">
            Subtotal
          </div>
          <div className="lg:text-[16px] md:text-[14px] sm:text-[10px] font-light text-black">
            R$ {new Intl.NumberFormat("pt-BR").format(productsTotalPrice)}
          </div>
        </div>

        <div className="flex justify-between items-center mt-[20px]">
          <div className="lg:text-[16px] sm:text-[10px] md:text-[14px] font-light text-black">
            Total
          </div>
          <div className="lg:text-[24px] sm:text-[16px] md:text-[20px] font-bold text-[#B88E2F]">
            R$ {new Intl.NumberFormat("pt-BR").format(productsTotalPrice)}
          </div>
        </div>
      </div>

      <div className="lg:w-[529px] mx-auto mt-[50px]">
        <p className="lg:text-[16px] sm:text-[10px] font-light text-justify text-black">
          Your personal data will be used to support your experience throughout
          this website, to manage access to your account, and for other purposes
          described in our privacy policy.
        </p>

        <hr className="my-[20px] border-[#D9D9D9]" />

        <div>
          <div className="flex items-center mb-[15px]">
            <div className="w-[14px] h-[14px] bg-black rounded-full"></div>
            <h3 className="ml-[15px] lg:text-[16px] sm:text-[10px] font-normal text-black">
              Direct Bank Transfer
            </h3>
          </div>
          <p className="lg:text-[16px] sm:text-[10px] font-light text-justify text-gray-600">
            Make your payment directly into our bank account. Please use your
            Order ID as the payment reference. Your order will not be shipped
            until the funds have cleared in our account.
          </p>
        </div>

        <div className="flex items-center mt-[15px]">
          <div className="w-[14px] h-[14px] border border-gray-400 rounded-full"></div>
          <h3 className="ml-[15px] lg:text-[16px] sm:text-[10px] font-medium text-gray-600">
            Direct Bank Transfer
          </h3>
        </div>

        <div className="flex items-center mt-[15px]">
          <div className="w-[14px] h-[14px] border border-gray-400 rounded-full"></div>
          <h3 className="ml-[15px] lg:text-[16px] sm:text-[10px] font-medium text-gray-600">
            Cash On Delivery
          </h3>
        </div>
        
      </div>

      <div className="lg:w-[318px] lg:h-[64px] sm:w-[218px] sm:h-[44px] border border-black rounded-[15px] mx-auto mt-[50px] flex items-center justify-center">
      {showThankYou && (
        <div className="absolute lg:inset-0 lg:bg-black lg:bg-opacity-50 flex items-center justify-center sm:border sm:w-full">
          <div className="bg-white rounded-lg p-8 lg:w-[400px] sm:w-2/3 text-center">
            <h2 className="lg:text-[24px] font-bold text-black">Thank You!</h2>
            <p className="lg:text-[16px] text-gray-600 mt-4">
              Your order has been placed successfully. You will receive a
              confirmation email shortly.
            </p>
            <button
              className="mt-6 px-4 py-2 bg-white text-black rounded-lg border"
              onClick={() => setShowThankYou(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
        <button
          className="lg:text-[20px] sm:text-[10px] font-normal text-black"
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
