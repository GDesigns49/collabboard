import { useState } from "react";

export default function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ title, description });
    setTitle("");
    setDescription("");
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <input
        className="w-full border p-2 rounded"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="w-full border p-2 rounded"
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="px-4 py-2 bg-indigo-600 text-white rounded">
        Add Task
      </button>
    </form>
  );
}
