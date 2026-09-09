import EndSignUp from "./EndSignUp.jsx";
import FormSU from "../components/FormSU.jsx";
import HeaderSU from "../components/HeaderSU.jsx";
import heroImg from "../assets/hero.png";
import "../styles/SignUp.css";

function SignUp() {
  return (
    <div className="body">
      <div className="signup-page">
        <div className="signup-card">
          <div className="positionController">
            <HeaderSU />
            <FormSU />
            <EndSignUp />
          </div>
        </div>

        <div className="signup-illustration">
          <img
            src={heroImg}
            alt="City illustration"
            className="signup-hero-image"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;