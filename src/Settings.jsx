import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Settings() {
  const navigate = useNavigate()
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    emailUpdates: true,
    autoSave: true,
  })

  function handleToggle(key) {
    setSettings({ ...settings, [key]: !settings[key] })
  }

  function handleSave() {
    localStorage.setItem('appSettings', JSON.stringify(settings))
    alert('Settings saved successfully!')
  }

  function handleBack() {
    navigate('/dashboard')
  }

  return (
    <div className="settings-wrap">
      <header>
        <h1>Settings</h1>
        <button onClick={handleBack}>Back to Dashboard</button>
      </header>

      <div className="settings-content">
        <h2>Application Settings</h2>
        
        <div className="setting-item">
          <label>
            <input 
              type="checkbox" 
              checked={settings.notifications}
              onChange={() => handleToggle('notifications')}
            />
            Enable Notifications
          </label>
          <p className="setting-description">Receive notifications for important updates</p>
        </div>

        <div className="setting-item">
          <label>
            <input 
              type="checkbox" 
              checked={settings.darkMode}
              onChange={() => handleToggle('darkMode')}
            />
            Dark Mode
          </label>
          <p className="setting-description">Switch to dark theme</p>
        </div>

        <div className="setting-item">
          <label>
            <input 
              type="checkbox" 
              checked={settings.emailUpdates}
              onChange={() => handleToggle('emailUpdates')}
            />
            Email Updates
          </label>
          <p className="setting-description">Receive email updates about student progress</p>
        </div>

        <div className="setting-item">
          <label>
            <input 
              type="checkbox" 
              checked={settings.autoSave}
              onChange={() => handleToggle('autoSave')}
            />
            Auto Save
          </label>
          <p className="setting-description">Automatically save changes</p>
        </div>

        <div style={{ marginTop: '24px' }}>
          <button onClick={handleSave} className="btn-primary">Save Settings</button>
        </div>
      </div>
    </div>
  )
}

