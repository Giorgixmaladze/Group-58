import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);


  //  <View> არის კონტეინერი,რომელიც გამოიყენება ეკრანზე ელემენტების დასაჯგუფებლად და განლაგების შესაქმნელად. მას არ აქვს საკუთარი ვიზუალური სახე.

  // გარდა სტილისა <View>ს აქვს რამდენიმე მნიშვნელოვანი თვისება:

            // -onLayout: ფუნქცია, რომელიც გამოიძახება, როდესაც კომპონენტის ზომა ან პოზიცია გამოითვლება. ეს სასარგებლოა დინამიური გათვლებისთვის.

            // -pointerEvents: აკონტროლებს, რეაგირებს თუ არა View შეხებაზე (მაგალითად, none ნიშნავს, რომ შეხება „გაივლის“ მასში და ქვედა ფენაზე იმოქმედებს).

            // -nativeID: გამოიყენება ნატივურ კოდთან დასაკავშირებლად.

            // -Accessibility Props: თვისებები შეზღუდული შესაძლებლობების მქონე პირებისთვის (მაგ. accessible={true}, accessibilityLabel="მთავარი კონტეინერი").



  // React Native-ში <Text> კომპონენტი არის ერთადერთი სწორი გზა ეკრანზე ნებისმიერი სახის ტექსტური ინფორმაციის გამოსატანად. ვებ-დეველოპმენტისგან განსხვავებით, სადაც ტექსტი შეგიძლიათ ჩაწეროთ <div>, <h1> ან <p> ელემენტებში, React Native-ში ტექსტის მოთავსება <View>-ში პირდაპირ შეცდომას გამოიწვევს.




  // <TextInput> კომპონენტი მომხმარებელს ტექსტის შეყვანის საშუალებას აძლევს, რაც HTML-ის input-ს ან textarea-ს ჰგავს. ის აფიქსირებს მომხმარებლის მიერ შეყვანილ მონაცემებს და შეუძლია განაახლოს მდგომარეობა (state) წერის პარალელურად:




  // <ScrollView /> კომპონენტი წარმოადგენს სქროლვად დათვალიერებად კონტეინერს იმ შემთხვევისთის, როდესავ კონტენტი ეკრანის ზომას აჭარბებს - წარმოვიდგინოთ სოციალური მედიის feed! <View> სგან განსხვავებით,რომელიც ფიქსირებულ არეს აჩვენებს, <ScrollView> მომხმარებელს საშუალებას აძლევს დაათვალიეროს გრძელი სიები სურათები ან ტექსტური კონტენტი


// <Image> კომპონენტი გამოსახავს სურათებს სხვადასხვა წყაროდან — ლოკალური ფაილებიდან, ქსელური რესურსებიდან ან თუნდაც base64 კოდირებული მონაცემებიდან. სწორი რენდერინგისთვის მას აუცილებლად სჭირდება სიგანისა და სიმაღლის ზომების მითითებ




{/* <Button> კომპონენტი არის სტანდარტული ღილაკი. მასზე დაჭერისას შეგვიძლია გამოვიძახოთ ფუნქციები სხვადასხვა მოქმედების შესასრულებლად, როგორიცაა მონაცემების გაგზავნა, ეკრანებს შორის ნავიგაცია ან შეტყობინების (alert) ჩვენება */}

  return (
    <View style={styles.container}>
   
      <Pressable 
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed 
        ]} 
        onPress={() => setCount(count - 1)}
      >
        <Text style={styles.buttonText}>-</Text>
      </Pressable>

      <Text style={styles.counterText}>{count}</Text>

   
      <Pressable 
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed
        ]} 
        onPress={() => setCount(count + 1)}
      >
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20, 
  },
  button: {
    width: 150,
    height: 45, 
    backgroundColor: "blue",
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',     
    shadowColor: '#000',      
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  buttonPressed: {
    backgroundColor: '#0000AA', 
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  counterText: {
    fontSize: 40,
    fontWeight: '300',
  }
});