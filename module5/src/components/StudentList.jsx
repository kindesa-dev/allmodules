import StudentCard from './StudentCard.jsx'

function StudentList({ students, onSelectStudent }) {
  return (
    <div className="cards-grid">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          onSelect={onSelectStudent}
        />
      ))}
    </div>
  )
}

export default StudentList