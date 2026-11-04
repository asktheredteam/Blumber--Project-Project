import React from "react";
import Navbar from "../components/shared/Navbar";
import AboutHeroSection from "../features/about/components/AboutHeroSection.jsx";
import PlatformInfo from "../features/about/components/PlatformInfo.jsx";
import PropertyCategories from "../features/about/components/PropertyCategories.jsx";
import HowItWorks from "../features/about/components/HowItWorks.jsx";
import MissionVision from "../features/about/components/MissionVision.jsx";
import WhyChooseUs from "../features/about/components/WhyChooseUs.jsx";
import CTABanner from "../features/about/components/CTABanner.jsx";
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
