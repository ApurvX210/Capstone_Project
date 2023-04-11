import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import goog from '../images/google.png'
const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, error, isLoading } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(email + " " + password);
    await signup(username, email, password)
  }
  const googleAuth = async () => {
    window.open(
      `http://localhost:4000/auth/google/callback`,
      "_self"
    );
      
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <div className="socialIcons"><h2>Sign Up</h2></div>
      <label>User Name:</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
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

      <div className="socialIcons"><button className="but" disabled={isLoading}>Sign Up</button></div>
      {error && <div className="error">{error}</div>}
      <div className="socialIcons">
        <h5>----------Or Connect With---------- </h5>
        <div>
          <img src={goog} onClick={googleAuth} className="google" />
        </div>
      </div>

    </form>
  )
}

export default Signup