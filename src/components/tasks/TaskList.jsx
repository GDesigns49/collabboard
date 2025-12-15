import { useTaskStore } from "../../store/useTaskStore";
import TaskCard from "./TaskCard";

export default function TaskList({ search }) {
  const { tasks, priorityFilter, sortOrder } = useTaskStore();

  const filtered = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "newest") return b.id - a.id;
    if (sortOrder === "oldest") return a.id - b.id;
    if (sortOrder === "high") {
      const order = { high: 1, medium: 2, low: 3 };
      return order[a.priority] - order[b.priority];
    }
    if (sortOrder === "low") {
      const order = { low: 1, medium: 2, high: 3 };
      return order[a.priority] - order[b.priority];
    }
    return 0;
  });

  return (
    <div className="grid gap-4 mt-4">
      {sorted.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No tasks found.</p>
      ) : (
        sorted.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  );
}