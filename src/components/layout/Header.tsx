import { Link } from "react-router-dom";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="p-7">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-row justify-center items-center gap-1">
          <img
            src="https://desafio-3.s3.us-east-1.amazonaws.com/logo.png"
            alt="Logo Furniro"
            className="lg:h-[32px] lg:w-[50px]"
          />
          <Link to="/" className="text-xl font-bold font-montserrat lg:text-[34px]">
            Furniro
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-20">
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
              <Link to="/contact" className="hover:text-gray-400 font-poppins">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex flex-row gap-8 mr-[40px]">
          <Link to="/profile">
            <img
              src="https://desafio-3.s3.us-east-1.amazonaws.com/profile.svg"
              alt=""
            />
          </Link>

          <Link
            to="/cart">
            <img
              src="https://desafio-3.s3.us-east-1.amazonaws.com/cart.svg"
              alt=""
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
