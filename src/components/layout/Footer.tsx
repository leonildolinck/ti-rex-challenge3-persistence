import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="p-20 font-poppins">
      <div className="flex flex-row justify-between gap-20">
        <div>
          <p className="text-[24px] font-bold">Furniro.</p>
          <p className="text-[#9F9F9F] mt-12">
            400 University Drive Suite 200 Coral
          </p>
          <p className="text-[#9F9F9F]">Gables,</p>
          <p className="text-[#9F9F9F]">FL 33134 USA</p>
          <div className="flex flex-row gap-4 mr-[40px] mt-[55px] mb-20">
            <a
              href="https://www.instagram.com"
              className=" flex h-[34px] w-[34px] rounded-full items-center justify-center shadow-lg"
            >
              <img
                src="https://desafio-3.s3.us-east-1.amazonaws.com/facebook-logo.svg"
                alt=""
              />
            </a>
            <a
              href="https://www.instagram.com"
              className=" flex h-[34px] w-[34px] rounded-full items-center justify-center shadow-xl"
            >
              <img
                src="https://desafio-3.s3.us-east-1.amazonaws.com/instagram-logo.svg"
                alt=""
              />
            </a>
            <a
              href="https://www.instagram.com"
              className=" flex h-[34px] w-[34px] rounded-full items-center justify-center shadow-xl"
            >
              <img
                src="https://desafio-3.s3.us-east-1.amazonaws.com/twitter-logo.svg"
                alt=""
              />
            </a>
            <a
              href="https://www.instagram.com"
              className=" flex h-[34px] w-[34px] rounded-full items-center justify-center shadow-xl"
            >
              <img
                src="https://desafio-3.s3.us-east-1.amazonaws.com/linkedin-logo.svg"
                alt=""
              />
            </a>
          </div>
        </div>
        <div>
          <nav>
            <p className="text-[#9F9F9F]">Links</p>
            <ul className="flex flex-col gap-12 mt-12">
              <li>
                <Link to="/home" className="hover:text-gray-400 font-poppins">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-gray-400 font-poppins">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-400 font-poppins">
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-gray-400 font-poppins"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col gap-12">
          <p className="text-[#9F9F9F]">Help</p>
          <a href="#"> Payment Options</a>
          <a href="#"> Returns</a>
          <a href="#"> Privacy Policies</a>
        </div>
        <div>
          <p className="text-[#9F9F9F] mb-12">Newsletter</p>
          <input
            type="email"
            placeholder="Enter Your Email Addresss"
            className="border-b w-[200px] mr-2 text-[14px] border-black"
          />
          <button className="font-medium border-b border-black text-[14px]">
            Subscribe
          </button>
        </div>
      </div>

      <hr className="my-8 p-4 border-t border-[#D9D9D9]" />

      <div className="">
        <p>&copy; 2023 furniro. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
