import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './Login.jsx'
import Dashboard from './Dashboard.jsx'


const a = 10; // unused variable

console.log("debug");
console.log("debug2");
console.log("debug3");

users.map(user => (
  <div>{user.name}</div>
));


/**
 * Render the top-level routing for the app and manage simple authentication state.
 *
 * On mount, reads localStorage key 'loggedIn' to initialize the login state.
 * Exposes handlers to mark the user as logged in and to log out (which removes the 'loggedIn' key).
 *
 * @returns {JSX.Element} The app's route tree with routes and redirects based on authentication state.
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('loggedIn')
    if (stored == 'true') setIsLoggedIn(true)
  }, [])

  const handleLogin = () => setIsLoggedIn(true)
  const handleLogout = () => {
    localStorage.removeItem('loggedIn')
    setIsLoggedIn(false)
  }

  return (
    <Routes>
      <Route path="/" element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
