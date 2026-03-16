import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Course fee constants
const COURSE_FEES = {
  'Computer Science': 50000,
  'Mathematics': 40000,
  'Physics': 45000,
  'Chemistry': 35000,
  'default': 35000
}

export default function Admissions() {
  const navigate = useNavigate()
  
  const [admissions, setAdmissions] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', course: 'Computer Science', status: 'pending' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', course: 'Mathematics', status: 'approved' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', phone: '5555555555', course: 'Physics', status: 'rejected' }
  ])
  const [showForm, setShowForm] = useState(false)
  const [newAdmission, setNewAdmission] = useState({})
  const [selectedAdmission, setSelectedAdmission] = useState(null)
  
  function handleSubmit() {
    // Validate required fields
    if (!newAdmission.name || !newAdmission.email || !newAdmission.phone || !newAdmission.course) {
      alert('Please fill in all required fields')
      return
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newAdmission.email)) {
      alert('Please enter a valid email address')
      return
    }
    
    // Validate phone format (10 digits)
    const phoneRegex = /^\d{10}$/
    if (!phoneRegex.test(newAdmission.phone)) {
      alert('Please enter a valid 10-digit phone number')
      return
    }
    
    const id = admissions.length + 1
    const admission = {
      id,
      name: newAdmission.name,
      email: newAdmission.email,
      phone: newAdmission.phone,
      course: newAdmission.course,
      status: 'pending'
    }
    
    // Proper state update without mutation
    setAdmissions([...admissions, admission])
    setShowForm(false)
    setNewAdmission({})
  }
  
  function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this admission?')) {
      return
    }
    const filtered = admissions.filter(a => a.id !== id)
    setAdmissions(filtered)
  }
  
  function handleInputChange(field, value) {
    setNewAdmission({ ...newAdmission, [field]: value })
  }
  
  function closeForm() {
    setShowForm(false)
    setNewAdmission({})
  }
  
  function calculateFee(course) {
    return COURSE_FEES[course] || COURSE_FEES.default
  }
  
  function approveAdmission(id) {
    const admission = admissions.find(a => a.id === id)
    if (!admission) {
      alert('Admission not found')
      return
    }
    
    const updatedAdmissions = admissions.map(a =>
      a.id === id ? { ...a, status: 'approved' } : a
    )
    setAdmissions(updatedAdmissions)
  }
  
  function rejectAdmission(id) {
    const admission = admissions.find(a => a.id === id)
    if (!admission) {
      alert('Admission not found')
      return
    }
    
    const updatedAdmissions = admissions.map(a =>
      a.id === id ? { ...a, status: 'rejected' } : a
    )
    setAdmissions(updatedAdmissions)
  }
  
  function viewAdmission(id) {
    const admission = admissions.find(a => a.id === id)
    if (admission !== null && admission !== undefined) {
      setSelectedAdmission(admission)
    }
  }
  
  return (
    <div className="admissions-wrap">
      <header>
        <h1>Admissions Management</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button onClick={() => navigate('/teachers')}>Teachers</button>
          <button onClick={() => navigate('/settings')}>Settings</button>
        </div>
      </header>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setShowForm(true)}>Open Admission Form</button>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Course</th>
            <th>Status</th>
            <th>Fee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admissions.map(admission => (
            <tr key={admission.id}>
              <td>{admission.id}</td>
              <td>{admission.name}</td>
              <td>{admission.email}</td>
              <td>{admission.phone}</td>
              <td>{admission.course}</td>
              <td>{admission.status}</td>
              <td>${calculateFee(admission.course)}</td>
              <td>
                <button onClick={() => viewAdmission(admission.id)}>View</button>
                <button onClick={() => approveAdmission(admission.id)}>Approve</button>
                <button onClick={() => rejectAdmission(admission.id)}>Reject</button>
                <button onClick={() => handleDelete(admission.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Admission Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={closeForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>New Admission</h2>
            <input
              type="text"
              placeholder="Name"
              value={newAdmission.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={newAdmission.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone"
              value={newAdmission.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
            <select
              value={newAdmission.course || ''}
              onChange={(e) => handleInputChange('course', e.target.value)}
            >
              <option value="">Select Course</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
            </select>
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <button onClick={handleSubmit}>Submit</button>
              <button onClick={closeForm}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      
      {/* View Admission Modal */}
      {selectedAdmission !== null && (
        <div className="modal-overlay" onClick={() => setSelectedAdmission(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Admission Details</h2>
            <p><strong>ID:</strong> {selectedAdmission.id}</p>
            <p><strong>Name:</strong> {selectedAdmission.name}</p>
            <p><strong>Email:</strong> {selectedAdmission.email}</p>
            <p><strong>Phone:</strong> {selectedAdmission.phone}</p>
            <p><strong>Course:</strong> {selectedAdmission.course}</p>
            <p><strong>Status:</strong> {selectedAdmission.status}</p>
            <p><strong>Fee:</strong> ${calculateFee(selectedAdmission.course)}</p>
            <button onClick={() => setSelectedAdmission(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
