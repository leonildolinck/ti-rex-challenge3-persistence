import React from "react";
import { useSelector } from "react-redux";
//import rootReducer from "../redux/root-reducer";
import CardItem from "./CartItem";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import { selectProductsTotalPrice } from "../components/cart/cart.selectors";

// import { RootState } from "../redux/store";
// import { removeItem, clearCart } from "../store/cartSlice";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  //   const cartItems = useSelector((state: RootState) => state.cart.items);
  //   const dispatch = useDispatch();
  const { products } = useSelector((rootReducer) => rootReducer.cartReducer);

  const productsTotalPrice = useSelector(selectProductsTotalPrice)



  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 z-50 bg-black bg-opacity-50 h-full w-full font-poppins">
      <div className="absolute flex flex-col right-0 top-0 bg-white w-[417px] min-h-[746px]">
  <div>
    <button
      onClick={onClose}
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-8"
    >
      <img
        src="https://desafio-3.s3.us-east-1.amazonaws.com/close.svg"
        alt=""
      />
    </button>
    <h2 className="text-2xl font-semibold mb-4 p-8">Shopping Cart</h2>
    <hr className="ml-8 mr-20 border-t border-[#D9D9D9]" />
  </div>

  <div className="flex-1 overflow-auto">
    {products.map((product) => (
      <CardItem product={product} />
    ))}
  </div>

  <div className="flex items-center justify-between px-8 py-4">
    <span className="font-poppins">Subtotal</span>
    <span className="font-semibold text-[#B88E2F] mr-20">
      R$ {productsTotalPrice}
    </span>
  </div>

  <div className="flex flex-row min-h-[84px] items-center justify-center border-t border-[#D9D9D9]">
    <div className="flex flex-row text-[12px] gap-4">
      <Link to="/cart"><Button label="Cart" type="button" kind="modal" /></Link>      
      <Button label="Checkout" type="button" kind="modal" />
      <Button label="Comparison" type="button" kind="modal" />
    </div>
  </div>
</div>

    </div>
  );
};

export default CartModal;
