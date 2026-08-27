import SignUp from "./pages/SignUp";
import SplashScreen from "./pages/SplashScreen";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePages";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
