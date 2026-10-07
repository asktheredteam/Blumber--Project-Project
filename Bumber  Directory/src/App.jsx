import SignUp from "./pages/SignUp";
import SplashScreen from "./pages/SplashScreen";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePages";
import AboutPage from "./pages/AboutPage";
import { Routes, Route } from "react-router-dom";
import ServicePage from "./pages/ServicePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicePage />} />
      </Routes>
    </>
  );
}

export default App;
