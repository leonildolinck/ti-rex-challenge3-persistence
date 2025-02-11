import React from "react";
import BrowseSection from "../components/layout/home/BrowseSection";
import InspirationSection from "../components/layout/home/InspirationSection";
import ShareSection from "../components/layout/home/ShareSection";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BannerSection from "../components/layout/home/BannerSection";
import ProductsSection from "../components/layout/home/ProductsSection";

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
