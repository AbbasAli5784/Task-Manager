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

export default function TaskItem({ task }) {
  const { dispatch } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const toggleComplete = () => {
    dispatch({ type: "TOGGLE_TASK", payload: task.id });
  };

  const handleDelete = () => {
    dispatch({ type: "DELETE_TASK", payload: task.id });
  };

  const handleComplete = () => {
    dispatch({ type: "TOGGLE_TASK", payload: task.id });
  };

  const handleSave = () => {
    dispatch({
      type: "EDIT_TASK",
      payload: { ...task, title: newTitle },
    });
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      {/* Optional: category color strip */}
      <View
        style={[
          styles.colorBar,
          { backgroundColor: getCategoryColor(task.category) },
        ]}
      />

      {/* Task Content */}
      <View style={styles.content}>
        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <Button title="Save" onPress={handleSave} />
          </>
        ) : (
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

// Simple color picker for category
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
