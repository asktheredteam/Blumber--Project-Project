import Navbar from "../components/shared/Navbar";
import HeroSection from "../features/home/components/HeroSection.jsx";
import Service from "../features/services/components/Service.jsx";
import BusinessSection from "../features/home/components/BusinessSection.jsx";
import WhyBisajo from "../features/home/components/WhyBisajo.jsx";
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
