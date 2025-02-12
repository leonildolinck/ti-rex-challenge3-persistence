import React from "react";

interface ThankYouOverlayProps {
  onClose: () => void;
}

const ThankYouOverlay: React.FC<ThankYouOverlayProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 font-poppins">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-md">
        <h2 className="text-2xl font-bold text-center text-black mb-4">
          Thank You!
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Your message has been successfully sent. We will get back to you as
          soon as possible.
        </p>
        <button
          className="bg-white text-black px-6 py-3 border w-full font-medium items-center"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ThankYouOverlay;
