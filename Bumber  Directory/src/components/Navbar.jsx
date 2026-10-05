import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import "../styles/Navbar.css";

function Navbar({ onSignUpClick }) {
  const [featureOpen, setFeatureOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileFeatureOpen, setMobileFeatureOpen] = useState(false);

  // Detect current page for navbar style switching
  const location = useLocation();
  const isLightPage = location.pathname !== "/";

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

  return (
    <nav className={`navbar ${isLightPage ? "navbar-light" : ""}`}>
      <div className="logoDiv">
        <Link to="/" className="logo">
          <img src="../src/assets/Logo.svg" alt="No logo Yet" />
        </Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">HOME</Link>
        </li>

        <li>
          <a
            href="/services"
            onClick={(e) => {
              e.preventDefault();
              scrollToService();
            }}
          >
            SERVICES
          </a>
        </li>

        <li>
          <Link to="/about">ABOUT US</Link>
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
          LOG IN
        </Link>
        <button className="Sign-Up" onClick={onSignUpClick}>
          SIGN UP
        </button>

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
          HOME
        </Link>

        <Link to="/services" onClick={() => setMenuOpen(false)}>
          SERVICE
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

        <button
          type="button"
          className="SignUp"
          onClick={() => {
            setMenuOpen(false);
            onSignUpClick();
          }}
          style={{
            width: "100%",
            marginTop: "0.6rem",
            color: isLightPage ? "white" : "black",
          }}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
