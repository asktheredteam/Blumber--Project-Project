import "../styles/WhyBisajo.css";

import { FaBolt, FaMapMarkerAlt, FaShieldAlt, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const reasons = [
  {
    icon: <FaBolt />,
    title: "All-in-One Convenience",
    description:
      "Access rides, homes, hotels, restaurants, shops, and local services without switching between apps.",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Discover What’s Nearby",
    description:
      "Find useful places, businesses, and services around your current destination.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Safe & Reliable",
    description: "Verified users, trusted businesses, and secure transactions.",
  },
  {
    icon: <FaUsers />,
    title: "Support Local Business",
    description:
      "Help local businesses grow by connecting with nearby customers.",
  },
];

function WhyChooseBisajo() {
  return (
    <section className="why-bisajo-section">
      {/* Section heading */}
      <div className="why-bisajo-heading">
        <h2>Why you need Bisajo?</h2>
      </div>

      {/* Main content */}
      <div className="why-bisajo-container">
        {/* Left side */}
        <div className="why-bisajo-intro">
          <h3>
            Everything You Need,
            <br />
            In One Place
          </h3>

          <p>
            BisaJo makes your life easier by bringing together trusted services,
            local businesses, and everyday convenience — all in one app.
          </p>

          <Link to="/about" className="why-bisajo-button">
            <span>Learn More About Us</span>
            <span className="why-bisajo-arrow">→</span>
          </Link>
        </div>

        {/* Right side */}
        <div className="why-bisajo-reasons">
          {reasons.map((reason, index) => (
            <div className="why-bisajo-item" key={index}>
              <div className="why-bisajo-icon">{reason.icon}</div>

              <div className="why-bisajo-text">
                <h4>{reason.title}</h4>
                <p>{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseBisajo;
