import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Insert a valid e-mail.");
      return;
    }

    setError("");
    console.log("emailsent ", email);
    setSubscribed(true);
  };

  return (
    <footer className="p-8 sm:p-1 md:p-4 lg:p-20 font-poppins">
      <hr className=" sm:p-4 sm:border-t sm:border-[#D9D9D9] lg:hidden" />
      <div className="flex flex-col md:flex-col-reverse sm:flex-col-reverse lg:flex-row justify-between gap-8 md:gap-10 mb-10">        
        <div className="flex flex-col sm:items-center lg:items-start">
          <p className="text-[24px] font-bold">Furniro.</p>
          <p className="text-[#9F9F9F] sm:mt-2 lg:mt-10">
            400 University Drive Suite 200 Coral
          </p>
          <p className="text-[#9F9F9F]">Gables,</p>
          <p className="text-[#9F9F9F]">FL 33134 USA</p>
          <div className="flex flex-row gap-4 lg:mt-[55px] mb-20 sm:mb-2 sm:mt-2">
            <a
              href="https://www.facebook.com"
              className="flex h-[34px] w-[34px] rounded-full items-center justify-center shadow-lg"
            >
              <img
                src="https://desafio-3.s3.us-east-1.amazonaws.com/facebook-logo.svg"
                alt=""
              />
            </a>
            <a
              href="https://www.instagram.com"
              className="flex h-[34px] w-[34px] rounded-full items-center justify-center shadow-xl"
            >
              <img
                src="https://desafio-3.s3.us-east-1.amazonaws.com/instagram-logo.svg"
                alt=""
              />
            </a>
            <a
              href="https://www.twitter.com"
              className="flex h-[34px] w-[34px] rounded-full items-center justify-center shadow-xl"
            >
              <img
                src="https://desafio-3.s3.us-east-1.amazonaws.com/twitter-logo.svg"
                alt=""
              />
            </a>
            <a
              href="https://www.linkedin.com"
              className="flex h-[34px] w-[34px] rounded-full items-center justify-center shadow-xl"
            >
              <img
                src="https://desafio-3.s3.us-east-1.amazonaws.com/linkedin-logo.svg"
                alt=""
              />
            </a>
          </div>
        </div>
        <div className="sm:flex sm:flex-row sm:justify-center sm:gap-[50px] md:gap-20 sm:items-start">
          <div className="flex flex-col md:w-1/3">
            <nav>
              <p className="text-[#9F9F9F]">Links</p>
              <ul className="flex flex-col gap-6 lg:mt-6 sm:mt-2 md:gap-12 lg:gap-12">
                <li>
                  <Link to="/home" className="hover:text-gray-400 font-poppins font-medium">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/shop" className="hover:text-gray-400 font-poppins font-medium">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-gray-400 font-poppins font-medium"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-gray-400 font-poppins font-medium"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex flex-col gap-6 lg:mt-0 sm:mt-0 md:gap-12 lg:gap-12">
            <span className="text-[#9F9F9F]">Help</span>
            <a href="#" className="font-medium text-nowrap"> Payment Options</a>
            <a href="#" className="font-medium"> Returns</a>
            <a href="#" className="font-medium"> Privacy Policies</a>
          </div>
        </div>
        <div>
          {subscribed ? (
            <p className="text-[#9F9F9F] text-lg font-medium text-center">
              Thanks for subscribing!
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 sm:items-center md:items-center">
                <input
                  type="email"
                  placeholder="   Enter Your Email Address"
                  className={`border-b w-[200px] text-[14px] border-black ${
                    error ? "border-red-500" : ""
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && (
                <p className="text-red-500 text-[12px] mt-1">{error}</p>
              )}
                <button
                  className="font-medium border-b border-black text-[14px] hover:bg-gray-100 mt-2 md:mt-0 sm:w-20"
                  onClick={handleSubscribe}
                >
                  Subscribe
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <hr className="my-8 p-4 sm:my-2 sm:p-2 border-t border-[#D9D9D9]" />

      <div className="text-center sm:mb-8 lg:mb-0">
        <p>&copy; 2023 furniro. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
