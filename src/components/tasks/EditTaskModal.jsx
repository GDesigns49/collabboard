import { useState } from "react";
import { useTaskStore } from "../../store/useTaskStore";

export default function EditTaskModal({ task, onClose }) {
  const { editTask } = useTaskStore();

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState(task?.priority || "low");

  const handleSave = () => {
    editTask({
      id: task.id,
      title,
      description,
      priority,
    });
    onClose();
  };

  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md space-y-4 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Edit Task
        </h2>

        <input
          type="text"
          className="border p-2 rounded w-full text-sm bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 rounded w-full text-sm bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full text-sm bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded text-sm dark:text-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded text-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
