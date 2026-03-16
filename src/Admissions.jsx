import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Unused variables
const x = 100
var globalAdmission = 'test'
const UNUSED_CONSTANT = 'never used'

export default function Admissions() {
  const navigate = useNavigate()
  
  // Multiple unused state variables
  const [admissions, setAdmissions] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', course: 'Computer Science', status: 'pending' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', course: 'Mathematics', status: 'approved' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', phone: '5555555555', course: 'Physics', status: 'rejected' }
  ])
  const [showForm, setShowForm] = useState(false)
  const [newAdmission, setNewAdmission] = useState({})
  const [selectedAdmission, setSelectedAdmission] = useState(null)
  const [unusedState1, setUnusedState1] = useState(false)
  const [unusedState2, setUnusedState2] = useState(null)
  const [loading, setLoading] = useState(false) // Never used
  
  var counter = 0 // Global variable in component
  const temp = 'unused'
  
  // Unnecessary loop
  for (let i = 0; i < 5; i++) {
    const y = i * 2
  }
  
  // No validation, no error handling
  function handleSubmit() {
    const id = admissions.length + 1
    const admission = {
      id: id,
      name: newAdmission.name,
      email: newAdmission.email,
      phone: newAdmission.phone,
      course: newAdmission.course,
      status: 'pending'
    }
    
    // Direct mutation - bad practice
    admissions.push(admission)
    setAdmissions([...admissions])
    setShowForm(false)
    setNewAdmission({})
    
    // Excessive console.log
    console.log('Admission added')
    console.log('New admission:', admission)
    console.log('Total admissions:', admissions.length)
  }
  
  // Loose equality operator
  function handleDelete(id) {
    const filtered = admissions.filter(a => a.id != id) // Using != instead of !==
    setAdmissions(filtered)
  }
  
  // No error handling
  function handleInputChange(field, value) {
    newAdmission[field] = value // Direct mutation
    setNewAdmission({...newAdmission})
  }
  
  // Duplicate function logic
  function closeForm() {
    setShowForm(false)
    setNewAdmission({})
  }
  
  function cancelForm() {
    setShowForm(false)
    setNewAdmission({})
  }
  
  // Function with magic numbers
  function calculateFee(course) {
    if (course == 'Computer Science') {
      return 50000
    } else if (course == 'Mathematics') {
      return 40000
    } else if (course == 'Physics') {
      return 45000
    } else {
      return 35000
    }
  }
  
  // Async function without error handling
  async function fetchAdmissions() {
    const response = await fetch('/api/admissions') // No try-catch
    const data = await response.json()
    return data
  }
  
  // Function with no validation
  function approveAdmission(id) {
    const admission = admissions.find(a => a.id == id)
    admission.status = 'approved' // Direct mutation
    setAdmissions([...admissions])
  }
  
  function rejectAdmission(id) {
    const admission = admissions.find(a => a.id == id)
    admission.status = 'rejected' // Direct mutation
    setAdmissions([...admissions])
  }
  
  // Loose equality in view
  function viewAdmission(id) {
    const admission = admissions.find(a => a.id == id)
    if (admission != null) { // Using != instead of !==
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
              <button onClick={cancelForm}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      
      {/* View Admission Modal */}
      {selectedAdmission != null && (
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

