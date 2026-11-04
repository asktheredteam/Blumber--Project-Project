import SignUpSocialOptions from "../features/auth/components/SignUpSocialOptions.jsx";
import FormSU from "../features/auth/components/FormSU.jsx";
import HeaderSU from "../features/auth/components/HeaderSU.jsx";

import "../styles/auth/SignUp.css";

function SignUp({ onClose }) {
  return (
    <div className="signup-overlay" onClick={onClose}>
      <div className="signUp-Card" onClick={(e) => e.stopPropagation()}>
        <div className="positionController">
          <HeaderSU />
          <FormSU />
          <SignUpSocialOptions />
        </div>
      </div>
    </div>
  );
}
export default SignUp;
