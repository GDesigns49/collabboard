import { useState } from 'react'
import { useTaskStore } from '../store/useTaskStore'
import TaskForm from '../components/tasks/TaskForm'
import ThemeToggle from '../components/ThemeToggle'

function Dashboard() {
  const { tasks, deleteTask, toggleComplete, clearTasks } = useTaskStore()

  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [taskToDelete, setTaskToDelete] = useState(null)

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

  return (
    <div className="min-h-screen flex flex-col md:flex-row p-6 gap-6">

      <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">CollabBoard</h1>

        <ThemeToggle />

        <button
          onClick={() => {
            setEditingTask(null)
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
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{task.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{task.priority} Priority</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleComplete(task.id)}
                    className="px-2 py-1 bg-green-600 text-white rounded text-sm"
                  >
                    {task.completed ? 'Undo' : 'Done'}
                  </button>

                  <button
                    onClick={() => {
                      setEditingTask(task)
                      setShowForm(true)
                    }}
                    className="px-2 py-1 bg-yellow-500 text-white rounded text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setTaskToDelete(task)}
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

      <div className="w-full md:w-2/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow overflow-y-auto">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">All Tasks</h2>

          <button
            onClick={clearTasks}
            className="px-3 py-1 bg-gray-300 dark:bg-gray-700 dark:text-white rounded"
          >
            Clear
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">No tasks added yet.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 mb-4 bg-gray-100 dark:bg-gray-700 rounded shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {task.title}
              </h3>

              <p className="text-gray-700 dark:text-gray-300">{task.description}</p>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Priority: {task.priority} | Status: {task.completed ? 'Completed' : 'Pending'}
              </p>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <TaskForm
          editingTask={editingTask}
          onClose={() => {
            setShowForm(false)
            setEditingTask(null)
          }}
        />
      )}

      {taskToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-80">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Confirm Delete</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Delete "{taskToDelete.title}"?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  deleteTask(taskToDelete.id)
                  setTaskToDelete(null)
                }}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Yes
              </button>

              <button
                onClick={() => setTaskToDelete(null)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Dashboard
