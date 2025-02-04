import React from "react";
import BannerSection from "../components/layout/BannerSection";
import BrowseSection from "../components/layout/BrowseSection";
import InspirationSection from "../components/layout/InspirationSection";
import ShareSection from "../components/layout/ShareSection";
import ProductsSection from "../components/layout/ProductsSection";

const Home: React.FC = () => {
  return (
    <>
      <BannerSection />
      <BrowseSection />
      <ProductsSection />
      <InspirationSection />
      <ShareSection />
    </>
  );
};

export default Home;
