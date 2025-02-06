import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeProductFromCart, increaseQuantity, decreaseQuantity } from "../components/cart/actions";


const CartPageItem: React.FC = ({ product }) => {
  const dispatch = useDispatch();

  const handleRemoveClick = () => {
    dispatch(removeProductFromCart(product.id));
  };

  const handleIncreaseClick = () => {
    dispatch(increaseQuantity(product.id));
  }

  const handleDecreaseClick = () => {
    dispatch(decreaseQuantity(product.id));
  } 

  return (
    <div className="flex flex-row text-poppins mt-[55px] mr-[25px] justify-between items-center">
      <div className="flex flex-row items-center gap-4">
        <img
          src={product.image}
          alt=""
          className="h-[105px] w-[105px] rounded-[10px]"
        />
        <p className="">{product.name}</p>
      </div>
      <p className="text-[#9F9F9F]">R$ {product.actual_price}</p>
      <div className="flex items-center border border-[#9F9F9F] rounded-lg font-medium h-[47px]">
      <button onClick={handleDecreaseClick}    
   
        className="px-3 py-1 rounded-l-lg"
      >
        -
      </button>
      <span className="px-4 py-1">{product.quantity}</span>
      <button
        onClick={handleIncreaseClick}
        className="px-3 py-1 rounded-r-lg"
      >
        +
      </button>
    </div>
      <p>R$ {product.actual_price * product.quantity}</p>
      <button onClick={handleRemoveClick}>
        <img
          src="https://desafio-3.s3.us-east-1.amazonaws.com/lixeira.svg"
          alt=""
          className="h-5 w-5"
        />
      </button>
    </div>
  );
};

export default CartPageItem;
