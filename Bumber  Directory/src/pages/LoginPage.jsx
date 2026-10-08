

import LoginForm from "../components/login/LoginForm";
import "../styles/login/LoginPage.css";

function LoginPage() {
  // Main layout for the login page with illustration and form
  return (
    <div className="LoginMain">
      <div className="login-container">
        <div className="illustration-side"></div>
        <div className="form-side">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
