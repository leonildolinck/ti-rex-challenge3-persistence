import React, { useState } from "react";

interface OrderDetails {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  zipCode: string;
  streetAddress: string;
  province: string;
  townCity: string;
  country: string;
  addOnAddress: string;
  additionalInfo: string;
  cartItems: { name: string; price: number; quantity: number }[];
  totalPrice: number;
}

const OrderOverlay: React.FC<{ order: OrderDetails }> = ({ order }) => {
  return (
    <div className="fixed top-0 left-0 z-50 bg-black bg-opacity-50 h-full w-full flex items-center justify-center">
      <div className="bg-white w-[500px] p-8 rounded-lg">
        <button className="absolute top-2 right-2" onClick={() => setIsOpen(false)}>
          <img src="https://desafio-3.s3.us-east-1.amazonaws.com/profile-close.svg" alt="Close" className="h-[25px] w-[25px]" />
        </button>
        <h2 className="text-2xl font-semibold mb-4">Order Details</h2>

        <div className="space-y-4">
          <div><strong>Name:</strong> {order.firstName} {order.lastName}</div>
          <div><strong>Email:</strong> {order.email}</div>
          <div><strong>Zip Code:</strong> {order.zipCode}</div>
          <div><strong>Address:</strong> {order.streetAddress}, {order.province}, {order.townCity}</div>
          <div><strong>Country:</strong> {order.country || "N/A"}</div>
          <div><strong>Additional Info:</strong> {order.additionalInfo}</div>
          <div><strong>Add On Address:</strong> {order.addOnAddress}</div>

          <div>
            <h3 className="mt-4">Cart Items</h3>
            <ul className="list-disc pl-5">
              {order.cartItems.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.quantity} x ${item.price / 100} = ${(item.price * item.quantity) / 100}
                </li>
              ))}
            </ul>
          </div>

          <div><strong>Total Price:</strong> ${(order.totalPrice / 100).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

const ProfileModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const orderData = {
    id: "b99d",
    firstName: "Leonildo",
    lastName: "Linck",
    email: "leonildolinck@gmail.com",
    zipCode: "22793395",
    streetAddress: "Rua Sylvio da Rocha Pollis",
    province: "Barra da Tijuca",
    townCity: "Rio de Janeiro",
    country: "",
    addOnAddress: "423432",
    additionalInfo: "432432432",
    cartItems: [
      {
        name: "BohoChic",
        price: 1200000,
        quantity: 6,
      },
    ],
    totalPrice: 7200000,
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="btn-open-overlay">View Order Details</button>

      {isOpen && <OrderOverlay order={orderData} />}
    </div>
  );
};

export default ProfileModal;
