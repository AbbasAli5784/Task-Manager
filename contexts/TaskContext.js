import React, { createContext, useReducer, useEffect } from "react";
import { taskReducer } from "../reducers/taskReducer";
import { loadTasks, saveTasks } from "../utils/storage";

// Starting with an empty list of tasks
const initialState = [];

// Create the context so other components can access tasks and dispatch actions
export const TaskContext = createContext();

// This wraps around the whole app and provides the global task state
export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, initialState);

  // Load saved tasks from AsyncStorage when the app starts
  useEffect(() => {
    async function fetchTasks() {
      const saved = await loadTasks();
      if (saved) dispatch({ type: "SET_TASKS", payload: saved });
    }
    fetchTasks();
  }, []);

  // Save tasks to AsyncStorage whenever they change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  return (
    // Make the task list and dispatch function available to any component
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
