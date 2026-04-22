import { Image, Text, View, Linking, TouchableOpacity } from "react-native";

interface UserProps {
    data: {
        avatar_url: string;
        name: string;
        login: string;
        bio: string;
        followers: number;
        following: number;
        public_repos: number;
        html_url: string;
        location: string;
    };
}

const UserComp = ({ data }: UserProps) => {
    return (
        <View className="w-full px-6 mt-8">
            <View className="bg-white rounded-3xl p-6 shadow-2xl shadow-black/10 border border-gray-100">
                <View className="flex-row items-center">
                    <Image 
                        source={{ uri: data.avatar_url }} 
                        className="w-20 h-20 rounded-2xl bg-gray-200" 
                    />
                    <View className="ml-4 flex-1">
                        <Text className="text-2xl font-bold text-gray-900 leading-tight">
                            {data.name || data.login}
                        </Text>
                        <Text className="text-blue-600 font-medium">@{data.login}</Text>
                        {data.location && (
                            <View className="flex-row items-center mt-1">
            
                                <Text className="text-gray-500 text-sm ml-1">{data.location}</Text>
                            </View>
                        )}
                    </View>
                </View>

                {data.bio && (
                    <Text className="mt-4 text-gray-600 leading-5 italic">
                        {data.bio}
                    </Text>
                )}

                <View className="flex-row justify-between mt-6 bg-gray-50 rounded-2xl p-4">
                    <View className="items-center">
                        <Text className="text-gray-400 text-xs font-bold uppercase tracking-wider">Repos</Text>
                        <Text className="text-gray-900 text-lg font-bold mt-1">{data.public_repos}</Text>
                    </View>
                    <View className="items-center">
                        <Text className="text-gray-400 text-xs font-bold uppercase tracking-wider">Followers</Text>
                        <Text className="text-gray-900 text-lg font-bold mt-1">{data.followers}</Text>
                    </View>
                    <View className="items-center">
                        <Text className="text-gray-400 text-xs font-bold uppercase tracking-wider">Following</Text>
                        <Text className="text-gray-900 text-lg font-bold mt-1">{data.following}</Text>
                    </View>
                </View>

                <TouchableOpacity 
                    onPress={() => Linking.openURL(data.html_url)}
                    className="mt-6 bg-gray-900 py-4 rounded-xl flex-row items-center justify-center"
                    activeOpacity={0.9}
                >
                    
                    <Text className="text-white font-bold ml-2">View Profile on GitHub</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default UserComp;
