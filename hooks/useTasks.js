import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";

// This custom hook makes it easier to access the task context
// Instead of importing useContext and TaskContext everywhere,
// we can just call useTasks() to get { tasks, dispatch }
export default function useTasks() {
  return useContext(TaskContext);
}
