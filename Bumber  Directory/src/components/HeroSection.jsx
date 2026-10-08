import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import "../styles/Hero.css";
import { MdOutlineArrowForward } from "react-icons/md";

function heroSection() {
  const featureBtnRef = useRef(null);

  return (
    <>
      {" "}
      <section className="hero">
        <div className="overlay"></div>
        <div className="contentDiv">
          <h3 className="titles">
            ONE APP FOR <br />
            ALL YOUR ERRANDS
          </h3>
          <div>
            {" "}
            <h1 className="subHeadline">
              Ride,Rent <br />
              Shop & Booking
            </h1>
            <Link to="/login">
              <button className="button" ref={featureBtnRef}>
                GET STARTED
                <MdOutlineArrowForward
                  onClick={() => featureBtnRef.current.click()}
                />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
export default heroSection;
