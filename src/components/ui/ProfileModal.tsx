import React, { useState, useEffect } from "react";
import { useUser, SignOutButton } from "@clerk/clerk-react";

interface Invoice {
  id: string;
  orderTime: string;
  totalPrice: number;
  email: string;
}

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

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, isSignedIn } = useUser();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedInvoice, setSelectedInvoice] = useState<OrderDetails | null>(
    null
  );

  const userEmail = user?.emailAddresses?.[0]?.emailAddress;

  useEffect(() => {
    if (isOpen && userEmail) {
      fetch("http://ec2-34-239-122-225.compute-1.amazonaws.com:3000/invoices")
        .then((response) => response.json())
        .then((data) => {
          const filteredInvoices = data.filter(
            (invoice: Invoice) => invoice.email === userEmail
          );
          const sortedInvoices = filteredInvoices.sort(
            (a, b) =>
              new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime()
          );
          setInvoices(sortedInvoices.slice(0, 5));
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching invoices:", error);
          setLoading(false);
        });
    }
  }, [isOpen, userEmail]);

  const fetchInvoiceDetails = (invoiceId: string) => {
    fetch(
      `http://ec2-34-239-122-225.compute-1.amazonaws.com:3000/invoices/${invoiceId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setSelectedInvoice(data);
      })
      .catch((error) =>
        console.error("Error fetching invoice details:", error)
      );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
  };

  if (!isOpen || !isSignedIn) return null;

  const email = userEmail || "Not available";
  const formattedSignUp = new Date(user.createdAt).toLocaleDateString();
  const formattedLastSignIn = new Date(user.lastSignInAt).toLocaleDateString();

  return (
    <div className="fixed top-0 left-0 z-50 bg-black bg-opacity-50 h-full w-full font-poppins">
      <div className="absolute flex flex-col right-0 top-0 bg-white w-[417px] min-h-[746px]">
        <div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-8"
          >
            <img
              className="h-[25px] w-[25px]"
              src="https://desafio-3.s3.us-east-1.amazonaws.com/profile-close.svg"
              alt="Close"
            />
          </button>
          <h2 className="text-2xl font-semibold mb-4 p-8">Profile</h2>
          <hr className="ml-8 mr-20 border-t border-[#D9D9D9]" />
        </div>

        <div className="flex-1 overflow-auto px-8">
          <div className="flex flex-col items-center gap-4 mt-4">
            <img
              src={user.imageUrl}
              alt="Profile Avatar"
              className="w-24 h-24 rounded-full border border-gray-300"
            />
            <h3 className="text-lg font-semibold">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-gray-600">{email}</p>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-700">Member since:</span>
              <span className="font-medium">{formattedSignUp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Last Sign In:</span>
              <span className="font-medium">{formattedLastSignIn}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-700">Total Orders:</span>
              <span className="font-medium">{invoices.length}</span>
            </div>

            <div className="mt-8 space-y-4">
              <h4 className="text-lg font-semibold">Last Invoices:</h4>
              {loading ? (
                <p className="text-gray-600">Loading invoices...</p>
              ) : invoices.length > 0 ? (
                invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-start gap-4 cursor-pointer"
                    onClick={() => fetchInvoiceDetails(invoice.id)}
                  >
                    <span className="text-gray-700">ID: {invoice.id}</span>
                    <span className="text-gray-700">
                      Date: {formatDate(invoice.orderTime)}
                    </span>
                    <span className="font-medium">{`$${invoice.totalPrice.toFixed(
                      2
                    )}`}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No invoices available</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col min-h-[84px] items-center justify-center border-t border-[#D9D9D9] mt-4">
          <div className="flex flex-row text-[12px] gap-4">
            <SignOutButton>
              <button className="flex border border-[#000000] rounded-[50px] h-[30px] items-center justify-center px-6">
                Logout
              </button>
            </SignOutButton>
          </div>
        </div>

        {selectedInvoice && (
          <div className="fixed top-0 left-0 z-50 bg-black bg-opacity-70 h-full w-full flex items-center justify-center font-poppins">
            <div className="bg-white w-[500px] p-8 rounded-lg relative">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="absolute top-7 right-7 text-gray-500 hover:text-gray-700"
              >
                <img
                  src="https://desafio-3.s3.us-east-1.amazonaws.com/profile-close.svg"
                  alt="Close"
                  className="h-[25px] w-[25px]"
                />
              </button>

              <h2 className="text-2xl font-semibold mb-4">Invoice Details</h2>
              <div className="space-y-4">
                <div className="flex font-bold">Status: <p className="ml-2 font-normal">Shipping</p></div>
                <div className="flex font-bold">
                  ID:<p className="ml-2 font-normal">{selectedInvoice.id}</p>
                </div>
                <div className="flex font-bold">
                  Name:{" "}
                  <p className="ml-2 font-normal">
                    {selectedInvoice.firstName} {selectedInvoice.lastName}
                  </p>
                </div>
                <div className="flex font-bold">
                  Email: <p className="ml-2 font-normal">{selectedInvoice.email}</p>
                </div>
                <div className="flex font-bold">
                  Address:{" "}
                  <p className="ml-2 font-normal">
                    {selectedInvoice.streetAddress}, {selectedInvoice.province},{" "}
                    {selectedInvoice.townCity}
                  </p>
                </div>
                <div className="flex font-bold">
                  Additional Info: <p className="ml-2 font-normal">{selectedInvoice.additionalInfo}</p>
                </div>
                <div className="flex font-bold">
                  Add On Address: <p className="ml-2 font-normal">{selectedInvoice.addOnAddress}</p>
                </div>

                <div>
                  <h3 className="mt-4 font-bold">Cart Items</h3>
                  <ul className="">
                    {selectedInvoice.cartItems.map((item, index) => (
                      <li key={index}>
                        {item.name} - {item.quantity} x{" "}
                        {new Intl.NumberFormat("pt-BR").format(item.price)} = R$
                        {new Intl.NumberFormat("pt-BR").format(
                          item.price * item.quantity
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  Total Price: R$
                  {new Intl.NumberFormat("pt-BR").format(
                    selectedInvoice.totalPrice
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
