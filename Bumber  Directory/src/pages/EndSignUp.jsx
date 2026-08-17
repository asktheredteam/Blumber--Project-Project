import useInteractive from "../hooks/useInterative";
import { FcGoogle } from "react-icons/fc";
import { IoLogoFacebook } from "react-icons/io5";
import { GrInstagram } from "react-icons/gr";
import "../styles/SignUp.css";

function EndSignUp() {
  const { continueWithStyle, horiStyle, continueText, IconDivStyle } =
    useInteractive();
  return (
    <>
      <div className="endSignUp">
        <div className="Login">
          {" "}
          <p>
            Already have an account{" "}
            <span>
              <a href="/login">Login</a>
            </span>
          </p>
        </div>
        <div>
          <p className="Terms">
            By signing up you have agreed ,to the <a href=" terms"> Terms </a>{" "}
            of the <a href="Service">Service</a> and{" "}
            <a href="Privacy Policy">Privacy Policy</a>
          </p>
          <div className="Continue">
            <hr className="horiContinue1" />
            <span>• Or continue with •</span>
            <hr className="horiContinue2" />
          </div>

          <div className="continueIcon">
            <FcGoogle className="Icon" />
            <IoLogoFacebook color="blue" className="Icon" />
            <GrInstagram className="Icon" />
          </div>
        </div>
      </div>
    </>
  );
}
export default EndSignUp;
