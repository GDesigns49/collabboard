import { useState } from "react";
import { useTaskStore } from "../../store/useTaskStore";
import EditTaskModal from "./EditTaskModal";

export default function TaskCard({ task }) {
  const { deleteTask, toggleTask } = useTaskStore();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-start">
          <div>
            <h3
              className={`text-lg font-semibold ${
                task.completed
                  ? "line-through text-gray-400 dark:text-gray-500"
                  : "text-gray-800 dark:text-gray-100"
              }`}
            >
              {task.title}
            </h3>

            <p
              className={`text-sm mt-2 ${
                task.completed
                  ? "line-through text-gray-400 dark:text-gray-500"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {task.description}
            </p>
          </div>

          <span
            className={`px-2 py-1 text-xs rounded capitalize ${
              task.priority === "high"
                ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                : task.priority === "medium"
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
                : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
            }`}
          >
            {task.priority}
          </span>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => toggleTask(task.id)}
            className="px-3 py-1 rounded bg-blue-600 text-white text-sm dark:bg-blue-700"
          >
            {task.completed ? "Undo" : "Complete"}
          </button>

          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 rounded bg-yellow-500 text-white text-sm dark:bg-yellow-600"
          >
            Edit
          </button>

          <button
            onClick={() => deleteTask(task.id)}
            className="px-3 py-1 rounded bg-red-600 text-white text-sm dark:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      {isEditing && (
        <EditTaskModal task={task} onClose={() => setIsEditing(false)} />
      )}
    </>
  );
}
