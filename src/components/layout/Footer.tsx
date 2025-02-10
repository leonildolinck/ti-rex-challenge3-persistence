import React from "react";
import { useState } from "react";
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
    console.log("emailenviado ", email);
    setSubscribed(true);
  };

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
          {subscribed ? (
            <p className="text-[#9F9F9F] text-lg font-medium">
              Thanks for subscribing!
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter Your Email Address"
                  className={`border-b w-[200px] text-[14px] border-black ${
                    error ? "border-red-500" : ""
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="font-medium border-b border-black text-[14px] hover:bg-gray-100"
                  onClick={handleSubscribe}
                >
                  Subscribe
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-[12px] mt-1">{error}</p>
              )}
            </div>
          )}
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
