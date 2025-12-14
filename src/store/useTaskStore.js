import { create } from "zustand";

export const useTaskStore = create((set) => ({
  tasks: [],

  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { id: crypto.randomUUID(), completed: false, ...task },
      ],
    })),

  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),
}));
