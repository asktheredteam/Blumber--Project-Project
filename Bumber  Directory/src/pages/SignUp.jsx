import EndSignUp from "./EndSignUp.jsx";
import FormSU from "../components/FormSU.jsx";
import HeaderSU from "../components/HeaderSU.jsx";
import "../styles/SignUp.css";

function SignUp() {
  return (
    <>
      <div className="SignUpMainDiv">
        <div className="form">
          <div className="positionController">
            {" "}
            <HeaderSU></HeaderSU>
            <FormSU></FormSU>
            <EndSignUp></EndSignUp>
          </div>
        </div>
      </div>
    </>
  );
}
export default SignUp;
