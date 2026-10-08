import ServiceHero from "../components/ServiceHero";
import Navbar from "../components/shared/Navbar";
import HowItWorksServices from "../components/HowItWorksServices";
import Service from "../components/home/Service";
import "../styles/ServicesPage.css";
function ServicePage() {
  return (
    <>
      <Navbar></Navbar>
      <ServiceHero></ServiceHero>
      <Service></Service>
      <HowItWorksServices></HowItWorksServices>
    </>
  );
}
export default ServicePage;
