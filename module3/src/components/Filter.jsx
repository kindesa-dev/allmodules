function Filter({ departments, selectedDepartment, onDepartmentChange }) {
  return (
    <div className="filter">
      <label className="sr-only" htmlFor="department-filter">
        Filter by department
      </label>
      <select
        id="department-filter"
        value={selectedDepartment}
        onChange={(event) => onDepartmentChange(event.target.value)}
      >
        <option value="">All Departments</option>
        {departments.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;