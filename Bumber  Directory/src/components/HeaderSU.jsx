import "../styles/SignUp.css";
import Applogo from "../assets/Applogo.png";

function HeaderSU() {
  return (
    <>
      <div>
        {" "}
        <div className="header">
          <img src={Applogo} width={40} alt="App Logo" className="Logo" />

          <h3 className="headerTxt">umber</h3>
        </div>
        <div className="greeting">
          {" "}
          <h1>Create your account</h1>
        </div>
        <div className="profile-photo-container">
          <div className="avatar-upload">
            <label htmlFor="profilePhoto" className="avatar-label">
              <div className="avatar-preview">
                <span className="avatar-initials">B</span>
              </div>
            </label>
            <input
              id="profilePhoto"
              type="file"
              accept="image/*"
              className="avatar-input"
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default HeaderSU;
