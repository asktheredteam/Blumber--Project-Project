import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Splas.css";

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
        <img src="src/Applogo.png" alt="" className="LuncherImage" />
        <p className="paragraph">umber</p>
      </div>
    </>
  );
}
