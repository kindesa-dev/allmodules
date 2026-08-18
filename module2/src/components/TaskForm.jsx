import { useState } from 'react'

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedTitle = title.trim()
    if (trimmedTitle === '') return
    onAddTask(trimmedTitle)
    setTitle('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="task-form__input"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="What needs to be done?"
        aria-label="New task title"
      />
      <button className="task-form__submit" type="submit" disabled={title.trim() === ''}>
        Add Task
      </button>
    </form>
  )
}

export default TaskForm