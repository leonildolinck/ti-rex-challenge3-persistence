import React from "react";
import CartPageItem from "../../store/CartPageItem";
import { useSelector } from "react-redux";
import { selectProductsTotalPrice } from "../cart/cart.selectors";
import Button from "../common/Button";

const CartSection: React.FC = () => {
  const { products } = useSelector((rootReducer) => rootReducer.cartReducer);

  const productsTotalPrice = useSelector(selectProductsTotalPrice);

  return (
    <div className="flex flex-row justify-center px-[100px] py-[70px] gap-[30px] font-poppins">
      <div className="flex flex-col w-[817px] h-[215px] ">
        <div className="flex flex-colbg-[#F9F1E7] font-medium p-4 bg-[#F9F1E7] justify-between">
          <h1 className="ml-[132px]">Product</h1>
          <h1>Price</h1>
          <h1>Quantity</h1>
          <h1 className="mr-[132px]">Subtotal</h1>
        </div>
        <div className="">
          {products.map((product) => (
            <CartPageItem product={product} />
          ))}
        </div>
      </div>
      <div className="flex flex-col pb-20 bg-[#F9F1E7] w-[390px] h-[390px] justify-between items-center">
        <div>
          <h1 className="mt-4 font-semibold text-[32px]">Cart Totals</h1>
        </div>
        <div className="flex w-full justify-between">
          <p className="ml-20 font-medium">Subtotal</p> 
          <p className="mr-20 text-[#9F9F9F]">R$ {productsTotalPrice}</p>
        </div>
        <div className="flex w-full justify-between">
          <p className="ml-20 font-medium">Total</p> 
          <p className="mr-20 text-[20px] text-[#B88E2F]">R$ {productsTotalPrice}</p>
        </div>
        <Button label="Check Out" type="button" kind="outlineblack" size="sm" />
      </div>
    </div>
  );
};

export default CartSection;
