const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

function TaskFilter({ activeFilter, onFilterChange }) {
  return (
    <div className="task-filter" role="group" aria-label="Filter tasks">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          className={`task-filter__btn${activeFilter === filter.value ? ' task-filter__btn--active' : ''}`}
          type="button"
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}

export default TaskFilter