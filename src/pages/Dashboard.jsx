import { useState } from "react";
import TaskList from "../components/tasks/TaskList";
import PriorityFilter from "../components/tasks/PriorityFilter";
import SortTasks from "../components/tasks/SortTasks";
import ThemeToggle from "../components/ThemeToggle";

export default function Dashboard() {
  const [search, setSearch] = useState("");

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          CollabBoard
        </h1>
        <ThemeToggle />
      </div>

      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search tasks"
          className="border p-3 rounded w-full text-sm bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <PriorityFilter />
        <SortTasks />
      </div>

      <TaskList search={search} />
    </div>
  );
}
