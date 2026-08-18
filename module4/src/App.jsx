import { useState } from 'react'
import Header from './components/Header.jsx'
import RegistrationForm from './components/RegistrationForm.jsx'
import StudentList from './components/StudentList.jsx'

function App() {
  const [students, setStudents] = useState([])

  function handleAddStudent(student) {
    setStudents((prev) => [...prev, { ...student, id: crypto.randomUUID() }])
  }

  function handleDeleteStudent(id) {
    setStudents((prev) => prev.filter((student) => student.id !== id))
  }

  return (
    <div className="app">
      <Header studentCount={students.length} />
      <main className="container">
        <RegistrationForm onAddStudent={handleAddStudent} />
        <StudentList students={students} onDelete={handleDeleteStudent} />
      </main>
    </div>
  )
}

export default App