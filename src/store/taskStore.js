import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTaskStore = create(
  persist(
    (set) => ({
      tasks: [],
      priorityFilter: "all",

      setPriorityFilter: (value) =>
        set(() => ({
          priorityFilter: value,
        })),

      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),

      editTask: (updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === updatedTask.id ? { ...task, ...updatedTask } : task
          ),
        })),
    }),
    {
      name: "task-storage",
    }
  )
);
