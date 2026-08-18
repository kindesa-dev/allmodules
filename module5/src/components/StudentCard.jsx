function StudentCard({ student, onSelect }) {
  const { fullName, studentId, department, year, email, phone, avatar } = student

  return (
    <article className="student-card">
      <div className="card-top">
        <img
          src={avatar}
          alt={`Profile picture of ${fullName}`}
          className="avatar"
        />
        <div className="card-heading">
          <h3>{fullName}</h3>
          <p className="student-id">{studentId}</p>
        </div>
      </div>
      <dl className="card-details">
        <div className="detail">
          <dt>Department</dt>
          <dd>{department}</dd>
        </div>
        <div className="detail">
          <dt>Year</dt>
          <dd>{year}</dd>
        </div>
        <div className="detail">
          <dt>Email</dt>
          <dd>{email}</dd>
        </div>
        <div className="detail">
          <dt>Phone</dt>
          <dd>{phone}</dd>
        </div>
      </dl>
      <button
        type="button"
        className="btn btn-outline"
        onClick={() => onSelect(student)}
      >
        View Details
      </button>
    </article>
  )
}

export default StudentCard