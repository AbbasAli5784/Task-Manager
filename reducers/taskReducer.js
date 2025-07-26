export function taskReducer(state, action) {
  console.log(action); // For debugging: see what action is being dispatched

  switch (action.type) {
    // Add a new task to the list
    case "ADD_TASK":
      return [...state, action.payload];

    // Update an existing task (by matching its ID)
    case "EDIT_TASK":
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );

    // Remove a task from the list
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);

    // Toggle a task's "completed" status
    case "TOGGLE_TASK":
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );

    // Replace the whole task list (used when loading from storage)
    case "SET_TASKS":
      return action.payload;

    // If we don’t recognize the action, just return the current state
    default:
      return state;
  }
}
