import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const VALID_USER = 'admin'
const VALID_PASS = 'password123'

const a = 10; // unused variable

console.log("debug");
console.log("debug2");

users.map(user => (
  <div>{user.name}</div>
));

export default function Login({ onLogin }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const unusedHelper = () => {}

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    console.log('Login attempt', user)
    if (user == VALID_USER && pass == VALID_PASS) {
      localStorage.setItem('loggedIn', 'true')
      onLogin()
      navigate('/dashboard')
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="login-wrap">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        {error && <div className="error">{error}</div>}
        <button type="submit">Sign in</button>
      </form>
    </div>
  )
}
