import React, { createContext, useReducer, useEffect } from "react";
import { taskReducer } from "../reducers/taskReducer";
import { loadTasks, saveTasks } from "../utils/storage";

const initialState = [];

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    async function fetchTasks() {
      const saved = await loadTasks();
      if (saved) dispatch({ type: "SET_TASKS", payload: saved });
    }
    fetchTasks();
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
