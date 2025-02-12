import React from "react";
import Button from "../../common/Button";


const BannerSection: React.FC = () => {
  return (
    <section className="lg:h-[612px] sm:h-full overflow-hidden relative font-poppins">
      <img
        src="https://desafio-3.s3.us-east-1.amazonaws.com/banner.jpeg"
        alt=""
        className="sm:hidden lg:flex w-full h-full object-cover"
      />
      <div className="lg:absolute sm:relative lg:top-20 sm:top-0 lg:right-[53px] sm:right-[0px] transform bg-[#FFF3E3] lg:w-[643px] sm:w-full lg:h-[443px] sm:h-[420px] z-10 lg:p-10 sm:p-2 sm:flex sm:flex-col lg:blocked sm:items-center lg:items-start">
        <h1 className="sm:hidden lg:flex font-semibold">New Arrival</h1>
        <p className="lg:text-[52px] sm:text-[20px] lg:text-left sm:text-center font-bold text-[#B88E2F] lg:mt-0 sm:mt-6">Discover Our</p>
        <p className="text-[52px] font-bold text-[#B88E2F] lg:text-left sm:text-center">New Collection</p>
        <p className="lg:text-[18px] sm:text-[12px] text-[#333333] lg:mb-10 sm:mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis.
        </p>

        <div className="sm:flex lg:blocked sm:max-w-[230px] ">
          <Button label="BUY NOW" type="button" kind="primary" size="lg" /></div>
      </div>
    </section>
  );
};

export default BannerSection;
