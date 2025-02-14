import React from "react";

const BottomBanner: React.FC = () => {
  return (
    <div role="banner" className="sm:hidden md:hidden lg:flex flex flex-col w-full lg:h-[270px] md:h-[160px] bg-[#FAF3EA] font-poppins lg:items-center lg:justify-center md:items-center md:justify-center">
      <div className="flex flex-row items-center gap-[55px]">
        <div className="flex flex-row gap-4 items-center">
          <img
            src="https://desafio-3.s3.us-east-1.amazonaws.com/quality-icon.svg"
            alt="Quality Icon"
            className="lg:h-[60px] lg:w-[60px] md:h-[30px] md:w-[30px]"
          />
          <div>
            <h1 className="font-semibold text-[#242424] lg:text-[25px] md:text-[16px]">
              High Quality
            </h1>
            <p className="font-medium text-[#898989] lg:text-[20px] md:text-[10px]">
              crafted from top materials
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <img
            src="https://desafio-3.s3.us-east-1.amazonaws.com/warranty-icon.svg"
            alt="Warranty Icon"
            className="lg:h-[60px] lg:w-[60px] md:h-[30px] md:w-[30px]"
          />
          <div>
            <h1 className="font-semibold text-[#242424] lg:text-[25px] md:text-[16px]">
              Warranty Protection
            </h1>
            <p className="font-medium text-[#898989] lg:text-[20px] md:text-[10px]">
              Over 2 years
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <img
            src="https://desafio-3.s3.us-east-1.amazonaws.com/shipping-icon.svg"
            alt="Shipping Icon"
            className="lg:h-[60px] lg:w-[60px] md:h-[30px] md:w-[30px]"
          />
          <div>
            <h1 className="font-semibold text-[#242424] lg:text-[25px] md:text-[16px]">
              Free Shipping
            </h1>
            <p className="font-medium text-[#898989] lg:text-[20px] md:text-[10px]">
              Order over 150 $
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <img
            src="https://desafio-3.s3.us-east-1.amazonaws.com/support-icon.svg"
            alt="Support Icon"
            className="lg:h-[60px] lg:w-[60px] md:h-[30px] md:w-[30px]"
          />
          <div>
            <h1 className="font-semibold text-[#242424] lg:text-[25px] md:text-[16px]">
              24 / 7 Support
            </h1>
            <p className="font-medium text-[#898989] lg:text-[20px] md:text-[10px]">
              Dedicated support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
