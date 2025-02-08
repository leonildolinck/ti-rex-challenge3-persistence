import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import TopBanner from "../components/common/TopBanner";
import BottomBanner from "../components/common/BottomBanner";
import RegisterSection from "../components/layout/RegisterSection";

const Register: React.FC = () => {
  return (
    <>
      <Header />
      <TopBanner
        title="Register"
        links={[
          { label: "Home", to: "/home" },
          { label: "Register", to: "/register" },
        ]}
      />
      <RegisterSection />
      <BottomBanner />
      <Footer />
    </>
  );
};

export default Register;
