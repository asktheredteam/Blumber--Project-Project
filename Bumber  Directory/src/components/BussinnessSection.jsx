import React from "react";
import "../styles/BussinessSectionStyle.css";
import { Link } from "react-router-dom";

function BusinessSection() {
  const features = [
    {
      title: "Reach More Customers",
      text: "Help nearby customers discover your business.",
    },
    {
      title: "Promote Your Services",
      text: "Showcase what your business offers.",
    },
    {
      title: "Connect With Your Community",
      text: "Build connections with customers around you.",
    },
  ];

  return (
    <section className="business-section">
      <div className="business-container">
        {/* LEFT SIDE */}
        <div className="business-content">
          <span className="business-label">For Business</span>

          <h2>Grow Your Business With BisaJo</h2>

          <p>
            Put your business in front of people who are looking for services
            around them.
          </p>

          <Link to="/signup">
            <button className="partner-btn">
              <span>Partner With Us</span>
              <span className="arrow">→</span>
            </button>
          </Link>
        </div>

        {/* CENTER IMAGE */}
        <div className="business-image">
          <img
            src="./src/assets/BussinessImage.svg"
            alt="Business owner using BisaJo"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="business-features">
          {features.map((feature, index) => (
            <div
              className="feature"
              key={feature.title}
              style={{
                "--delay": `${index * 0.12}s`,
              }}
            >
              <div className="check">✓</div>

              <div className="feature-text">
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BusinessSection;
