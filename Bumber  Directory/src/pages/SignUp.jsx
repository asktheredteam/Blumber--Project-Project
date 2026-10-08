import EndSignUp from "./EndSignUp.jsx";
import FormSU from "../components/FormSU.jsx";
import HeaderSU from "../components/signup/HeaderSU.jsx";

import "../styles/signup/SignUp.css";

function SignUp({ onClose }) {
  return (
    <div className="signup-overlay" onClick={onClose}>
      <div className="signUp-Card" onClick={(e) => e.stopPropagation()}>
        <div className="positionController">
          <HeaderSU />
          <FormSU />
          <EndSignUp />
        </div>
      </div>
    </div>
  );
}
export default SignUp;
