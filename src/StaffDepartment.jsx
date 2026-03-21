import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function StaffDepartment() {
  const navigate = useNavigate()

  const initialDepartments = [
    { id: 1, name: 'Mathematics', head: 'John Smith', staffCount: 8, email: 'math@school.com' },
    { id: 2, name: 'Science', head: 'Emily Davis', staffCount: 10, email: 'science@school.com' },
    { id: 3, name: 'English', head: 'Sarah Johnson', staffCount: 6, email: 'english@school.com' },
    { id: 4, name: 'History', head: 'Michael Brown', staffCount: 5, email: 'history@school.com' },
  ]

  const [departments, setDepartments] = useState(initialDepartments)
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newDepartment, setNewDepartment] = useState({})
  const [formError, setFormError] = useState('')

  function handleBack() {
    navigate('/dashboard')
  }

  function handleAddDepartment() {
    setShowAddForm(true)
    setFormError('')
  }

  function handleInputChange(field, value) {
    setNewDepartment(prev => ({ ...prev, [field]: value }))
    setFormError('')
  }

  function saveDepartment() {
    // Validate required fields
    if (!newDepartment.name || !newDepartment.name.trim()) {
      setFormError('Department name is required')
      return
    }

    // Generate unique ID
    const maxId = departments.length > 0 ? Math.max(...departments.map(d => d.id)) : 0
    const dept = {
      id: maxId + 1,
      name: newDepartment.name.trim(),
      head: (newDepartment.head || '').trim(),
      staffCount: Number(newDepartment.staffCount) || 0,
      email: (newDepartment.email || '').trim(),
    }
    
    setDepartments([...departments, dept])
    setShowAddForm(false)
    setNewDepartment({})
    setFormError('')
  }

  function closeForm() {
    setShowAddForm(false)
    setNewDepartment({})
  }

  function viewDepartment(department) {
    setSelectedDepartment(department)
  }

  function closeDetails() {
    setSelectedDepartment(null)
  }

  function removeDepartment(id) {
    const shouldRemove = window.confirm('Are you sure you want to remove this department?')
    if (!shouldRemove) {
      return
    }
    const filtered = departments.filter((d) => d.id !== id)
    setDepartments(filtered)
  }

  return (
    <div className="staff-departments-wrap">
      <header>
        <h1>Staff Departments</h1>
        <div className="header-nav">
          <button onClick={handleBack}>Dashboard</button>
          <button onClick={() => navigate('/teachers')}>Teachers</button>
          <button onClick={() => navigate('/settings')}>Settings</button>
        </div>
      </header>

      <section className="hero-section">
        <h2>Manage Departments</h2>
        <p>Manage department details, view records, and keep staff information up to date.</p>
      </section>

      <div className="staff-toolbar">
        <p>Total Departments: {departments.length}</p>
        <button onClick={handleAddDepartment}>Add New Department</button>
      </div>

      <section className="staff-table-section">
        <h2>Department List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Head</th>
              <th>Staff Count</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept.id}>
                <td>{dept.name}</td>
                <td>{dept.head}</td>
                <td>{dept.staffCount}</td>
                <td>{dept.email}</td>
                <td className="staff-table-actions">
                  <button className="btn-secondary" type="button" onClick={() => viewDepartment(dept)}>
                    View
                  </button>
                  <button className="btn-danger" type="button" onClick={() => removeDepartment(dept.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {departments.length === 0 && (
              <tr>
                <td className="staff-empty-state" colSpan={5}>
                  No departments yet. Add one above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {showAddForm && (
        <div className="modal-overlay" onClick={closeForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Department</h2>
            {formError && (
              <div className="error" id="staff-department-form-error">
                {formError}
              </div>
            )}
            <div className="staff-form">
              <div className="form-field">
                <label htmlFor="department-name">Department Name</label>
                <input
                  id="department-name"
                  type="text"
                  placeholder="Name"
                  value={newDepartment.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  aria-invalid={Boolean(formError)}
                  aria-describedby={formError ? 'staff-department-form-error' : undefined}
                />
              </div>
              <div className="form-field">
                <label htmlFor="department-head">Department Head</label>
                <input
                  id="department-head"
                  type="text"
                  placeholder="Head"
                  value={newDepartment.head || ''}
                  onChange={(e) => handleInputChange('head', e.target.value)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="department-email">Department Email</label>
                <input
                  id="department-email"
                  type="email"
                  placeholder="Email"
                  value={newDepartment.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="department-staff-count">Staff Count</label>
                <input
                  id="department-staff-count"
                  type="number"
                  min="0"
                  placeholder="Staff Count"
                  value={newDepartment.staffCount || ''}
                  onChange={(e) => handleInputChange('staffCount', e.target.value)}
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="button" onClick={saveDepartment}>Save</button>
              <button type="button" className="btn-secondary" onClick={closeForm}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {selectedDepartment && (
        <div className="modal-overlay" onClick={closeDetails}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Department Details</h2>
            <dl className="staff-details-grid">
              <div>
                <dt>Name</dt>
                <dd>{selectedDepartment.name}</dd>
              </div>
              <div>
                <dt>Head</dt>
                <dd>{selectedDepartment.head || '-'}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{selectedDepartment.email || '-'}</dd>
              </div>
              <div>
                <dt>Staff Count</dt>
                <dd>{selectedDepartment.staffCount}</dd>
              </div>
            </dl>
            <button type="button" onClick={closeDetails}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
