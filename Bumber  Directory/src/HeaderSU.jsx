import "./SignUp.css";

function HeaderSU() {
  return (
    <>
      <div>
        {" "}
        <div className="header">
          <img
            src="src/Applogo.png"
            width={40}
            alt="App Logo"
            className="Logo"
          />

          <h3 className="headerTxt">umber</h3>
        </div>
        <div className="greeting">
          {" "}
          <h1>Create your account</h1>
        </div>
      </div>
    </>
  );
}
export default HeaderSU;
