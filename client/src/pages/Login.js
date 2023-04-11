import { useState, useEffect } from "react"
import { useLogin } from "../hooks/useLogin"
import goog from '../images/google.png'
import axios from "axios";
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()
  const { dispatch } = useAuthContext()
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(email + " " + password);
    await login(email, password)
  }
  const googleAuth = async () => {
    window.open(
      `http://localhost:4000/auth/google/callback`,
      "_self"
    );
      
  };
  
  return (
    <form className="login" onSubmit={handleSubmit}>
      <div className="socialIcons"><h2>Log In</h2></div>


      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="socialIcons"><button className="but" disabled={isLoading}>Log in</button></div>
      {error && <div className="error">{error}</div>}
      <div className="socialIcons">
        <h5>----------Or Connect With---------- </h5>
        <div>
          <img src={goog} onClick={googleAuth} className="google" />
        </div>
      </div>
      <div className="socialIcons"><Link className="blue-link" to="/signup">Do not have a account ?</Link></div>
    </form>
  )
}

export default Login