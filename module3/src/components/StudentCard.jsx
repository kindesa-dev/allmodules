function StudentCard({ student }) {
  return (
    <article className="student-card">
      <img
        className="student-card__avatar"
        src={student.avatar}
        alt={`Profile picture of ${student.fullName}`}
      />
      <div className="student-card__body">
        <h3 className="student-card__name">{student.fullName}</h3>
        <p className="student-card__id">{student.studentId}</p>
        <div className="student-card__tags">
          <span className="tag tag--department">{student.department}</span>
          <span className="tag tag--year">{student.year}</span>
        </div>
        <p className="student-card__detail">
          <span aria-hidden="true">&#9993;</span> {student.email}
        </p>
        <p className="student-card__detail">
          <span aria-hidden="true">&#9742;</span> {student.phone}
        </p>
      </div>
    </article>
  );
}

export default StudentCard;