import { TaskProvider } from "./contexts/TaskContext";
import TaskList from "./screens/TaskList";

export default function App() {
  return (
    <TaskProvider>
      <TaskList />
    </TaskProvider>
  );
}
