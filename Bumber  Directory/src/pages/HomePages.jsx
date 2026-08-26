import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Service from "../components/Service";

function HomePage() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <Navbar></Navbar>
        <HeroSection></HeroSection>
        <Service></Service>
      </div>
    </>
  );
}
export default HomePage;
