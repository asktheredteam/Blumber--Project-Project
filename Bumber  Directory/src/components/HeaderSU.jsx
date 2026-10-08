import "../styles/SignUp.css";
import  brandMark  from "../assets/Applogo.jpeg";

function HeaderSU() {
  return (
    <>
      <div>
        {" "}
        <div className="header">
          <img src={brandMark} width={40} alt="App Logo" className="Logo" />

          <h3 className="headerTxt">umber</h3>
        </div>
        <div className="greeting">
          {" "}
          <h1>Create your account</h1>
        </div>
        <div className="profile-photo-container">
          <div className="avatar-upload"></div>
        </div>
      </div>
    </>
  );
}
export default HeaderSU;
