import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Splas.css";
import Applogo from "../assets/Applogo.png";

export default function SplashScreen() {
  const navigate = useNavigate();
  useEffect(() => {
    const Timer = setTimeout(() => {
      navigate("/SignUp");
    }, 4500);

    return () => {
      clearTimeout(Timer);
    };
  }, [navigate]);
  return (
    <>
      <div className="LuncherDiv">
        <img src={Applogo} alt="" className="LuncherImage" />
        <p className="paragraph">umber</p>
      </div>
    </>
  );
}
