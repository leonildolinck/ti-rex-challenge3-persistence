import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import TopBanner from "../components/common/TopBanner";
import BottomBanner from "../components/common/BottomBanner";
import LoginSection from "../components/layout/LoginSection";

const Login: React.FC = () => {
  return (
    <>
      <Header />
      <TopBanner
        title="Login"
        links={[
          { label: "Home", to: "/home" },
          { label: "Login", to: "/login" },
        ]}
      />
      <LoginSection />
      <BottomBanner />
      <Footer />
    </>
  );
};

export default Login;
