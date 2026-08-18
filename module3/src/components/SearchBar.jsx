function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="search-bar">
      <label className="sr-only" htmlFor="student-search">
        Search students
      </label>
      <span className="search-icon" aria-hidden="true">
        &#128269;
      </span>
      <input
        id="student-search"
        type="search"
        placeholder="Search by name or student ID..."
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;