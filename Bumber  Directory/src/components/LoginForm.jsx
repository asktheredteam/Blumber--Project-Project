import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from './InputField'
import SocialButton from './SocialButton'
import Logo from './Logo'

function LoginForm() {
  // Form state for the login inputs
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const[ loading ,setLoading]=useState(false)
  const[ error ,setError]=useState('')

  const navigate = useNavigate()

  const API_BASE = import.meta.env.VITE_API_BASE_URL || ''


   //

   const handleGoogleLogin = () => {
    console.warn('Google login not configured on frontend; configure OAuth endpoint')
  }


  const handleFacebookLogin = () => {
    console.warn('Facebook login not configured on frontend; configure OAuth endpoint')
  }




    //Handle form submission and validation

    const handleSubmit = async()=> {
      
          if(!username || !email || !password ){

            setError('Please fill all the fields')
            return
          }
        

          setError('')
          setLoading(true)

          try{
              const response = await fetch(`${API_BASE}/api/users/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
              })

              const data = await response.json()

              if (!response.ok) {
                setError(data.error || data.message || 'Login Failed')
                return
              }

              // Success - save tokens and redirect
              if (data.access) localStorage.setItem('accessToken', data.access)
              if (data.refresh) localStorage.setItem('refreshToken', data.refresh)
              setError('')
              navigate('/')
        
          }  catch(err){
            setError('Somethingwent wrong.Try again')
          }finally{
            setLoading(false)
          }
    }  





  return (
    <div>
      <Logo />
      <h2 className="welcome-heading">Welcome back</h2>

      <div className="auth-form">
        {/* Login form input fields */}
        <InputField
          type="text"
          placeholder="Enter username"
          icon=""
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type="text"
          placeholder="Enter your email"
          iconClass="mail-icon"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Enter previous password"
          iconClass="lock-icon"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="forgot-password-container">
          {/* Password recovery link */}
          <a href="#" className="forgot-password">Forgot password?</a>
        </div>

        {/* Submit action for the form */}


        { error && <p style={{color:'red',fontSize:'0.85rem'}}>{error}</p>}
        <button className="submit-btn" onClick={handleSubmit}
           disabled={loading}

        >
      

         { loading?'Sign in...' :'Log In ' } 
        </button>

        <p className="account-toggle">
          Don't have an account? <a href="#" className="signup-link" onClick={(e) => { e.preventDefault(); navigate('/SignUp') }}>Sign Up</a>
        </p>

        {/* Divider before social login options */}
        <div className="divider">or continue with</div>

        {/* Social login buttons */}
        <div className="social-login">
          <SocialButton iconClass="google" onClick={handleGoogleLogin} />
          <SocialButton iconClass="facebook" onClick={handleFacebookLogin} />
        </div>
      </div>
    </div>
  )
}

export default LoginForm