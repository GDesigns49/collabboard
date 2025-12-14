import { useTaskStore } from "../../store/useTaskStore";

export default function PriorityFilter() {
  const { priorityFilter, setPriorityFilter } = useTaskStore();

  return (
    <select
      value={priorityFilter}
      onChange={(e) => setPriorityFilter(e.target.value)}
      className="border p-2 rounded bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 text-sm"
    >
      <option value="all">All Priorities</option>
      <option value="high">High Priority</option>
      <option value="medium">Medium Priority</option>
      <option value="low">Low Priority</option>
    </select>
  );
}
