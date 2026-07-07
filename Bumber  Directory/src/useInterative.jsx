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
  const countries = [
    { name: "Ghana", value: "GH", code: "+233(0)" },
    { name: "Nigeria", value: "NG", code: "+234" },
    { name: "United States", value: "US", code: "+1" },
    { name: "Canada", value: "CAN", code: "+1" },
    { name: "United Kingdom", value: "UK", code: "+44" },
    { name: "Germany", value: "GER", code: "+49" },
    { name: "France", value: "FRA", code: "+33" },
    { name: "South Africa", value: "SA", code: "+27" },
    { name: "Kenya", value: "KE", code: "+254" },
    { name: "India", value: "IN", code: "+91" },
  ];

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

    // Handle country selection
    if (name === "country") {
      const selectedCountry = countries.find(
        (country) => country.name === value,
      );

      setFormData((prev) => ({
        ...prev,
        country: selectedCountry ? selectedCountry.value : "",
        phone_number: selectedCountry ? selectedCountry.code : "",
      }));

      return;
    }
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
  const validatePhone = () => {
    const selectedCountry = countries.find(
      (country) => country.value === formData.country,
    );

    if (!selectedCountry) return false;

    return formData.phone_number.startsWith(selectedCountry.code);
  };
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

    // Country
    if (formData.country === "") {
      setError((newErrors.country = "select a country"));
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

    // Image
    if (!cardImage) {
      setError((newErrors.file = "Please upload your ID image"));
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
    payload.append("country", formData.country);
    payload.append("id_type", formData.id_type);
    payload.append("role", formData.role);
    payload.append("password", formData.password);

    payload.append("citizenship_card", cardImage);

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

    countries,
    roles,
    id_types,

    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  };
}
