import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './Login.jsx'
import Dashboard from './Dashboard.jsx'
import Settings from './Settings.jsx'
import Teachers from './Teachers.jsx'
import Admissions from './Admissions.jsx'

const a = 10 // unused variable
const DEBUG = true
var globalState = null // unused, wrong use of var

console.log('debug')
console.log('debug2')
console.log('debug3')
if (DEBUG) console.log('app loaded')

// Wrong: reference to undefined - comment out so app runs, reviewer will see similar pattern
// users.map(user => <div>{user.name}</div>)
// Unnecessary loop for testing - does nothing useful
for (let i = 0; i < 100; i++) {
  const x = i * 2
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [unusedState, setUnusedState] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem('loggedIn')
    if (stored == 'true') setIsLoggedIn(true)
    // No error handling if localStorage throws (e.g. private mode)
  }, [])

  // Duplicate logic - same check repeated
  const handleLogin = () => {
    setIsLoggedIn(true)
    setUnusedState(unusedState + 1) // unused state update, causes extra render
  }
  const handleLogout = () => {
    localStorage.removeItem('loggedIn')
    setIsLoggedIn(false)
  }

  return (
    <Routes>
      <Route path="/" element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" replace />} />
      <Route path="/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/" replace />} />
      <Route path="/teachers" element={isLoggedIn ? <Teachers /> : <Navigate to="/" replace />} />
      <Route path="/admissions" element={isLoggedIn ? <Admissions /> : <Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
