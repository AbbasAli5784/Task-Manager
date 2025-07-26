import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import useTasks from "../hooks/useTasks";

// This component displays a single task and allows editing, deleting, and marking it complete
export default function TaskItem({ task }) {
  const { dispatch } = useTasks(); // Get the dispatch function from global task context
  const [isEditing, setIsEditing] = useState(false); // Whether we're currently editing this task
  const [newTitle, setNewTitle] = useState(task.title); // Local state to hold edited task title

  // Toggle the completed status of the task
  const toggleComplete = () => {
    dispatch({ type: "TOGGLE_TASK", payload: task.id });
  };

  // Delete the task
  const handleDelete = () => {
    dispatch({ type: "DELETE_TASK", payload: task.id });
  };

  // Also toggles completion (used for 'Complete' button)
  const handleComplete = () => {
    dispatch({ type: "TOGGLE_TASK", payload: task.id });
  };

  // Save changes to the task title
  const handleSave = () => {
    dispatch({
      type: "EDIT_TASK",
      payload: { ...task, title: newTitle },
    });
    setIsEditing(false); // Exit editing mode
  };

  return (
    <View style={styles.container}>
      {/* Colored strip to show category (work/personal/etc.) */}
      <View
        style={[
          styles.colorBar,
          { backgroundColor: getCategoryColor(task.category) },
        ]}
      />

      {/* Main task content */}
      <View style={styles.content}>
        {isEditing ? (
          // Show input and save button if editing
          <>
            <TextInput
              style={styles.input}
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <Button title="Save" onPress={handleSave} />
          </>
        ) : (
          // Show task title and action buttons
          <>
            <TouchableOpacity onPress={toggleComplete}>
              <Text style={[styles.text, task.completed && styles.completed]}>
                {task.title}
              </Text>
            </TouchableOpacity>

            <View style={styles.actions}>
              <Button title="Edit" onPress={() => setIsEditing(true)} />
              <Button title="Delete" onPress={handleDelete} color="red" />
              <Button title="Complete" onPress={handleComplete} color="grey" />
            </View>
          </>
        )}
      </View>
    </View>
  );
}

// Returns a color based on the task's category
function getCategoryColor(category) {
  switch (category) {
    case "work":
      return "#FFD700"; // gold
    case "personal":
      return "#90EE90"; // light green
    default:
      return "#ccc"; // default gray
  }
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    overflow: "hidden",
  },
  colorBar: {
    width: 6,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  text: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    marginBottom: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
});
