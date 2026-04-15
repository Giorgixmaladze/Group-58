import { StatusBar } from 'expo-status-bar';
import { useState } from 'react'; // 1. Import useState
import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Pressable, 
  KeyboardAvoidingView,
  Platform
} from 'react-native';

export default function App() {
  // 2. Add state to capture form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = () => {
    // Now you can actually use the data!
    alert(`Registration successful for ${name}!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 3. Move KeyboardAvoidingView to wrap the content and give it flex: 1 */}
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Registration</Text>
          <Text style={styles.subtitle}>Create your account</Text>

          {/* 4. formContainer now directly wraps the inputs so gap: 16 works */}
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder='Enter your name'
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder='Enter your email'
              keyboardType='email-address'
              autoCapitalize="none" // Good practice for emails
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder='Enter your password'
              secureTextEntry
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
              placeholder='Enter your phone number'
              keyboardType='phone-pad'
              placeholderTextColor="#999"
              value={phone}
              onChangeText={setPhone}
            />

            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed
              ]}
              onPress={handleRegister}
            >
              <Text style={styles.buttonText}>Register</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardView: {
    flex: 1, // Ensures the avoiding view takes up the whole screen
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20, // Moved padding here from container
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 32,
    textAlign: 'center',
  },
  formContainer: {
    gap: 16, // Now properly spaces out the TextInputs
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#2c3e50',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonPressed: {
    backgroundColor: '#2980b9',
    opacity: 0.9,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});