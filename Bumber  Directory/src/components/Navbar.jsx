import { Link, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

import "../styles/Navbar.css";

function Navbar() {
  const [featureOpen, setFeatureOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileFeatureOpen, setMobileFeatureOpen] = useState(false);

  const Features = [
    { name: "Rent Houses", link: "/rent" },
    { name: "Book Hotels", link: "/hotel" },
    { name: "Rides", link: "/ride" },
    { name: "Restaurants", link: "/restaurant" },
    { name: "Shops", link: "/shop" },
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

  const signUpBtnStyle = {
    background: "#ffffff",
    border: "none",
    color: "#0a0a0a",
    padding: "0.55rem 1.6rem",
    borderRadius: "999px",
    fontWeight: 700,
    fontSize: "0.95rem",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
    boxShadow: "0 4px 14px rgba(255, 255, 255, 0.15)",
    transition: "all 200ms ease",
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-text">
          BUMBER<span className="logo-dot">.</span>
        </Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/Service">Services</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        <li className="dropdown" ref={featureRef}>
          <button
            type="button"
            className="feature-link"
            aria-expanded={featureOpen}
            aria-haspopup="true"
            onClick={() => setFeatureOpen((prev) => !prev)}
          >
            Features
            {featureOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
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
        <Link to="/login" className="LogIn">
          Log In
        </Link>

        <Link to="/signup" style={signUpBtnStyle}>
          Sign Up
        </Link>

        <button
          className="signup-btn"
          ref={menuButtonRef}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoClose /> : <HiOutlineMenuAlt3 />}
        </button>
      </div>

      <div ref={menuRef} className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>

        <Link to="/services" onClick={() => setMenuOpen(false)}>
          Services
        </Link>

        <Link to="/about" onClick={() => setMenuOpen(false)}>
          About
        </Link>

        <button
          className="mobile-feature-btn"
          aria-expanded={mobileFeatureOpen}
          onClick={() => setMobileFeatureOpen(!mobileFeatureOpen)}
        >
          Features
          {mobileFeatureOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
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
          className="LogIn"
          style={{ width: "100%" }}
        >
          Log In
        </Link>

        <Link
          to="/signup"
          className="SignUp"
          onClick={() => setMenuOpen(false)}
          style={{ width: "100%", marginTop: "0.6rem", color: "black" }}
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
