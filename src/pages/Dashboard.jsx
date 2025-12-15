import { useState } from 'react'
import { useTaskStore } from '../store/useTaskStore'
import TaskForm from '../components/tasks/TaskForm'
import ThemeToggle from '../components/ThemeToggle'


function Dashboard() {
  const { tasks, deleteTask, toggleComplete } = useTaskStore()

  const [showForm, setShowForm] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  const [search, setSearch] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [sortOrder, setSortOrder] = useState('Newest')

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((task) =>
      priorityFilter === 'All' ? true : task.priority === priorityFilter
    )
    .sort((a, b) => {
      if (sortOrder === 'Newest') {
        return new Date(b.createdAt) - new Date(a.createdAt)
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt)
      }
    })

  const handleEdit = (task) => {
    setSelectedTask(task)
    setShowForm(true)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row p-6 gap-6">
      <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          CollabBoard
        </h1>
        <ThemeToggle />

        <button
          onClick={() => {
            setSelectedTask(null)
            setShowForm(true)
          }}
          className="w-full mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Task
        </button>

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
        />

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="w-full p-2 mb-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
        >
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full p-2 mb-4 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
        >
          <option>Newest</option>
          <option>Oldest</option>
        </select>

        <div>
          {filteredTasks.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">No tasks found.</p>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="p-3 mb-3 bg-gray-100 dark:bg-gray-700 rounded shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {task.priority} Priority
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleComplete(task.id)}
                    className="px-2 py-1 bg-green-600 text-white rounded text-sm"
                  >
                    {task.completed ? 'Undo' : 'Done'}
                  </button>

                  <button
                    onClick={() => handleEdit(task)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="w-full md:w-2/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Task Details / Workspace
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Select a task or create a new one to get started.
        </p>
      </div>

      {showForm && (
        <TaskForm
          editingTask={selectedTask}
          onClose={() => {
            setShowForm(false)
            setSelectedTask(null)
          }}
        />
      )}
    </div>
  )
}

export default Dashboard
