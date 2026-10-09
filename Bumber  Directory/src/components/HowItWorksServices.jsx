import "../styles/ServicesPage.css";
import { FaArrowRight } from "react-icons/fa";

function HowItWorkServices() {
  const howItworks = [
    {
      Step: "01",
      Title: "Choose",
      How: "Select the services that matches what you need and want",
    },
    {
      Step: "02",
      Title: "Discover",
      How: "Explore available options around your destination",
    },
    {
      Step: "03",
      Title: "Connect",
      How: "Book,visit,contact or use the Services",
    },
  ];
  return (
    <>
      <div className="howItWorks">
        <h3>HOW OUR SERVICES WORK.</h3>

        <h1>FROM NEED TO SOLUTION IN A FEW STEPS</h1>

        <div className="howItWorksContainer">
          {howItworks.map((howItwork, index) => (
            <div className="howItWorksCard" key={index}>
              <div className="stepNumber">{howItwork.Step}</div>

              <h4>{howItwork.Title}</h4>

              <p>{howItwork.How}</p>
            </div>
          ))}
        </div>
      </div>
      <section className="discoverSection">
        {/* LEFT SIDE */}
        <div className="discoverContent">
          <h3>DISCOVER MORE WITH BISAJO</h3>

          <h2>
            More than bookings.
            <br />A smarter way to explore.
          </h2>

          <p>
            Discover useful places, local businesses and services around you
            from one connected experience.
          </p>

          <button className="discoverButton">
            <span>Discover Nearby</span>
            <span className="arrow">→</span>
          </button>
        </div>
      </section>
      {/*The Local bussiness section */}
      <section className="bussinessSection">
        <div className="firstbox">
          {" "}
          <p className="header">FOR LOCAL BUSSINESS</p>
          <h4>Grow your business with Bisajo.</h4>
          <p>
            Reach nearby customers and showcase your services where people are
            looking.
          </p>
          <div className="mainBox">
            <div className="box">Reach Costumers</div>
            <div className="box">Promote Services</div>
            <div className="box">Build Connections</div>
          </div>
        </div>
        <div className="secondBox">
          <h3>Ready to make everyday tasks easier?</h3>
          <p>Start exploring BisaJo today.</p>
          <button>
            Get Started <FaArrowRight />
          </button>
        </div>
      </section>
    </>
  );
}
export default HowItWorkServices;
