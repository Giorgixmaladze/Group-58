import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
} from 'react-native';

export default function App() {
  const[lightMode,setLightMode] = useState(false)

  

  return (
    <View style={lightMode?[styles.safeArea,{backgroundColor:"white"}]:styles.safeArea}>
      <View style={styles.wrapper}>
        <View style={lightMode?[styles.card,{backgroundColor:'#0B3D91'}]:styles.card}>
          <Text style={lightMode?[styles.title,{color:'white'}]:styles.title}>Hello, Expo!</Text>
          <Text style={lightMode?[styles.subtitle,{color:'white'}]:styles.subtitle} numberOfLines={2}>
            This is a simple starter screen with a clean, modern layout.
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
              lightMode?[styles.button,{backgroundColor:"white"}]:styles.button
            ]}
            onPress={()=>{
              setLightMode(!lightMode)

            }}
          >
            <Text style={lightMode?[styles.buttonText,{backgroundColor:"white",color:"#0B3D91"}]:styles.buttonText}>{lightMode?"Change To Dark Mode":"Change To Light Mode"}</Text>
          </Pressable>

        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B3D91',
  },
  wrapper: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0B3D91',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#2D2D2D',
    marginBottom: 24,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#0B3D91',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: Platform.OS === 'ios' ? 0.7 : 0.9,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  message: {
    marginTop: 18,
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});




// ზოგადად, როდესაც აპლიკაციის აწყობას სწავლობენ, ბევრი inline გასტილვას იყენებს რაც მაგ ეტაპზე მისაღებია ხოლო მომავალში არა.

// ჩვენ ვიცით ვებში როგორ გავსტილოთ ესა თუ ის ელემენტი, მაგრამ React Nativeში ცოტა სხვანაირადაა. ეგ უკვე განხილული გვაქვს და ჯერ ისევ inline გასტილვაზე ვართ.


// მაგრამ,როდესაც მეტი სტილის წესი ემატება, კოდის წაკითხვა უფრო რთულდება. ამ პრობლემის მოსაგვარებლად, React Native-მა შექმნა StyleSheet API. StyleSheet API-ის დახმარებით, ჩვენ შეგვიძლია სტილიზაციის წესები ცალკე დავწეროთ და მათზე მივუთითოთ კომპონენტების რენდერის დროს. ისინი CSS Stylesheet-ების მსგავსად ფუნქციონირებენ და საშუალებას გვაძლევენ სტილის წესები მრავალი კომპონენტისთვის განმეორებით გამოვიყენოთ.

