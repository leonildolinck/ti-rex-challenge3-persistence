import React from "react";
import { useDispatch } from "react-redux";
import { removeProductFromCart, increaseQuantity, decreaseQuantity } from "../cart/slice";

interface Product {
  id: string;
  name: string;
  image: string;
  actual_price: number;
  quantity: number;
}

interface CartPageItemProps {
  product: Product;
}

const CartPageItem: React.FC<CartPageItemProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleRemoveClick = () => {
    dispatch(removeProductFromCart(product.id));
  };

  const handleIncreaseClick = () => {
    dispatch(increaseQuantity(product.id));
  };

  const handleDecreaseClick = () => {
    dispatch(decreaseQuantity(product.id));
  };

  return (
    <div className="flex flex-col sm:flex-row lg:flex-row text-poppins md:mt-[35px] sm:mt-[45px] lg:mt-[55px] mr-[15px] sm:ml-2 sm:mr-2 lg:mr-[25px] justify-between items-center sm:gap-4 lg:gap-4">
      <div className="sm:flex lg:flex lg:flex-col sm:flex-col lg:gap-4 sm:gap-2 lg:items-center sm:w-full lg:w-auto">
        <img
          src={product.image}
          alt=""
          className="h-[85px] sm:h-[105px] lg:h-[105px] w-[85px] sm:w-[105px] lg:w-[105px] rounded-[10px] object-cover"
        />
        <p className="sm:text-[12px] lg:text-[16px]">{product.name}</p>
      </div>

      <p className="text-[#9F9F9F] sm:text-[14px] lg:text-[16px]">{new Intl.NumberFormat("pt-BR").format(product.actual_price)}</p>

      <div className="flex items-center border border-[#9F9F9F] rounded-lg font-medium md:h-[35px] sm:h-[27px] lg:h-[47px] sm:px-2 lg:px-3">
        <button onClick={handleDecreaseClick} className="lg:px-3 lg:py-1 rounded-l-lg text-sm sm:text-[10px] lg:text-lg">
          -
        </button>
        <span className="lg:px-4 py-1 text-sm sm:text-[10px] lg:text-lg">{product.quantity}</span>
        <button onClick={handleIncreaseClick} className="lg:px-3 lg:py-1 rounded-r-lg text-sm sm:text-[10px]] lg:text-lg">
          +
        </button>
      </div>

      <p className="sm:text-[14px] lg:text-[16px]">{new Intl.NumberFormat("pt-BR").format(product.actual_price * product.quantity)}</p>

      <button onClick={handleRemoveClick} className="mt-2 sm:mt-0 lg:mt-0">
        <img
          src="https://desafio-3.s3.us-east-1.amazonaws.com/lixeira.svg"
          alt="Remove"
          className="h-5 w-5 sm:h-6 sm:w-6 lg:h-6 lg:w-6"
        />
      </button>
    </div>
  );
};

export default CartPageItem;
