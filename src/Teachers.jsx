import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// unused variable
const x = 10
var globalVar = 'test'
const DEBUG = true

// No error handling, messy code for CodeRabbit testing
export default function Teachers() {
  const navigate = useNavigate()
  
  // Hardcoded data - no validation
  const teachersData = [
    { id: 1, name: 'John Smith', subject: 'Math', email: 'john@school.com', phone: '123-456-7890', experience: 5 },
    { id: 2, name: 'Sarah Johnson', subject: 'English', email: 'sarah@school.com', phone: '123-456-7891', experience: 8 },
    { id: 3, name: 'Mike Brown', subject: 'Science', email: 'mike@school.com', phone: '123-456-7892', experience: 3 },
    { id: 4, name: 'Emily Davis', subject: 'History', email: 'emily@school.com', phone: '123-456-7893', experience: 10 },
    { id: 5, name: 'David Wilson', subject: 'Math', email: 'david@school.com', phone: '123-456-7894', experience: 7 },
  ]

  const [teachers, setTeachers] = useState(teachersData)
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTeacher, setNewTeacher] = useState({})
  const [unusedState, setUnusedState] = useState(0)
  const [anotherUnused, setAnotherUnused] = useState('')
  
  // Unused variable
  const temp = 'unused'
  var count = 0
  
  // No error handling
  function handleAddTeacher() {
    setShowAddForm(true)
    console.log('add teacher')
    console.log('debug')
    console.log('debug2')
  }

  // No validation, no error handling
  function saveTeacher() {
    const id = teachers.length + 1
    const teacher = {
      id: id,
      name: newTeacher.name,
      subject: newTeacher.subject,
      email: newTeacher.email,
      phone: newTeacher.phone,
      experience: newTeacher.experience
    }
    teachers.push(teacher) // Direct mutation - bad practice
    setTeachers([...teachers])
    setShowAddForm(false)
    setNewTeacher({})
  }

  // No error handling for delete
  function deleteTeacher(id) {
    const filtered = teachers.filter(t => t.id != id) // Using != instead of !==
    setTeachers(filtered)
  }

  // Messy function with no error handling
  function viewTeacher(teacher) {
    setSelectedTeacher(teacher)
    console.log(teacher)
  }

  // Duplicate code - bad practice
  function closeModal() {
    setSelectedTeacher(null)
  }

  function closeForm() {
    setShowAddForm(false)
    setNewTeacher({})
  }

  // No validation on input
  function handleInputChange(field, value) {
    newTeacher[field] = value // Direct mutation
    setNewTeacher({...newTeacher})
  }

  // Unnecessary loop
  for (let i = 0; i < 10; i++) {
    const y = i * 2
  }

  // Wrong comparison
  if (DEBUG == true) {
    console.log('Teachers page loaded')
  }

  return (
    <div className="teachers-wrap">
      <header>
        <h1>Teachers List</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button onClick={() => navigate('/settings')}>Settings</button>
        </div>
      </header>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleAddTeacher}>Add New Teacher</button>
      </div>

      {/* No error boundary */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Experience</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.id}</td>
              <td>{teacher.name}</td>
              <td>{teacher.subject}</td>
              <td>{teacher.email}</td>
              <td>{teacher.phone}</td>
              <td>{teacher.experience} years</td>
              <td>
                <button onClick={() => viewTeacher(teacher)}>View</button>
                <button onClick={() => deleteTeacher(teacher.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add form - no validation */}
      {showAddForm && (
        <div className="modal-overlay" onClick={closeForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Teacher</h2>
            <input 
              type="text" 
              placeholder="Name" 
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Subject" 
              onChange={(e) => handleInputChange('subject', e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Email" 
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Phone" 
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
            <input 
              type="number" 
              placeholder="Experience (years)" 
              onChange={(e) => handleInputChange('experience', e.target.value)}
            />
            <div style={{ marginTop: '16px' }}>
              <button onClick={saveTeacher}>Save</button>
              <button onClick={closeForm}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* View modal - no error handling */}
      {selectedTeacher != null && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Teacher Details</h2>
            <p><strong>Name:</strong> {selectedTeacher.name}</p>
            <p><strong>Subject:</strong> {selectedTeacher.subject}</p>
            <p><strong>Email:</strong> {selectedTeacher.email}</p>
            <p><strong>Phone:</strong> {selectedTeacher.phone}</p>
            <p><strong>Experience:</strong> {selectedTeacher.experience} years</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

