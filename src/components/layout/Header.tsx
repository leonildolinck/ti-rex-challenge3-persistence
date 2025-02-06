import { useState } from "react";
import CartModal from "../../store/CartModal";

import { Link } from "react-router-dom";
import React from "react";
import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../user/actions";
import { selectProductsCount } from "../cart/cart.selectors";

const Header: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { currentUser } = useSelector((state: RootState) => state.user); // Acesse state.user
  
  const dispatch = useDispatch();

  const productsCount = useSelector(selectProductsCount)

  const handleLoginClick = () => {
    dispatch(loginUser({ name: "usuario", email: "user@text.com" }));
  };

  const handleLogoutClick = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="p-7">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-row justify-center items-center gap-1">
          <img
            src="https://desafio-3.s3.us-east-1.amazonaws.com/logo.png"
            alt="Logo Furniro"
            className="lg:h-[32px] lg:w-[50px]"
          />
          <Link
            to="/"
            className="text-xl font-bold font-montserrat lg:text-[34px]"
          >
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
          {currentUser ? (
            <button onClick={handleLogoutClick}>LOGOUT</button>
          ) : (
            <button onClick={handleLoginClick}>LOGIN</button>
          )}
          <Link to="/profile">
            <img
              src="https://desafio-3.s3.us-east-1.amazonaws.com/profile.svg"
              alt=""
            />
          </Link>

          <button onClick={() => setIsCartOpen(true)}>
            <img
              src="https://desafio-3.s3.us-east-1.amazonaws.com/cart.svg"
              alt=""
            />
          </button>
          {(productsCount)}
        </div>
        {<CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
      </div>
    </header>
  );
};

export default Header;
