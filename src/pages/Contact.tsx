import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import TopBanner from "../components/common/TopBanner";
import BottomBanner from "../components/common/BottomBanner";
import ContactSection from "../components/layout/ContactSection";

const Contact: React.FC = () => {
  return (
    <>
      <Header />
      <TopBanner
        title="Contact"
        links={[
          { label: "Home", to: "/home" },
          { label: "Contact", to: "/contact" },
        ]}
      />
      <ContactSection />
      <BottomBanner />
      <Footer />
    </>
  );
};

export default Contact;
