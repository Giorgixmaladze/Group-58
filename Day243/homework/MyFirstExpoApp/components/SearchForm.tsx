import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import fetchData from "../utils/fetchData";

const SearchForm = ({setUserData}: {setUserData: (data: any) => void}) => {
    const [username, setUsername] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const searchHandler = async () => {
        if (!username.trim()) return;
        
        setLoading(true);
        setError(null);
        try {
            const data = await fetchData(username);
            if (!data) {
                setError("User not found");
            }
            setUserData(data);
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <View className="w-full px-6">
            <View className="bg-white/10 p-1 rounded-2xl border border-white/20 shadow-xl overflow-hidden">
                <View className="flex-row items-center bg-white rounded-xl px-4 py-2">
                    <Ionicons name="search-outline" size={20} color="#6B7280" />
                    <TextInput 
                        placeholder="Search GitHub user..." 
                        placeholderTextColor="#9CA3AF"
                        className="flex-1 ml-3 text-gray-800 text-lg py-2" 
                        onChangeText={setUsername} 
                        value={username}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onSubmitEditing={searchHandler}
                    />
                    {username.length > 0 && (
                        <TouchableOpacity onPress={() => setUsername("")}>
                            <Ionicons name="close-circle" size={20} color="#D1D5DB" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <TouchableOpacity
                onPress={searchHandler}
                disabled={loading}
                className={`mt-4 bg-blue-600 h-14 rounded-xl flex-row items-center justify-center shadow-lg shadow-blue-500/50 ${loading ? 'opacity-70' : 'opacity-100'}`}
                activeOpacity={0.8}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <>
                        <Text className="text-white text-lg font-bold mr-2">Search Profile</Text>
                        <Ionicons name="arrow-forward" size={18} color="white" />
                    </>
                )}
            </TouchableOpacity>

            {error && (
                <View className="mt-4 bg-red-100/80 p-3 rounded-lg border border-red-200">
                    <Text className="text-red-600 text-center font-medium">{error}</Text>
                </View>
            )}
        </View>
    )
}

export default SearchForm;