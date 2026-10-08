import SignUp from "./pages/SignUp";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePages";
import AboutPage from "./pages/AboutPage";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const targetId = decodeURIComponent(location.hash.slice(1));
    requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path ="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default App;
