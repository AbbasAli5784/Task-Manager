import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import uuid from "react-native-uuid";
import useTasks from "../hooks/useTasks";
import TaskItem from "../components/TaskItem";

// This is the main screen where tasks are created, filtered, and displayed
export default function TaskList() {
  const { tasks, dispatch } = useTasks(); // Get task state and dispatch function
  const [text, setText] = useState(""); // Holds input for new task
  const [filter, setFilter] = useState("all"); // Task filter: all, active, completed

  console.log("FROM COMPONENT: ", tasks); // For debugging

  // Filter tasks based on selected view
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // Create a new task and add it to the list
  const handleAddTask = () => {
    if (text.trim() === "") return;
    dispatch({
      type: "ADD_TASK",
      payload: {
        id: uuid.v4(), // generate unique ID
        title: text,
        completed: false,
        category: "default", // default category for now
      },
    });
    setText(""); // Clear input
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Tracker</Text>

      {/* Input field + Add button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={text}
          onChangeText={setText}
        />
        <Button title="Add" onPress={handleAddTask} />
      </View>

      {/* Filter buttons (All / Active / Completed) */}
      <View style={styles.filters}>
        {["all", "active", "completed"].map((type) => (
          <TouchableOpacity key={type} onPress={() => setFilter(type)}>
            <Text
              style={[
                styles.filterText,
                filter === type && styles.activeFilter,
              ]}
            >
              {type.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Render task list */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskItem task={item} />}
      />
    </View>
  );
}

// Styling for the screen
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    paddingVertical: 4,
  },
  filters: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  filterText: {
    fontSize: 16,
    color: "#888",
  },
  activeFilter: {
    color: "black",
    fontWeight: "bold",
  },
});
