import AsyncStorage from "@react-native-async-storage/async-storage";

// Load tasks from AsyncStorage when the app starts
export const loadTasks = async () => {
  try {
    const json = await AsyncStorage.getItem("tasks"); // Get saved tasks
    return json ? JSON.parse(json) : []; // If found, return parsed tasks, else return empty list
  } catch (e) {
    console.error("Load error:", e);
    return []; // Return empty list if something goes wrong
  }
};

// Save the current task list to AsyncStorage
export const saveTasks = async (tasks) => {
  try {
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks)); // Save tasks as JSON string
  } catch (e) {
    console.error("Save error:", e); // Log error if saving fails
  }
};
