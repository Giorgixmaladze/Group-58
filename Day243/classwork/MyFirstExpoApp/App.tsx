import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, Pressable, Modal, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
/**
 * Accessibility (ხელმისაწვდომობის) ატრიბუტების ახსნა:
 * 
 * 1. accessible: (boolean) როდესაც არის true, მიუთითებს, რომ ეს ხედი (View) არის 
 *    ხელმისაწვდომობის ერთიანი ელემენტი. ის აერთიანებს მის შიგნით არსებულ შვილობილ 
 *    ელემენტებს ერთ წასაკითხ კომპონენტად ეკრანის წამკითხველისთვის (Screen Reader).
 * 
 * 2. accessibilityLabel: (string) ტექსტი, რომელსაც ეკრანის წამკითხველი (Screen Reader) 
 *    წაიკითხავს მომხმარებლისთვის ამ ელემენტზე ფოკუსირებისას. ის ანაცვლებს ელემენტის 
 *    შიგნით არსებულ ნაგულისხმევ ტექსტს.
 * 
 * 3. accessibilityRole: (string) ეუბნება ეკრანის წამკითხველს, თუ რა ტიპის ელემენტია ეს 
 *    (მაგალითად: 'button', 'header', 'link', 'image' და ა.შ.), რათა მომხმარებელმა იცოდეს, 
 *    როგორ უნდა იმოქმედოს მასზე.
 * 
 * 4. accessibilityState: (object) აღწერს კომპონენტის მიმდინარე მდგომარეობას 
 *    (მაგალითად: { disabled: true }, { selected: false }, { busy: true }). 
 *    ეს ეხმარება მომხმარებელს გაიგოს, არის თუ არა ღილაკი გათიშული, მონიშნული ან 
 *    მიმდინარეობს თუ არა რაიმე პროცესი.
 * 
 * 5. accessibilityHint: (string) დამატებითი მინიშნება, რომელიც ეხმარება მომხმარებელს 
 *    გაიგოს, რა მოხდება ამ ელემენტზე მოქმედების (მაგ. დაჭერის) შედეგად. 
 *    გამოიყენება მაშინ, როცა შედეგი არ არის ნათელი მხოლოდ accessibilityLabel-დან.
 */

export default function App() {
  const [toggleModal, setToggleModal] = useState(false);
  const [users,setUsers] = useState<object[]>([]);
  const [email,setEmail] = useState<string>('');
  const [password,setPassword] = useState<string>('');
  const [showSpinner,setShowSpinner] = useState<boolean>(false);

  const handleAddUser = () => {
    setToggleModal(false);
    setUsers([...users,{email,password}]);
    setEmail('');
    setPassword('');
  }

  const deleteUser = (index:number) =>{
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => {
          const updatedUsers = users.filter((_,i) => i !== index);
          setUsers(updatedUsers);
        } },
      ]
    );
  }

  
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <View style={styles.mainHeader}>
          <Text style={styles.mainTitle}>User Management</Text>
          <Text style={styles.mainSubtitle}>Manage your users and add new ones easily.</Text>
          <Pressable 
            onPress={() => setShowSpinner(!showSpinner)}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="სპინერის ჩვენება"
            accessibilityHint="რთავ ან თიშავ ჩატვირთვის ინდიკატორს ეკრანზე"
            accessibilityState={{ expanded: showSpinner }}
          >
            <Text>Show Spinner</Text>
          </Pressable>
        </View>

        <Pressable 
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.buttonPressed
          ]}
          onPress={() => setToggleModal(true)}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="ახალი მომხმარებლის დამატება"
          accessibilityHint="ხსნის ახალი მომხმარებლის დასარეგისტრირებელ ფანჯარას"
        >
          <Text style={styles.primaryButtonText}>+ Add New User</Text>
        </Pressable>

        {users.length > 0 && (
          <View style={styles.usersListContainer}>
            <Text style={styles.listSectionTitle}>Registered Users</Text>
            {users.map((user:any, index:number) => (
              <View key={index} style={styles.userCard}>
                <View style={styles.userAvatar}>
                  <Text style={styles.userAvatarText}>
                    {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                  </Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userEmail}>{user.email}</Text>
                  <Text style={styles.userRole}>User</Text>
                </View>
                <Pressable 
                  onPress={() => deleteUser(index)}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={`${user.email}-ის წაშლა`}
                  accessibilityHint="შლის არჩეულ მომხმარებელს სიიდან"
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <Modal visible={toggleModal} animationType="slide" transparent={true}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle} >Register User</Text>
              <Pressable 
                onPress={() => setToggleModal(false)} 
                style={styles.closeButton}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="ფანჯრის დახურვა"
                accessibilityHint="ხურავს რეგისტრაციის ფანჯარას"
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </Pressable>
            </View>
            
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Enter user email"
                  placeholderTextColor="#9ca3af"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Enter temporary password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <Pressable 
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.buttonPressed,
                  { marginTop: 12 }
                ]}
                onPress={handleAddUser}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="მომხმარებლის რეგისტრაცია"
                accessibilityHint="ინახავს ახალ მომხმარებელს და ხურავს ფანჯარას"
                accessibilityState={{ disabled: email === '' || password === '' }}
              >
                <Text style={styles.primaryButtonText}>Register</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <ActivityIndicator 
        size="large" 
        color="#4f46e5" 
        animating={showSpinner} 
        accessible={true}
        accessibilityLabel="მიმდინარეობს ჩატვირთვა"
        accessibilityState={{ busy: showSpinner }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  mainContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: 'center',
  },
  mainHeader: {
    marginBottom: 40,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  mainSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
    lineHeight: 24,
  },
  primaryButton: {
    backgroundColor: '#4f46e5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingVertical: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    minHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    backgroundColor: '#f3f4f6',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#4b5563',
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  usersListContainer: {
    marginTop: 40,
  },
  listSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 16,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userAvatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4f46e5',
  },
  userInfo: {
    flex: 1,
  },
  userEmail: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  deleteButtonText: {
    fontSize: 14,
    color: '#ef4444',
    fontWeight: '600',
  },
});
