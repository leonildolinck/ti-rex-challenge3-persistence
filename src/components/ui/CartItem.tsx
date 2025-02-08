import React from "react";
import { useDispatch } from "react-redux";
import { removeProductFromCart } from "../cart/slice";

interface Product {
  id: string;
  name: string;
  image: string;
  quantity: number;
  actual_price: number;
}

interface CartItemProps {
  product: Product;
}

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleRemoveClick = () => {
    dispatch(removeProductFromCart(product.id));
  };

  return (
    <div className="flex flex-row text-poppins ml-6 mt-6 mr-10 justify-between items-center">
      <img
        src={product.image}
        alt=""
        className="h-[110px] w-[110px] rounded-[10px]"
      />
      <div className="flex flex-col ml-4 w-1/2 gap-4">
        <p className="">{product.name}</p>
        <p>{product.quantity}</p>
        <p className="text-[12px] text-[#B88E2F]">R$ {product.actual_price}</p>
      </div>
      <button onClick={handleRemoveClick}>
        <img
          src="https://desafio-3.s3.us-east-1.amazonaws.com/excluir-item.svg"
          alt=""
          className="h-5 w-5"
        />
      </button>
    </div>
  );
};

export default CartItem;
