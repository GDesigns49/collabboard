import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'

export const useTaskStore = create(
  persist(
    (set) => ({
      tasks: [],

      addTask: (taskData) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: nanoid(),
              ...taskData,
            },
          ],
        })),

      updateTask: (id, updatedData) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updatedData } : task
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      toggleComplete: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),
    }),
    {
      name: 'collabboard-tasks',
    }
  )
)
