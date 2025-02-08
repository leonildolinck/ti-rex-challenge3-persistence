import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import NotFoundSection from "../components/layout/NotFoundSection";


const NotFound: React.FC = () => {
  return (
    <>
      <Header />
      <NotFoundSection />
      <Footer />
    </>
  );
};

export default NotFound;
