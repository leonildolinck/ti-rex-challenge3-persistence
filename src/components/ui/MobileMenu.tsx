import React from "react";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <nav className="lg:hidden absolute top-14 sm:w-full bg-white p-12 z-50">
      <ul className="flex flex-col items-center space-y-4">
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

        <li>
          <Link to="/profile" className="flex items-center gap-2">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/cart" className="flex items-center gap-2">
            Cart
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileMenu;
