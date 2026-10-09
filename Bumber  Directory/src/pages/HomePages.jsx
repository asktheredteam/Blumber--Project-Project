import Navbar from "../components/shared/Navbar";
import HeroSection from "../components/HeroSection";
import Service from "../components/home/Service";
import BusinessSection from "../components/BussinnessSection";
import WhyBisajo from "../components/WhyBisajo";
import { useState } from "react";
import SignUp from "./SignUp";
import Footer from "../components/shared/Footer";

function HomePage() {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <>
      <Navbar onSignUpClick={() => setShowSignUp(true)} />
      <HeroSection />
      <Service />
      <WhyBisajo />
      <BusinessSection />
      <Footer></Footer>
      {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}
    </>
  );
}

export default HomePage;
