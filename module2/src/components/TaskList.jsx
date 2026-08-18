import TaskItem from './TaskItem.jsx'

function TaskList({ tasks, filter, onToggle, onEdit, onDelete }) {
  if (tasks.length === 0) {
    const message =
      filter === 'all'
        ? 'No tasks yet. Add your first task above!'
        : filter === 'active'
          ? 'No active tasks. Great job — everything is done!'
          : 'No completed tasks yet.'

    return <p className="empty-state">{message}</p>
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TaskList