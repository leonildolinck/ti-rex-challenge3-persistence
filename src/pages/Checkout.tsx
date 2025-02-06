import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import TopBanner from "../components/common/TopBanner";
import BottomBanner from "../components/common/BottomBanner";
import CheckoutSection from "../components/layout/CheckoutSection";

const Checkout: React.FC = () => {
  return (
    <>
      <Header />
      <TopBanner
        title="Checkout"
        links={[
          { label: "Home", to: "/home" },
          { label: "Shop", to: "/checkout" },
        ]}
      />
      <CheckoutSection />
      <BottomBanner />
      <Footer />
    </>
  );
};

export default Checkout;
