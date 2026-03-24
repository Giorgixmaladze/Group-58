import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';


export default function App() {
  const [email,setEmail] = useState<string>()
  const [pass,setPass] = useState<string>()
  
  
  return (  
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.header}>Register Page</Text>
        <View style={styles.form}>
          <TextInput placeholder='Enter the Email' style={styles.input} value={email} onChangeText={setEmail} />
          <TextInput placeholder='Enter the Password' style={styles.input} value={pass} onChangeText={setPass} />
          <Pressable style={styles.submit} onPress={()=>{
            alert(`Email:${email}|| Password:${pass}`)
          }}>
            <Text style={{color:"white"}} >Submit</Text>
          </Pressable>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"white",
  
  },
  inner: {
    width: "90%"
  },
  header: {
    fontSize: 30
  },
  form:{
    paddingTop:50,
    width:"90%",
    flexDirection:"column",
    gap:30
  },
  input:{
    borderWidth:1,
    borderColor:"black",
    borderStyle:"solid",
    height:50,
    paddingLeft:20
  },
  submit:{
    width:"60%",
    height:50,
    backgroundColor:"blue",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:10
  }
});
