import { Link } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "../styles/Servicestyle.css";
import {
  FaHome,
  FaHotel,
  FaCar,
  FaUtensils,
  FaMapMarkerAlt,
  FaStore,
  FaShieldAlt,
  FaLock,
  FaHeadset,
  FaAward,
  FaArrowRight,
  FaBolt,
  FaThLarge,
  FaTag,
  FaRocket,
} from "react-icons/fa";

function Service() {
  const services = [
    {
      icon: <FaHome />,
      title: "Rent Homes",
      description:
        "Browse verified rental properties and connect with trusted landlords with ease.",
    },
    {
      icon: <FaHotel />,
      title: "Book Hotels",
      description:
        "Find and book quality hotels at the best prices for your perfect stay, anytime, anywhere.",
    },
    {
      icon: <FaCar />,
      title: "Book Rides",
      description:
        "Request safe, reliable rides and get to your destination comfortably.",
    },
    {
      icon: <FaUtensils />,
      title: "Find Restaurants",
      description:
        "Discover great restaurants near you and enjoy the best dining experiences.",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Discover Nearby",
      description:
        "Explore nearby places, attractions, and services that make your day better.",
    },
    {
      icon: <FaStore />,
      title: "Local Services",
      description:
        "Connect with trusted local businesses and essential services you can rely on.",
    },
  ];

  const benefits = [
    {
      icon: <FaShieldAlt />,
      title: "Trusted & Verified",
      description: "All listings and partners are carefully verified.",
    },
    {
      icon: <FaLock />,
      title: "Secure & Safe",
      description: "Your data and payments are always protected.",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      description: "We're here for you, anytime you need us.",
    },
    {
      icon: <FaAward />,
      title: "Reliable Service",
      description: "Quality you can count on, every single time.",
    },
    {
      icon: <FaBolt />,
      title: "Easy and Convenient",
      description: "Everything you need in one simple platform.",
    },
    {
      icon: <FaThLarge />,
      title: "Wide Range of Choices",
      description: "Explore multiple services and options in one place.",
    },
    {
      icon: <FaTag />,
      title: "Transparent Pricing",
      description: "Clear pricing with no unnecessary surprises.",
    },
    {
      icon: <FaRocket />,
      title: "Fast & Seamless",
      description: "Find, book, and connect without the hassle.",
    },
  ];

  return (
    <>
      <div className="service-container">
        <div className="headline">Our Services</div>
        <h1 className="title">
          Everything you need, in one{" "}
          <span className="highlight">Smart App</span>
        </h1>
        <div className="subtitle">
          <p className="p">
            Bumber brings together trusted services to make your daily life
            easier, safer, and more convenient.
          </p>
        </div>
        <div className="services-list">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className={`service-icon icon-${index + 1}`}>
                {service.icon}
              </div>

              <div className="service-content">
                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <Link
                  to="/signup"
                  className="service-link"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/SignUp");
                  }}
                >
                  Get Started
                  <FaArrowRight />
                </Link>
              </div>

              <FaArrowRight className="mobile-arrow" />
            </div>
          ))}
        </div>
        {/*Trust and benefits*/}
        <div className="benefits-container">
          <div className="benefits-track">
            <div className="benefits">
              {benefits.map((benefit, index) => (
                <div className="benefit" key={`${benefit.title}-${index}`}>
                  <div className="benefit-icon">{benefit.icon}</div>

                  <div>
                    <h4>{benefit.title}</h4>
                    <p>{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="benefits" aria-hidden="true">
              {benefits.map((benefit, index) => (
                <div className="benefit" key={`${benefit.title}-${index}`}>
                  <div className="benefit-icon">{benefit.icon}</div>

                  <div>
                    <h4>{benefit.title}</h4>
                    <p>{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Service;
