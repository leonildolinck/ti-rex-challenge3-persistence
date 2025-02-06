import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import TopBanner from "../components/common/TopBanner";
import BottomBanner from "../components/common/BottomBanner";
import ShopSection from "../components/layout/ShopSection";

const Shop: React.FC = () => {
  return (
    <>
      <Header />
      <TopBanner
        title="Shop"
        links={[
          { label: "Home", to: "/home" },
          { label: "Shop", to: "/shop" },
        ]}
      />
      <ShopSection />
      <BottomBanner />
      <Footer />
    </>
  );
};

export default Shop;
