import EndSignUp from "./EndSignUp.jsx";
import FormSU from "./FormSU.jsx";
import HeaderSU from "./HeaderSU.jsx";
import "./SignUp.css";

function SignUp() {
  return (
    <>
      <div className="body">
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
