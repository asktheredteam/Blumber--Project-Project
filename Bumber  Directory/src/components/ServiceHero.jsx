import { useRef } from "react";
import { MdOutlineArrowForward } from "react-icons/md";
import "../styles/ServicesPage.css";

function ServiceHero() {
  const featureBtnRef = useRef("");
  return (
    <>
      <section className="servicesHero">
        <div className="ContentDiv">
          <p>BISAJO SERVICES</p>
          <div>
            {" "}
            <h1>
              Everything you need, <br />
              in one smart app
            </h1>
            <p>
              Ride, rent, stay, eat, shop and discover trusted services <br />
              around you — all through BisaJo{" "}
            </p>
            <button ref={featureBtnRef}>
              GET STARTED
              <MdOutlineArrowForward
                onClick={() => featureBtnRef.current.click()}
              />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
export default ServiceHero;
