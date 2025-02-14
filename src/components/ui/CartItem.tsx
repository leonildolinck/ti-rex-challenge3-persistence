import React from "react";
import { useDispatch } from "react-redux";
import { removeProductFromCart, increaseQuantity, decreaseQuantity } from "../cart/slice";

interface Product {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface CartItemProps {
  product: Product;
}

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleRemoveClick = () => {
    dispatch(removeProductFromCart(product.id));
  };

  const handleIncreaseClick = () => {
    dispatch(increaseQuantity(product.id));
  };

  const handleDecreaseClick = () => {
    if (product.quantity > 1) {
      dispatch(decreaseQuantity(product.id));
    }
  };

  return (
    <div className="flex flex-row text-poppins ml-6 mt-6 mr-10 justify-between items-center">
      <img
        src={product.image[0]}
        alt={product.name}
        className="h-[110px] w-[110px] rounded-[10px]"
      />
      <div className="flex flex-col ml-4 w-1/2 gap-4">
        <p>{product.name}</p>
        <div className="flex items-center gap-2">
          <button onClick={handleDecreaseClick}>-</button>
          <p>{product.quantity}</p>
          <button onClick={handleIncreaseClick}>+</button>
        </div>
        <p className="text-[12px] text-[#B88E2F]">
          R$ {new Intl.NumberFormat("pt-BR").format(product.price * product.quantity)}
        </p>
      </div>
      <button onClick={handleRemoveClick}>
        <img
          src="https://desafio-3.s3.us-east-1.amazonaws.com/excluir-item.svg"
          alt="Remover item"
          className="h-5 w-5"
        />
      </button>
    </div>
  );
};

export default CartItem;
