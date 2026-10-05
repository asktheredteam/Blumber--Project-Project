import React from "react";
import Navbar from "../components/Navbar";
import AboutHeroSection from "../components/AboutHeroSection";
import PlatformInfo from "../components/PlatformInfo";
import PropertyCategories from "../components/PropertyCategories";
import HowItWorks from "../components/Howitworks";
import MissionVision from "../components/MissionVision";
import WhyChooseUs from "../components/WhyChooseUs";
import CTABanner from "../components/CTABanner";
import Footer from "../components/Footer";
import { useState } from "react";
import SignUp from "./SignUp";

function AboutPage() {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <div className="about-page">
      <Navbar onSignUpClick={() => setShowSignUp(true)} />
      <AboutHeroSection />
      <PlatformInfo />
      <PropertyCategories />
      <HowItWorks />
      <MissionVision />
      <WhyChooseUs />
      <CTABanner />
      {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}
      <Footer />
    </div>
  );
}

export default AboutPage;
