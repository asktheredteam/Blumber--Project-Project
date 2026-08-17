import heroImg from '../assets/hero.png'
import LoginForm from '../components/LoginForm'
import '../styles/LoginPage.css'

function LoginPage() {
  // Main layout for the login page with illustration and form
  return (
    <div className="login-container">
      <div className="illustration-side">
        <img
          src={heroImg}
          className="hero-image"
          alt="city illustration"
          width="874"
          height="1374"
        />
      </div>
      <div className="form-side">
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage