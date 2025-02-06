import React from "react";
// import CartPageItem from "../../store/CartPageItem";
//import { RootState } from "../../redux/store";
// import { useSelector } from "react-redux";
// import { selectProductsTotalPrice } from "../cart/cart.selectors";
// import Button from "../common/Button";
import Form from "../common/Form";
import PlaceOrder from "../common/PlaceOrder";

const CheckoutSection: React.FC = () => {
 // const { products } = useSelector((state: RootState) => state.cart);

  //const productsTotalPrice = useSelector(selectProductsTotalPrice);

  return (
    <div className="flex flex-row">
      <Form />
      <PlaceOrder />
    </div>
  );
};

export default CheckoutSection;
