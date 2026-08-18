function StudentCard({ student, onDelete }) {
  const { id, fullName, studentId, email, phone, department, year, gender } = student

  return (
    <article className="student-card">
      <div className="card-header">
        <h3>{fullName}</h3>
        <span className="badge">{year}</span>
      </div>
      <dl className="card-details">
        <div className="detail">
          <dt>Student ID</dt>
          <dd>{studentId}</dd>
        </div>
        <div className="detail">
          <dt>Email</dt>
          <dd>{email}</dd>
        </div>
        <div className="detail">
          <dt>Phone</dt>
          <dd>{phone}</dd>
        </div>
        <div className="detail">
          <dt>Department</dt>
          <dd>{department}</dd>
        </div>
        <div className="detail">
          <dt>Gender</dt>
          <dd>{gender}</dd>
        </div>
      </dl>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </article>
  )
}

export default StudentCard
