import { useState } from 'react'

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(task.title)

  function handleToggle() {
    onToggle(task.id)
  }

  function handleEditSubmit(event) {
    event.preventDefault()
    const trimmedTitle = draft.trim()
    if (trimmedTitle === '') return
    onEdit(task.id, trimmedTitle)
    setIsEditing(false)
  }

  return (
    <li className={`task-item${task.completed ? ' task-item--completed' : ''}`}>
      {isEditing ? (
        <form className="task-item__edit-form" onSubmit={handleEditSubmit}>
          <input
            className="task-form__input task-item__edit-input"
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            autoFocus
            aria-label="Edit task title"
          />
          <div className="task-item__actions">
            <button className="btn btn--primary" type="submit">
              Save
            </button>
            <button
              className="btn btn--secondary"
              type="button"
              onClick={() => {
                setDraft(task.title)
                setIsEditing(false)
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <label className="task-item__toggle">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggle}
              aria-label={`Mark "${task.title}" as ${task.completed ? 'active' : 'completed'}`}
            />
            <span className="task-item__title">{task.title}</span>
          </label>

          <div className="task-item__actions">
            <button
              className="btn btn--primary"
              type="button"
              onClick={() => {
                setDraft(task.title)
                setIsEditing(true)
              }}
            >
              Edit
            </button>
            <button
              className="btn btn--danger"
              type="button"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  )
}

export default TaskItem