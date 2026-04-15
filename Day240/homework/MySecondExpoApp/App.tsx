import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,FlatList } from 'react-native';



const users = Array.from({ length: 50 }, (_, i) => {
  const id = i + 1;
  return {
    id: id,
    fullName: `User Name ${id}`,
    email: `user${id}@example.com`,
    role: id % 5 === 0 ? "Admin" : "User", // ყოველი მეხუთე იქნება ადმინი
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`, // რენდომ ავატარი
    createdAt: new Date().toISOString(),
    status: Math.random() > 0.3 ? "Active" : "Offline"
  };
});

console.log(users);

export default function App() {
  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Users Directory</Text>
          <Text style={styles.headerSubtitle}>{users.length} members</Text>
        </View>
        <FlatList 
          data={users} 
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <View style={styles.avatarSection}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{item.fullName.charAt(0)}</Text>
                  </View>
                  <View style={[styles.statusIndicator, { backgroundColor: item.status === 'Active' ? '#10b981' : '#9ca3af' }]} />
                </View>
                <View style={styles.userInfo}>
                  <View style={styles.nameRow}>
                    <Text style={styles.userName}>{item.fullName}</Text>
                    <View style={[styles.roleBadge, { backgroundColor: item.role === 'Admin' ? '#ef4444' : '#3b82f6' }]}>
                      <Text style={styles.roleText}>{item.role}</Text>
                    </View>
                  </View>
                  <Text style={styles.email}>{item.email}</Text>
                  <Text style={styles.status}>{item.status}</Text>
                </View>
              </View>
            </View>
          )} 
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  headerContainer: {
    backgroundColor: '#1f2937',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9ca3af',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatarSection: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#fff',
  },
  userInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  roleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  roleText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
  email: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  status: {
    fontSize: 11,
    color: '#10b981',
    fontWeight: '500',
  },
});
