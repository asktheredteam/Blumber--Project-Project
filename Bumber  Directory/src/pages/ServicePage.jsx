import ServiceHero from "../features/services/components/ServiceHero.jsx";
import Navbar from "../components/shared/Navbar";
import HowItWorksServices from "../features/services/components/HowItWorksServices.jsx";
import Service from "../features/services/components/Service.jsx";
import "../styles/services/ServicesPage.css";
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
