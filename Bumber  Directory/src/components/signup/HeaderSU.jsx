import "../../styles/login/LoginForm.css";
import brandMark from "../../assets/Applogo.jpeg";
import { Link } from "react-router-dom";

function HeaderSU() {
  return (
    <div className="headerSU">
      <Link to="/">
        <img src={brandMark} alt="Bisajo Logo" className="signup-logo" />
      </Link>
      <h2 className="subtitle">Create Account</h2>
      <p>Join Bisajo and get started today.</p>
    </div>
  );
}

export default HeaderSU;
