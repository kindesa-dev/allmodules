import { useEffect, useMemo, useState } from 'react'
import { getStudents } from '../services/studentApi.js'
import SearchBar from './SearchBar.jsx'
import StudentList from './StudentList.jsx'
import Loading from './Loading.jsx'
import ErrorMessage from './ErrorMessage.jsx'
import EmptyState from './EmptyState.jsx'

function Dashboard() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function loadStudents() {
      setLoading(true)
      setError(null)

      try {
        const data = await getStudents()
        if (!cancelled) {
          setStudents(data)
          setSelectedStudent(null)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadStudents()

    return () => {
      cancelled = true
    }
  }, [reloadKey])

  const filteredStudents = useMemo(() => {
    const term = search.trim().toLowerCase()

    if (term === '') {
      return students
    }

    return students.filter((student) => {
      return (
        student.fullName.toLowerCase().includes(term) ||
        student.studentId.toLowerCase().includes(term) ||
        student.department.toLowerCase().includes(term)
      )
    })
  }, [students, search])

  function handleRefresh() {
    setReloadKey((key) => key + 1)
  }

  function handleCloseDetails() {
    setSelectedStudent(null)
  }

  let content

  if (loading) {
    content = <Loading />
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={handleRefresh} />
  } else if (students.length === 0) {
    content = <EmptyState message="No students found." />
  } else if (filteredStudents.length === 0) {
    content = (
      <EmptyState message="No students match your search. Try a different name, ID, or department." />
    )
  } else {
    content = <StudentList students={filteredStudents} onSelectStudent={setSelectedStudent} />
  }

  return (
    <section className="dashboard">
      {students.length > 0 && !error && (
        <div className="toolbar">
          <SearchBar
            value={search}
            onChange={setSearch}
            resultCount={filteredStudents.length}
            totalCount={students.length}
          />
          <div className="toolbar-actions">
            <span className="status-pill">Data loaded from API</span>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleRefresh}
              disabled={loading}
            >
              Refresh Data
            </button>
          </div>
        </div>
      )}

      {content}

      {selectedStudent && (
        <div
          className="modal-overlay"
          onClick={handleCloseDetails}
          role="presentation"
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Student details"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={handleCloseDetails}
              aria-label="Close details"
            >
              &times;
            </button>
            <div className="modal-top">
              <img
                src={selectedStudent.avatar}
                alt={`Profile picture of ${selectedStudent.fullName}`}
                className="avatar avatar-large"
              />
              <h2>{selectedStudent.fullName}</h2>
              <p className="student-id">{selectedStudent.studentId}</p>
            </div>
            <dl className="card-details">
              <div className="detail">
                <dt>Department</dt>
                <dd>{selectedStudent.department}</dd>
              </div>
              <div className="detail">
                <dt>Year</dt>
                <dd>{selectedStudent.year}</dd>
              </div>
              <div className="detail">
                <dt>Email</dt>
                <dd>{selectedStudent.email}</dd>
              </div>
              <div className="detail">
                <dt>Phone</dt>
                <dd>{selectedStudent.phone}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </section>
  )
}

export default Dashboard