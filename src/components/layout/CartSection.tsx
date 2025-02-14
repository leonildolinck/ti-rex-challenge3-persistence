import React from "react";
import CartPageItem from "../ui/CartPageItem";
import Button from "../common/Button";
import { Link } from "react-router-dom";

import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectProductsTotalPrice } from "../cart/cart.selectors";


const CartSection: React.FC = () => {
  const { products } = useSelector((state: RootState) => state.cart);

  const productsTotalPrice = useSelector(selectProductsTotalPrice);

  return (
    <div className="flex flex-col lg:flex-row justify-center px-4 sm:px-0 md:px-0 lg:px-[100px] sm:py-0 md:py-[0px] lg:py-[70px] gap-[20px] sm:gap-[30px] md:gap-[30px] lg:gap-[30px] font-poppins">
      <div className="flex flex-col lg:w-[817px] sm:w-full h-auto lg:h-auto sm:h-auto">
        <div className="flex flex-row bg-[#F9F1E7] font-medium lg:p-4 sm:p-4 justify-between">
          <h1 className="md:ml-[32px] sm:ml-2 lg:ml-[132px]">Product</h1>
          <h1>Price</h1>
          <h1>Quantity</h1>
          <h1 className="md:mr-[32px] sm:mr-2 lg:mr-[132px]">Subtotal</h1>
        </div>
        <div className="flex flex-col justify-center">
          {products.map((product) => (
            <CartPageItem key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="_div.cart flex flex-col pb-10 lg:pb-20 bg-[#F9F1E7] lg:w-[390px] sm:w-full md:w-full lg:h-[390px] sm:h-auto md:h-auto justify-between items-center sm:gap-4 sm:py-10 md:py-10">
        <div>
          <h1 className="sm:hidden mt-4 font-semibold text-[28px] sm:text-[24px] md:text-[28px] lg:text-[32px]">Cart Totals</h1>
        </div>
        <div className="flex w-full justify-between">
          <p className="ml-10 sm:ml-10 md:ml-10 lg:ml-20 font-medium">Subtotal</p>
          <p className="mr-10 sm:mr-10 md:mr-10 lg:mr-20 text-[#9F9F9F]">R$ {new Intl.NumberFormat("pt-BR").format(productsTotalPrice)}</p>
        </div>
        <div className="flex w-full justify-between">
          <p className=" md:ml-10 sm:ml-10 lg:ml-20 font-medium">Total</p>
          <p className="sm:mr-10 md:mr-10 lg:mr-20 text-[20px] sm:mb-10 text-[#B88E2F]">
            R$ {new Intl.NumberFormat("pt-BR").format(productsTotalPrice)}
          </p>
        </div>
        <Link to="/checkout">
              {" "}
        <Button label="Check Out" type="button" kind="outlineblack" size="sm" />
        </Link>
      </div>
    </div>
  );
};

export default CartSection;
