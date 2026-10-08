import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { MdPhone } from "react-icons/md";
import brandMark from "../assets/Applogo.jpeg";

import "../styles/Navbar.css";

function Navbar() {
  const [featureOpen, setFeatureOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileFeatureOpen, setMobileFeatureOpen] = useState(false);

  // Detect current page for navbar style switching
  const location = useLocation();
  const isLightPage = location.pathname !== "/";

  const Features = [
    { name: "Rent Houses", link: "/#services" },
    { name: "Book Hotels", link: "/#services" },
    { name: "Rides", link: "/#services" },
    { name: "Restaurants", link: "/#services" },
    { name: "Shops", link: "/#services" },
  ];

  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const featureRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
        setMobileFeatureOpen(false);
      }

      if (featureRef.current && !featureRef.current.contains(e.target)) {
        setFeatureOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setMobileFeatureOpen(false);
        setFeatureOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <nav className={`navbar ${isLightPage ? "navbar-light" : ""}`}>
      <div className="logo">
        <Link to="/" className="logo-text">
          <img src={brandMark} alt="Bisajo home" className="logo-mark" />
        </Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">HOME</Link>
        </li>

        <li>
          <Link to="/#services">
            SERVICES
          </Link>
        </li>

        <li>
          <Link to="/about">ABOUT US </Link>
        </li>

        <li className="dropdown" ref={featureRef}>
          <button
            type="button"
            className="feature-link"
            aria-expanded={featureOpen}
            aria-haspopup="true"
            onClick={() => setFeatureOpen((prev) => !prev)}
          >
            FEATURES
          </button>

          <ul className={`dropdown_menu ${featureOpen ? "show" : ""}`}>
            {Features.map((feature, index) => (
              <li key={index}>
                <Link to={feature.link} onClick={() => setFeatureOpen(false)}>
                  {feature.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>

      <div className="navbar-actions">
        <div className="phone-contact">
          <MdPhone aria-hidden="true" />
          <span>123 456 789</span>
        </div>

        <div className="auth-buttons">
          <Link to="/login" className="auth-btn btn-login">
            LOG IN
          </Link>
          <Link to="/signup" className="auth-btn btn-signup">
            SIGN UP
          </Link>
        </div>

        <button
          type="button"
          className="navbar-menu-toggle"
          ref={menuButtonRef}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoClose /> : <HiOutlineMenuAlt3 />}
        </button>
      </div>

      <div ref={menuRef} className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <div className="phone-contact mobile-phone-contact">
          <MdPhone aria-hidden="true" />
          <span>123 456 789</span>
        </div>

        <Link to="/" onClick={() => setMenuOpen(false)}>
          HOME
        </Link>

        <Link to="/#services" onClick={() => setMenuOpen(false)}>
          SERVICES
        </Link>

        <Link to="/about" onClick={() => setMenuOpen(false)}>
          ABOUT US
        </Link>

        <button
          className="mobile-feature-btn"
          aria-expanded={mobileFeatureOpen}
          onClick={() => setMobileFeatureOpen(!mobileFeatureOpen)}
        >
          FEATURES
        </button>

        <div
          className={`mobile-feature-list ${mobileFeatureOpen ? "open" : ""}`}
        >
          {Features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              onClick={() => {
                setMenuOpen(false);
                setMobileFeatureOpen(false);
              }}
            >
              {feature.name}
            </Link>
          ))}
        </div>

        <hr />

        <Link
          to="/login"
          onClick={() => setMenuOpen(false)}
          className="auth-btn btn-login"
        >
          LOG IN
        </Link>

        <Link
          to="/signup"
          className="auth-btn btn-signup"
          onClick={() => setMenuOpen(false)}
        >
          SIGN UP
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;