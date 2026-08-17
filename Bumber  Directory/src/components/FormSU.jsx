import useInteractive from "../hooks/useInterative";
import { useRef } from "react";
import "../styles/SignUp.css";
import { FaUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { MdPhone } from "react-icons/md";

function FormSU() {
  // Calling function in the use Effect Hook
  const {
    // Destructuring the values from the useInteractive hook
    formData,
    error,
    handleChange,
    formSubmit,
    handleProfilePhoto,
    // Fetching countries, roles, and id_types from the useInteractive hook
    countries,
    roles,
    id_types,
    // Destructuring the values for password visibility from the useInteractive hook
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  } = useInteractive();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  return (
    <form onSubmit={formSubmit} className="mainForm">
      {/* Name */}
      <div>
        <div>
          <div className="inputDiv">
            <input
              type="text"
              name="full_name"
              ref={nameRef}
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              className="formInput"
            />
            <FaUser
              className="inputIcon"
              onClick={() => {
                nameRef.current.focus();
              }}
            />
          </div>

          {error.full_name && <p className="Error">{error.full_name}</p>}
        </div>

        {/* Email */}
        <div>
          <div className="inputDiv">
            <MdOutlineMail
              className="inputIcon"
              onClick={() => {
                emailRef.current.focus();
              }}
            />
            <input
              type="email"
              ref={emailRef}
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="formInput"
            />
          </div>

          {error.email && <p className="Error">{error.email}</p>}
        </div>

        {/* Country */}
        <div className="inputDiv">
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="formInput"
          >
            <option value="">Select Country</option>

            {countries.map((country) => (
              <option key={country.value} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {error.country && <p className="Error">{error.country}</p>}
        </div>

        {/* Phone */}
        <div>
          <div className="inputDiv">
            <MdPhone
              className="inputIcon"
              onClick={() => {
                phoneRef.current.focus();
              }}
            />
            <input
              type="tel"
              ref={phoneRef}
              name="phone_number"
              placeholder="+233XXXXXXXXX"
              value={formData.phone_number}
              onChange={handleChange}
              className="formInput"
            />
          </div>

          {error.phone_number && <p className="Error">{error.phone_number}</p>}
        </div>

        {/* User Type */}
        <div>
          {" "}
          <div className="inputDiv">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="formInput"
            >
              <option value="">Select User Type</option>

              {roles.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          {error.role && <p className="Error">{error.role}</p>}
        </div>
        {/* ID Type */}
        <div>
          {" "}
          <div className="inputDiv">
            <select
              name="id_type"
              value={formData.id_type}
              onChange={handleChange}
              className="formInput"
            >
              <option value="">Select Identity Card</option>

              {id_types.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>

            {formData.id_type && (
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePhoto}
                className="styleImage"
              />
            )}

            {error.file && <p className="Error">{error.file}</p>}
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="inputDiv">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="formInput"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="passwordIcon"
            >
              {showPassword ? "🙈" : "👀"}
            </button>
          </div>

          {error.password && <p className="Error">{error.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <div className="inputDiv">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="formInput"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="passwordIcon"
            >
              {showConfirmPassword ? "🙈" : "👀"}
            </button>
          </div>

          {error.confirmPassword && (
            <p className="Error">{error.confirmPassword}</p>
          )}
        </div>
        <div className="signUpdiv">
          <button type="submit" className="signUp-btn">
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormSU;
