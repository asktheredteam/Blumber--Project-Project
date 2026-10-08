import "../../styles/signup/SignUp.css";
import brandMark from "../../assets/Applogo.jpeg";

function HeaderSU() {
  return (
    <div className="headerSU">
      <img src={brandMark} alt="Bisajo Logo" className="signup-logo" />
      <h2 className="subtitle">Create Account</h2>
      <p>Join Bisajo and get started today.</p>
    </div>
  );
}

export default HeaderSU;
