import { useState } from 'react'
import Header from './components/Header.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskFilter from './components/TaskFilter.jsx'
import TaskSummary from './components/TaskSummary.jsx'
import TaskList from './components/TaskList.jsx'

let nextId = 1

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')

  function addTask(title) {
    setTasks((current) => [
      ...current,
      { id: nextId++, title, completed: false },
    ])
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function editTask(id, title) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, title } : task)),
    )
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  const completedCount = tasks.filter((task) => task.completed).length
  const activeCount = tasks.length - completedCount

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <div className="app">
      <Header />

      <main className="app__content">
        <TaskForm onAddTask={addTask} />

        <TaskSummary total={tasks.length} active={activeCount} completed={completedCount} />

        <TaskFilter activeFilter={filter} onFilterChange={setFilter} />

        <TaskList
          tasks={visibleTasks}
          filter={filter}
          onToggle={toggleTask}
          onEdit={editTask}
          onDelete={deleteTask}
        />
      </main>
    </div>
  )
}

export default App