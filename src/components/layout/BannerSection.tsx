import React from "react";
import Button from "../common/Button";

const BannerSection: React.FC = () => {
  return (
    <section className="h-[612px] overflow-hidden relative font-poppins">
      <img
        src="https://desafio-3.s3.us-east-1.amazonaws.com/banner.jpeg"
        alt=""
        className="w-full h-full object-cover"
      />
      <div className="absolute top-20 right-[53px] transform bg-[#FFF3E3] w-[643px] h-[443px] z-10 p-10">
        <h1 className="font-semibold">New Arrival</h1>
        <p className="text-[52px] font-bold text-[#B88E2F]">Discover Our</p>
        <p className="text-[52px] font-bold text-[#B88E2F]">New Collection</p>
        <p className="text-[18px] text-[#333333] mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis.
        </p>

        <Button label="BUY NOW" type="button" kind="primary" size="lg" />
      </div>
    </section>
  );
};

export default BannerSection;
