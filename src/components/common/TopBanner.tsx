import React from "react";
import { Link } from "react-router-dom";

interface TopBannerProps {
  title: string;
  links: {
    label: string;
    to: string;
  }[];
}

const TopBanner: React.FC<TopBannerProps> = ({ title, links }) => {
  return (
    <section className="relative w-full h-auto">
      <img
        src="https://desafio-3.s3.us-east-1.amazonaws.com/banner-blur.png"
        alt="Top Banner"
        className="w-full lg:h-[316px] md:h-[200px] sm:h-[120px] object-cover"
      />
      <div className="absolute top-0 left-0 flex flex-col w-full h-full items-center justify-center text-center lg:gap-4 md:gap-3 sm:gap-2">
        <img
          src="https://desafio-3.s3.us-east-1.amazonaws.com/logo.png"
          alt="Logo"
          className="lg:w-[77px] md:w-[37px] sm:w-[27px] h-auto"
        />
        <h1 className="font-poppins text-black lg:text-[48px] md:text-[28px] sm:text-[14px] font-medium">
          {title}
        </h1>
        <div className="flex flex-row gap-4 items-center justify-center">
          {links.map((link, index) => (
            <React.Fragment key={index}>
              <Link
                to={link.to}
                className="hover:text-gray-400 text-black font-poppins lg:text-[16px] md:text-[10px] sm:text-[10px]"
              >
                {link.label}
              </Link>
              {index < links.length - 1 && (
                <img
                  src="https://desafio-3.s3.us-east-1.amazonaws.com/maior.svg"
                  alt="separator"
                  className="lg:w-[8px] md:w-[4px] sm:w-[5px] h-auto"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopBanner;
