import React from "react";
import BannerSection from "../components/layout/BannerSection";
import BrowseSection from "../components/layout/BrowseSection";
import InspirationSection from "../components/layout/InspirationSection";
import ShareSection from "../components/layout/ShareSection";
import ProductsSection from "../components/layout/ProductsSection";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <BannerSection />
      <BrowseSection />
      <ProductsSection />
      <InspirationSection />
      <ShareSection />
      <Footer />
    </>
  );
};

export default Home;
