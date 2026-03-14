import { useState } from 'react'

const studentData = [
  { id: 1, name: 'Alex Johnson', email: 'alex@school.com', course: 'Math', grade: 'A', imageUrl: 'https://i.pravatar.cc/80?u=1' },
  { id: 2, name: 'Sam Williams', email: 'sam@school.com', course: 'Science', grade: 'B', imageUrl: 'https://i.pravatar.cc/80?u=2' },
  { id: 3, name: 'Jordan Lee', email: 'jordan@school.com', course: 'English', grade: 'A', imageUrl: 'https://i.pravatar.cc/80?u=3' },
  { id: 4, name: 'Casey Brown', email: 'casey@school.com', course: 'History', grade: 'B', imageUrl: 'https://i.pravatar.cc/80?u=4' },
  { id: 5, name: 'Riley Davis', email: 'riley@school.com', course: 'Math', grade: 'C', imageUrl: 'https://i.pravatar.cc/80?u=5' },
  { id: 6, name: 'Morgan Miller', email: 'morgan@school.com', course: 'Science', grade: 'A', imageUrl: 'https://i.pravatar.cc/80?u=6' },
]

export default function Dashboard({ onLogout }) {
  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'User' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor' },
    { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'User' },
    { id: 6, name: 'Eva Miller', email: 'eva@example.com', role: 'Admin' },
    { id: 7, name: 'Frank Lee', email: 'frank@example.com', role: 'User' },
  ]

  const [showStudentList, setShowStudentList] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const studentCount = studentData.length
  const studentsCopy = [...studentData]

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

  return (
    <div className="dashboard-wrap">
      <header>
        <h1>Dashboard</h1>
        <button onClick={onLogout}>Logout</button>
      </header>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.role}</td>
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

      {selectedStudent != null && (
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
