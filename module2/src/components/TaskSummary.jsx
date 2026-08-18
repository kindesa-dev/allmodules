function TaskSummary({ total, active, completed }) {
  return (
    <div className="task-summary">
      <span className="task-summary__item">
        <strong>{total}</strong> total
      </span>
      <span className="task-summary__item">
        <strong>{active}</strong> active
      </span>
      <span className="task-summary__item">
        <strong>{completed}</strong> completed
      </span>
    </div>
  )
}

export default TaskSummary