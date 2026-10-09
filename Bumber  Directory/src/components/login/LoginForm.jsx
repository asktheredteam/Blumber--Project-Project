import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../shared/InputField";
import SocialButton from "../shared/SocialButton";
import logoImg from "../../assets/Applogo.jpeg";
import "../../styles/login/LoginForm.css";

import { Link } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

  const handleGoogleLogin = () => {
    console.warn(
      "Google login not configured on frontend; configure OAuth endpoint",
    );
  };

  const handleFacebookLogin = () => {
    console.warn(
      "Facebook login not configured on frontend; configure OAuth endpoint",
    );
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please fill in all the fields");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/users/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || data.message || "Login Failed");
        return;
      }

      if (data.access) localStorage.setItem("accessToken", data.access);
      if (data.refresh) localStorage.setItem("refreshToken", data.refresh);
      setError("");
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      if (err.message === "Failed to fetch") {
        setError("Cannot connect to server. Check your connection.");
      } else {
        setError("Something went wrong. Try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        <div className="card-header">
          <div className="login-logo">
            <Link to="/">
              <img src={logoImg} alt="Bisajo" />
            </Link>
          </div>

          <h2 className="welcome-heading">Welcome Back</h2>
          <p className="welcome-subheading">Log in to continue with Bisajo.</p>
        </div>

        <div className="auth-form">
          <InputField
            type="email"
            placeholder="Email Address"
            iconClass="email-icon"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            type="password"
            placeholder="Password"
            iconClass="lock-icon"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="remember-forgot">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
          </div>

          {error && <p className="status-msg error">{error}</p>}
          {success && <p className="status-msg success">{success}</p>}

          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <span>Logging in... ⏳</span>
            ) : (
              <span>Log In &rarr;</span>
            )}
          </button>

          <div className="divider">
            <span className="divider-line"></span>
            <span className="divider-text">or Continue with</span>
            <span className="divider-line"></span>
          </div>

          <div className="social-login">
            <SocialButton iconClass="google" onClick={handleGoogleLogin} />
            <SocialButton iconClass="facebook" onClick={handleFacebookLogin} />
          </div>

          <p className="account-toggle">
            Don't have an account?{" "}
            <a
              href="#"
              className="signup-link"
              onClick={(e) => {
                e.preventDefault();
                navigate("/SignUp");
              }}
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
