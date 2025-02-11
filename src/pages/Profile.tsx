import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProfileMobileSection from "../components/layout/ProfileMobileSection";



const Profile: React.FC = () => {
  return (
    <>
      <Header />
      <ProfileMobileSection />
      <Footer />
    </>
  );
};

export default Profile;
