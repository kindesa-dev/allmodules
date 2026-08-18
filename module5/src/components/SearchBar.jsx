function SearchBar({ value, onChange, resultCount, totalCount }) {
  return (
    <div className="search-bar">
      <div className="search-field">
        <input
          type="search"
          className="input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search by name, student ID, or department..."
          aria-label="Search students"
        />
      </div>
      <p className="result-count">
        Showing {resultCount} of {totalCount} students
      </p>
    </div>
  )
}

export default SearchBar