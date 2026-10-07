import useInteractive from "../hooks/useInterative";
import { useRef } from "react";
import LoadingSpinner from "../pages/LoadingSpinner";
import "../styles/SignUp.css";
import {
  LuUser,
  LuMail,
  LuPhone,
  LuUsers,
  LuLock,
  LuEye,
  LuEyeOff,
  LuChevronDown,
  LuArrowRight,
} from "react-icons/lu";

function FormSU() {
  const {
    formData,
    error,
    handleChange,
    formSubmit,
    roles,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isLoading,
  } = useInteractive();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  return (
    <form onSubmit={formSubmit} className="signup-form">
      {/* Full Name */}
      <div className="field-group">
        <div className="field">
          <LuUser
            className="field-icon"
            onClick={() => nameRef.current.focus()}
          />

          <input
            type="text"
            name="full_name"
            ref={nameRef}
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {error.full_name && <p className="field-error">{error.full_name}</p>}
      </div>

      {/* Email */}
      <div className="field-group">
        <div className="field">
          <LuMail
            className="field-icon"
            onClick={() => emailRef.current.focus()}
          />

          <input
            type="email"
            name="email"
            ref={emailRef}
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {error.email && <p className="field-error">{error.email}</p>}
      </div>

      {/* Phone Number */}
      <div className="field-group">
        <div className="field">
          <LuPhone
            className="field-icon"
            onClick={() => phoneRef.current.focus()}
          />

          <input
            type="tel"
            name="phone_number"
            ref={phoneRef}
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {error.phone_number && (
          <p className="field-error">{error.phone_number}</p>
        )}
      </div>

      {/* User Type */}
      <div className="field-group">
        <div className="field">
          <LuUsers className="field-icon" />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select User Type</option>

            {roles.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <LuChevronDown className="field-chevron" />
        </div>

        {error.role && <p className="field-error">{error.role}</p>}
      </div>

      {/* Password */}
      <div className="field-group">
        <div className="field">
          <LuLock className="field-icon" />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="toggle-eye"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <LuEyeOff /> : <LuEye />}
          </button>
        </div>

        {error.password && <p className="field-error">{error.password}</p>}
      </div>

      {/* Confirm Password */}
      <div className="field-group">
        <div className="field">
          <LuLock className="field-icon" />

          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-input"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="toggle-eye"
            aria-label="Toggle confirm password visibility"
          >
            {showConfirmPassword ? <LuEyeOff /> : <LuEye />}
          </button>
        </div>

        {error.confirmPassword && (
          <p className="field-error">{error.confirmPassword}</p>
        )}

        {error.server && <p className="field-error">{error.server}</p>}
      </div>

      {/* Submit */}
      <button type="submit" disabled={isLoading} className="btn-primary">
        {isLoading ? <LoadingSpinner /> : "Sign Up"}
        <LuArrowRight />
      </button>
    </form>
  );
}

export default FormSU;
