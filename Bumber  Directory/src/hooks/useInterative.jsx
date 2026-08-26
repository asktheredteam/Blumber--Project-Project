import { useState } from "react";

export default function useInteractive() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    country: "",
    id_type: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});
  const [cardImage, setCardImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const roles = ["Landlord", "Tenant"];

  const id_types = ["Citizen Card", "Voters Id", "Driver's Licence"];
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameParts = formData.full_name.trim().split(/\s+/);

  //Initializing of handleChange

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    // Capitalize first letter of every word in the name
    if (name === "full_name") {
      newValue = value.replace(/\b\w/g, (char) => char.toUpperCase());
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  //Validating input condition

  const validate = () => {
    let newErrors = {};

    // Name
    if (!formData.full_name.trim()) {
      newErrors.full_name = "Name is required";
    } else if (formData.full_name.trim().split(/\s+/).length < 2) {
      setError((newErrors.full_name = "Enter your full name"));
    }

    // Email
    if (!emailRegex.test(formData.email)) {
      setError((newErrors.email = "Enter a valid email address"));
    }

    // Phone
    if (!formData.phone_number) {
      setError((newErrors.phone_number = "Phone number is required"));
    } else if (!validatePhone()) {
      setError((newErrors.phone_number = "Phone code does not match country"));
    } else if (formData.phone_number.length < 10) {
      setError((newErrors.phone_number = "Phone number is too short"));
    }

    // User Type
    if (formData.role === "") {
      setError((newErrors.role = "Please select a user type"));
    }

    // Password
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[A-Za-z])/.test(formData.password)) {
      newErrors.password = "Include at least one letter";
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Include at least one number";
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      setError((newErrors.confirmPassword = "Passwords do not match"));
    }

    return newErrors;
  };

  //Submiting form function
  const formSubmit = async (event) => {
    event.preventDefault();

    const validateErrors = validate();

    if (Object.keys(validateErrors).length > 0) {
      setError(validateErrors);
      return;
    }

    const payload = new FormData();

    payload.append("full_name", formData.full_name);
    payload.append("email", formData.email);
    payload.append("phone_number", formData.phone_number);

    payload.append("id_type", formData.id_type);
    payload.append("role", formData.role);
    payload.append("password", formData.password);

    // optional
    payload.append("profile_photo", cardImage);

    try {
      const response = await fetch(
        "https://depress-tactile-concert.ngrok-free.dev/api/users/register/",
        {
          method: "POST",
          body: payload,
        },
      );

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //Handling Profile Photos
  const handleProfilePhoto = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setCardImage(null);
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setError((prev) => ({
        ...prev,
        file: "Only PNG and JPEG images are allowed",
      }));
      return;
    }

    if (file.size > maxSize) {
      setError((prev) => ({
        ...prev,
        file: "Image size must be less than 5MB",
      }));
      return;
    }

    setError((prev) => ({
      ...prev,
      file: "",
    }));

    setCardImage(file);
  };
  return {
    formData,
    error,
    handleChange,
    formSubmit,
    handleProfilePhoto,

    roles,

    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  };
}
