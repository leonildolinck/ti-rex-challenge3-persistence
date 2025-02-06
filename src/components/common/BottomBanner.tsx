import React from "react";

const BottomBanner: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-[270px] bg-[#FAF3EA] font-poppins items-center justify-center">
      <div className="flex flex-row items-center gap-[55px]">
        <div className="flex flex-row gap-4 items-center">
          <img
            src="https://desafio-3.s3.us-east-1.amazonaws.com/quality-icon.svg"
            alt="Quality Icon"
            className="h-[60px] w-[60px]"
          />
          <div>
            <h1 className="font-semibold text-[#242424] text-[25px]">
              High Quality
            </h1>
            <p className="font-medium text-[#898989] text-[20px]">
              crafted from top materials
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <img
            src="https://desafio-3.s3.us-east-1.amazonaws.com/warranty-icon.svg"
            alt="Warranty Icon"
            className="h-[60px] w-[60px]"
          />
          <div>
            <h1 className="font-semibold text-[#242424] text-[25px]">
              Warranty Protection
            </h1>
            <p className="font-medium text-[#898989] text-[20px]">
              Over 2 years
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <img
            src="https://desafio-3.s3.us-east-1.amazonaws.com/shipping-icon.svg"
            alt="Shipping Icon"
            className="h-[60px] w-[60px]"
          />
          <div>
            <h1 className="font-semibold text-[#242424] text-[25px]">
              Free Shipping
            </h1>
            <p className="font-medium text-[#898989] text-[20px]">
              Order over 150 $
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <img
            src="https://desafio-3.s3.us-east-1.amazonaws.com/support-icon.svg"
            alt="Support Icon"
            className="h-[60px] w-[60px]"
          />
          <div>
            <h1 className="font-semibold text-[#242424] text-[25px]">
              24 / 7 Support
            </h1>
            <p className="font-medium text-[#898989] text-[20px]">
              Dedicated support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
