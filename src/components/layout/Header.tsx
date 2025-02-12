import { useState } from "react";
import CartModal from "../ui/CartModal";
import { Link } from "react-router-dom";
import React from "react";
import { useUser } from "@clerk/clerk-react";
import ProfileModal from "../ui/ProfileModal";
import MobileMenu from "../ui/MobileMenu";

const Header: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { isSignedIn } = useUser();

  return (
    <header className="p-7">
      <div className="container mx-auto flex justify-between items-center relative">
        <div className="flex flex-row justify-center items-center gap-1">
          <Link
            to="/"
            className="text-xl font-bold font-montserrat lg:text-[34px]"
          >
            <img
              src="https://desafio-3.s3.us-east-1.amazonaws.com/logo.png"
              alt="Logo Furniro"
              className="lg:h-[32px] lg:w-[50px]"
            />
          </Link>
          <Link
            to="/"
            className="text-xl font-bold font-montserrat lg:text-[34px]"
          >
            Furniro
          </Link>
        </div>
        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <img
              src={
                isMobileMenuOpen
                  ? "https://desafio-3.s3.us-east-1.amazonaws.com/close-icon.svg"
                  : "https://desafio-3.s3.us-east-1.amazonaws.com/hamburger-icon.svg"
              }
              alt="Menu"
              className="w-8 h-8"
            />
          </button>
        </div>

        <nav className="hidden lg:flex">
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
              <Link to="#" className="hover:text-gray-400 font-poppins">
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

        <div className="hidden lg:flex flex-row gap-8 mr-[40px] items-center justify-center">
          {!isSignedIn ? (
            <Link to="/login">
              <button>
                <img
                  src="https://desafio-3.s3.us-east-1.amazonaws.com/profile.svg"
                  alt="Profile"
                />
              </button>
            </Link>
          ) : (
            <button onClick={() => setIsProfileOpen(true)}>
              <img
                src="https://desafio-3.s3.us-east-1.amazonaws.com/profile.svg"
                alt="Profile"
              />
            </button>
          )}

          <div>
            <button onClick={() => setIsCartOpen(true)}>
              <img
                src="https://desafio-3.s3.us-east-1.amazonaws.com/cart.svg"
                alt="Cart"
              />
            </button>
          </div>
        </div>

        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />

        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>
    </header>
  );
};

export default Header;
