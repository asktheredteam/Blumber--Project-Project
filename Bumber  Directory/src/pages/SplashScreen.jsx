import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Splas.css";
import  brandMark   from "../assets/Applogo.jpeg";

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
        <img src={brandMark} alt="" className="LuncherImage" />
        <p className="paragraph">umber</p>
      </div>
    </>
  );
}
