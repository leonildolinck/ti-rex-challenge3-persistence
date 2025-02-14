import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="flex justify-center items-center h-full z-10">
        <img
          className="h-16 w-16"
          src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
          alt=""
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
