import { useTaskStore } from "../../store/useTaskStore";

export default function SortTasks() {
  const { sortOrder, setSortOrder } = useTaskStore();

  return (
    <select
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
      className="border p-2 rounded bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 text-sm"
    >
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
      <option value="high">High Priority</option>
      <option value="low">Low Priority</option>
    </select>
  );
}
