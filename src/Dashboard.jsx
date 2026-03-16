import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const studentData = [
  { id: 1, name: 'Alex Johnson', email: 'alex@school.com', course: 'Math', grade: 'A', imageUrl: 'https://i.pravatar.cc/80?u=1' },
  { id: 2, name: 'Sam Williams', email: 'sam@school.com', course: 'Science', grade: 'B', imageUrl: 'https://i.pravatar.cc/80?u=2' },
  { id: 3, name: 'Jordan Lee', email: 'jordan@school.com', course: 'English', grade: 'A', imageUrl: 'https://i.pravatar.cc/80?u=3' },
  { id: 4, name: 'Casey Brown', email: 'casey@school.com', course: 'History', grade: 'B', imageUrl: 'https://i.pravatar.cc/80?u=4' },
  { id: 5, name: 'Riley Davis', email: 'riley@school.com', course: 'Math', grade: 'C', imageUrl: 'https://i.pravatar.cc/80?u=5' },
  { id: 6, name: 'Morgan Miller', email: 'morgan@school.com', course: 'Science', grade: 'A', imageUrl: 'https://i.pravatar.cc/80?u=6' },
]

export default function Dashboard({ onLogout }) {
  const navigate = useNavigate()
  const [tableData, setTableData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', grade: 'A' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', grade: 'B' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'User', grade: 'A' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', grade: 'B' },
    { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'User', grade: 'C' },
    { id: 6, name: 'Eva Miller', email: 'eva@example.com', role: 'Admin', grade: 'A' },
    { id: 7, name: 'Frank Lee', email: 'frank@example.com', role: 'User', grade: 'B' },
  ])

  const [showStudentList, setShowStudentList] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [editingRow, setEditingRow] = useState(null)
  const studentCount = studentData.length
  const studentsCopy = [...studentData] // Unused - for CodeRabbit test
  const [loading, setLoading] = useState(false) // Unused state
  var globalCounter = 0 // Global variable in component
  const PAGE_SIZE = 10 // Magic number in component

  function handleShowList() {
    console.log('Student list opened')
    setShowStudentList(!showStudentList)
  }

  function openPopup(student) {
    console.log('Popup for', student.name)
    setSelectedStudent(student)
  }

  function closePopup() {
    setSelectedStudent(null)
  }

  function toggleEditMode() {
    setEditMode(!editMode)
    setEditingRow(null)
  }

  function handleEdit(row) {
    setEditingRow({ ...row })
  }

  function handleSave() {
    if (editingRow) {
      setTableData(tableData.map(row => 
        row.id === editingRow.id ? editingRow : row
      ))
      setEditingRow(null)
    }
  }

  function handleCancel() {
    setEditingRow(null)
  }

  function handleInputChange(field, value) {
    setEditingRow({ ...editingRow, [field]: value })
  }

  return (
    <div className="dashboard-wrap">
      <header>
        <h1>Dashboard</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => navigate('/admissions')}>Admissions</button>
          <button onClick={() => navigate('/teachers')}>Teachers</button>
          <button onClick={() => navigate('/staff-departments')}>Staff Departments</button>
          <button onClick={() => navigate('/settings')}>Settings</button>
          <button onClick={onLogout}>Logout</button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="hero-section">
        <h2>Welcome to Your Dashboard</h2>
        <p>Manage your students, view grades, and track performance all in one place.</p>
        <div className="hero-stats">
          <div className="stat-card">
            <h3>{tableData.length}</h3>
            <p>Total Students</p>
          </div>
          <div className="stat-card">
            <h3>{tableData.filter(s => s.grade === 'A').length}</h3>
            <p>A Grade Students</p>
          </div>
          <div className="stat-card">
            <h3>{studentCount}</h3>
            <p>Enrolled Students</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
        <button onClick={toggleEditMode}>
          {editMode ? 'Exit Edit Mode' : 'Enable Edit Mode'}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Grade</th>
            {editMode && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                {editingRow?.id === row.id ? (
                  <input 
                    value={editingRow.name} 
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                ) : row.name}
              </td>
              <td>
                {editingRow?.id === row.id ? (
                  <input 
                    value={editingRow.email} 
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                ) : row.email}
              </td>
              <td>
                {editingRow?.id === row.id ? (
                  <input 
                    value={editingRow.role} 
                    onChange={(e) => handleInputChange('role', e.target.value)}
                  />
                ) : row.role}
              </td>
              <td>
                {editingRow?.id === row.id ? (
                  <select 
                    value={editingRow.grade} 
                    onChange={(e) => handleInputChange('grade', e.target.value)}
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="F">F</option>
                  </select>
                ) : row.grade}
              </td>
              {editMode && (
                <td>
                  {editingRow?.id === row.id ? (
                    <>
                      <button onClick={handleSave}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleEdit(row)}>Edit</button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '24px' }}>
        <button className="btn-student-list" onClick={handleShowList}>
          Student List
        </button>
      </div>

      {showStudentList && (
        <div className="student-list-wrap" style={{ marginTop: '16px' }}>
          <h2>Students</h2>
          {studentData.map((student, idx) => (
            <div key={idx} className="student-row">
              <img src={student.imageUrl} width="48" height="48" alt="" />
              <span>{student.name}</span>
              <span>{student.email}</span>
              <button onClick={() => openPopup(student)}>View</button>
            </div>
          ))}
        </div>
      )}

      {selectedStudent != null && selectedStudent !== undefined && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()} style={{ padding: '20px' }}>
            <img src={selectedStudent.imageUrl} width="80" height="80" alt="" />
            <p><strong>{selectedStudent.name}</strong></p>
            <p>{selectedStudent.email}</p>
            <p>Course: {selectedStudent.course}</p>
            <p>Grade: {selectedStudent.grade}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
