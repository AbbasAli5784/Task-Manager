import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadTasks = async () => {
  try {
    const json = await AsyncStorage.getItem("tasks");
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error("Load error:", e);
    return [];
  }
};

export const saveTasks = async (tasks) => {
  try {
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (e) {
    console.error("Save error:", e);
  }
};
