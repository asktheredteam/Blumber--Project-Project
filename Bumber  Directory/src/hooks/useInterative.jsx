import { useState } from "react";

export default function useInteractive() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const roles = ["landlord", "tenant"];
  const [isLoading, setIsLoading] = useState(false);

  // Validation patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Capitalize every word in full name
    if (name === "full_name") {
      newValue = value.replace(/\b\w/g, (char) => char.toUpperCase());
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Remove the error for this field
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Validate form
  const validate = () => {
    const newErrors = {};

    // Full Name
    if (!formData.full_name.trim()) {
      newErrors.full_name = "Name is required";
    } else if (formData.full_name.trim().split(/\s+/).length < 2) {
      newErrors.full_name = "Enter your full name";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Phone Number
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
    } else if (formData.phone_number.length < 10) {
      newErrors.phone_number = "Phone number is too short";
    }

    // User Type
    if (!formData.role) {
      newErrors.role = "Select a user type";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 6 characters and contain a letter and number";
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  // Submit form

  const formSubmit = async (event) => {
    event.preventDefault();

    const validateErrors = validate();

    if (Object.keys(validateErrors).length > 0) {
      setError(validateErrors);
      return;
    }

    // Clear any old server error
    setError((prev) => ({
      ...prev,
      server: "",
    }));

    const payload = new FormData();

    payload.append("full_name", formData.full_name);
    payload.append("email", formData.email);
    payload.append("phone_number", formData.phone_number);
    payload.append("role", formData.role);
    payload.append("password", formData.password);
    payload.append("confirm_password", formData.confirmPassword);

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://depress-tactile-concert.ngrok-free.dev/api/users/register/",
        {
          method: "POST",
          body: payload,
        },
      );

      const data = await response.json();

      console.log("Server response:", data);

      if (!response.ok) {
        setError({
          server:
            data.message ||
            data.detail ||
            data.error ||
            "Registration failed. Please try again.",
        });

        return;
      }

      console.log("Registration successful!");
    } catch (error) {
      console.log("Request failed:", error);

      setError({
        server: "Unable to connect to the server. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
  };
}
