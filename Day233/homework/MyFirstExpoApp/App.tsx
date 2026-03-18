import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  // 1. Start with null so we know we aren't editing anything yet
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleSubmit = () => {
    if (task.trim() === "") return;

    const isDuplicate = tasks.some(t => t.toLowerCase() === task.toLowerCase());

    if (editIndex !== null) {
      // MODE: UPDATING
      const updatedTasks = tasks.map((t, i) => (i === editIndex ? task : t));
      setTasks(updatedTasks);
      setEditIndex(null); 
      setTask("");
    } else if (!isDuplicate) {

      setTasks(prev => [...prev, task]);
      setTask("");
    } else {
      alert("This task already exists!");
    }
  };

  const editTask = (index: number) => {
    setTask(tasks[index]); 
    setEditIndex(index);  
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
      setTask("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.mainText}>To-Do List</Text>

        <TextInput 
          value={task} 
          placeholder={"Enter the task:"} 
          onChangeText={setTask} 
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        />

        <Pressable style={styles.submitButton} onPress={handleSubmit} >
          <Text style={{color: 'white'}}>
            {editIndex !== null ? "Update Task" : "Add Task"}
          </Text>
        </Pressable>

        <View>
          {tasks.map((item, index) => (
            <View style={styles.task} key={index}>
              <Text>{item}</Text>
              
              <Pressable style={styles.taskButton} onPress={() => editTask(index)}>
                <Text style={{ color: "white" }}>Edit</Text>
              </Pressable>

              <Pressable onPress={() => deleteTask(index)}>
                <Text style={{ color: "red" }}>Delete</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    height: '80%',
  },
  mainText: {
    color: "blue",
    fontSize: 30
  },
  submitButton: {
    width: 150,
    height: 30,
    backgroundColor: "blue",
    color: 'white'
  },
  task: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    paddingTop: 50,
    alignItems: "center"
  },
  taskButton: {
    width: 100,
    height: 30,
    backgroundColor: "gray",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white"
  }
});
