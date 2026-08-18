import StudentCard from './StudentCard.jsx';
import EmptyState from './EmptyState.jsx';

function StudentList({ students, onReset }) {
  if (students.length === 0) {
    return <EmptyState onReset={onReset} />;
  }

  return (
    <section className="student-list">
      <div className="student-list__header">
        <h2>Students</h2>
        <span className="student-list__count">
          {students.length} {students.length === 1 ? 'student' : 'students'}
        </span>
      </div>
      <ul className="student-list__grid">
        {students.map((student) => (
          <li key={student.id}>
            <StudentCard student={student} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default StudentList;