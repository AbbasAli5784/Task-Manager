import { TaskProvider } from "./contexts/TaskContext"; // Provides global task state
import TaskList from "./screens/TaskList"; // Main screen that shows the task UI

// App entry point
export default function App() {
  return (
    // Wrap the app in the TaskProvider so all components can access task state
    <TaskProvider>
      <TaskList />
    </TaskProvider>
  );
}
