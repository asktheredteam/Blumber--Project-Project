import { FcGoogle } from "react-icons/fc";
import { IoLogoFacebook } from "react-icons/io5";

import "../../../styles/auth/SignUp.css";

function SignUpSocialOptions() {
  return (
    <>
      <div className="endSignUp">
        <div>
          <div className="Continue">
            <hr className="horiContinue" />
            <span>• Or Continue with •</span>
            <hr className="horiContinue" />
          </div>

          <div className="continueIcon">
            <button type="button" className="socialButton googleButton">
              <FcGoogle />
              <span>Google</span>
            </button>

            <button type="button" className="socialButton facebookButton">
              <IoLogoFacebook />
              <span>Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default SignUpSocialOptions;
