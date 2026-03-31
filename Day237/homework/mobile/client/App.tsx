import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [taskName, setTaskName] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3000/api/items")
      .then((res) => res.json())
      .then((data: any) => setTasks(data));
  }, [tasks]);

  const handleAddTask = () => {
    if (taskName.trim() === "") {
      if (Platform.OS !== 'web') {
        Alert.alert("Error", "Please enter a task");
      }
      return;
    }

    const newTaskData = { name: taskName };

    fetch("http://localhost:3000/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTaskData),
    })
      .then(res => res.json())
      .then((newItem: any) => {
        setTasks([...tasks, newItem]);
      });

    setTaskName("");
  }


  const handleDeleteTask = (index: number) => {
    const taskToDelete = tasks[index];

    fetch(`http://localhost:3000/api/items/${taskToDelete.id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
      });

  }




  return (
    <View style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.title}>My Tasks</Text>
          <Text style={styles.subtitle}>{tasks.length} tasks for today</Text>
        </View>

        <View style={styles.inputSection}>
          <TextInput
            style={styles.input}
            placeholder="What needs to be done?"
            placeholderTextColor="#adb5bd"
            value={taskName}
            onChangeText={setTaskName}
          />
          <Pressable
            style={({ pressed }) => [
              styles.addButton,
              pressed && styles.pressed
            ]}
            onPress={handleAddTask}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>

        <ScrollView
          style={styles.listContainer}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {tasks.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No tasks yet. Start by adding one!</Text>
            </View>
          ) : (
            tasks.map((task, index) => (
              <View key={task.id || index} style={styles.taskCard}>
                <View style={styles.taskTextContainer}>
                  {editingId === task.id ? (
                    <TextInput
                      style={styles.input}
                      value={editingText}
                      onChangeText={setEditingText}
                      autoFocus
                    />
                  ) : (
                    <Text style={styles.taskText}>{task.name}</Text>
                  )}
                </View>
                {editingId === task.id ? (
                  <>
                    <Pressable
                      style={({ pressed }) => [
                        styles.saveButton,
                        pressed && styles.pressed
                      ]}
                      onPress={() => {
                        const updatedTasks = [...tasks];
                        updatedTasks[index].name = editingText;
                        setTasks(updatedTasks);
                        fetch(`http://localhost:3000/api/items/${task.id}`, {
                          method: "PATCH",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ name: editingText }),
                        })
                          .then(res => res.json())
                          .then((updatedItem: any) => {
                            const updatedTasks = [...tasks];
                            updatedTasks[index] = updatedItem;
                            setTasks(updatedTasks);
                          });
                        setEditingId(null);
                        setEditingText("");
                      }}
                    >
                      <Text style={styles.saveButtonText}>Save</Text>
                    </Pressable>
                    <Pressable
                      style={({ pressed }) => [
                        styles.cancelButton,
                        pressed && styles.pressed
                      ]}
                      onPress={() => {
                        setEditingId(null);
                        setEditingText("");
                      }}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </Pressable>
                  </>
                ) : (
                  <Pressable
                    style={({ pressed }) => [
                      styles.editButton,
                      pressed && styles.pressed
                    ]}
                    onPress={() => {
                      setEditingId(task.id);
                      setEditingText(task.name);
                    }}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </Pressable>
                )}
                <Pressable
                  style={({ pressed }) => [
                    styles.deleteButton,
                    pressed && styles.pressed
                  ]}
                  onPress={() => handleDeleteTask(index)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </Pressable>
              </View>
            ))
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'web' ? 40 : 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#212529',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginTop: 4,
    fontWeight: '500',
  },
  inputSection: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#212529',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  addButton: {
    backgroundColor: '#4C6EF5',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 20,
    shadowColor: '#4C6EF5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 40,
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F3F5',
  },
  taskTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  taskText: {
    fontSize: 16,
    color: '#343A40',
    lineHeight: 22,
    fontWeight: '500',
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#E7F5FF',
    marginRight: 8,
  },
  editButtonText: {
    color: '#4C6EF5',
    fontSize: 14,
    fontWeight: '600',
  },
  saveButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#D3F9D8',
    marginRight: 8,
  },
  saveButtonText: {
    color: '#2F9E44',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F1F3F5',
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#6c757d',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#FFF5F5',
  },
  deleteButtonText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#adb5bd',
    textAlign: 'center',
  },
});
