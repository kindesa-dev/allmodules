import StudentCard from './StudentCard.jsx'

function StudentList({ students, onDelete }) {
  return (
    <section className="student-list">
      <h2>Registered Students</h2>

      {students.length === 0 ? (
        <p className="empty-state">No students registered yet. Use the form above to add your first student.</p>
      ) : (
        <div className="cards-grid">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default StudentList
