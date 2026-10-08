import React from "react";
import Navbar from "../components/shared/Navbar";
import AboutHeroSection from "../components/about/AboutHeroSection";
import PlatformInfo from "../components/about/PlatformInfo";
import PropertyCategories from "../components/about/PropertyCategories";
import HowItWorks from "../components/about/HowItWorks";
import MissionVision from "../components/about/MissionVision";
import WhyChooseUs from "../components/about/WhyChooseUs";
import CTABanner from "../components/about/CTABanner";
import Footer from "../components/shared/Footer";
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
