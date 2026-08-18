function Header({ studentCount }) {
  return (
    <header className="app-header">
      <h1>Student Registration</h1>
      <p>Register and manage your students in one place.</p>
      <span className="count-badge">{studentCount} registered</span>
    </header>
  )
}

export default Header
