import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import TopBanner from "../components/common/TopBanner";
import BottomBanner from "../components/common/BottomBanner";
import CartSection from "../components/layout/CartSection";

const Cart: React.FC = () => {
  return (
    <>
      <Header />
      <TopBanner
        title="Cart"
        links={[
          { label: "Home", to: "/home" },
          { label: "Cart", to: "/cart" },
        ]}
      />
      <CartSection />
      <BottomBanner />
      <Footer />
    </>
  );
};

export default Cart;
