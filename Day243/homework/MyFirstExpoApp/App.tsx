import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import "./styles.css"
import SearchForm from './components/SearchForm';
import UserComp from './components/UserComp';
import { useState } from 'react';

export default function App() {
  const [userData, setUserData] = useState<any>(null);
  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className='flex-1 py-12'>
          <View className="px-6 mb-8">
            <Text className="text-4xl font-extrabold text-gray-900 tracking-tight">
              GitHub <Text className="text-blue-600">Finder</Text>
            </Text>
            <Text className="text-gray-500 mt-2 text-lg">
              Search and discover GitHub profiles instantly.
            </Text>
          </View>

          <SearchForm setUserData={setUserData} />
          {userData && <UserComp data={userData} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

