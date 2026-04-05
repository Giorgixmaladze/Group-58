import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { 
  Pressable, 
  ScrollView, 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  SafeAreaView 
} from 'react-native';
import { fetchData } from './utils/fetchData';

export default function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    fetchData(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyCNcOeTBYg0R35383avX3QIXMuMTA238Tw`)
      .then(res => {
        setBooks(res.items || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        <View style={styles.header}>
          <Text style={styles.heading}>Library</Text>
          <Text style={styles.subheading}>Discover your next favorite book</Text>
          
          <View style={styles.searchForm}>
            <TextInput 
              style={styles.input} 
              value={searchTerm} 
              onChangeText={setSearchTerm} 
              placeholder='Search by title or author...' 
              placeholderTextColor="#94A3B8"
              selectionColor="#6366F1"
            />
            <Pressable 
              style={({pressed}) => [
                styles.button,
                pressed && { opacity: 0.8, transform: [{ scale: 0.96 }] }
              ]} 
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>{loading ? "..." : "Search"}</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.booksList}>
          {books.length > 0 ? (
            books.map((book: any) => (
              <View key={book.id} style={styles.bookCard}>
                {book.volumeInfo.imageLinks?.thumbnail ? (
                  <View style={styles.imageContainer}>
                    <Image 
                      source={{ uri: book.volumeInfo.imageLinks.thumbnail.replace('http:', 'https:') }} 
                      style={styles.image} 
                      resizeMode="cover"
                    />
                  </View>
                ) : (
                  <View style={[styles.image, styles.placeholder]}>
                    <Text style={styles.placeholderText}>No Cover</Text>
                  </View>
                )}
                
                <Text style={styles.bookTitle} numberOfLines={2}>
                  {book.volumeInfo.title}
                </Text>
                {book.volumeInfo.subtitle && (
                  <Text style={styles.bookSubtitle} numberOfLines={2}>
                    {book.volumeInfo.subtitle}
                  </Text>
                )}
                {book.volumeInfo.authors && (
                  <Text style={styles.authors}>
                    {book.volumeInfo.authors.join(', ')}
                  </Text>
                )}
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {loading ? "Searching the shelves..." : "Your library awaits."}
              </Text>
            </View>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 80,
  },
  header: {
    paddingTop: 60,
    width: "90%",
    marginBottom: 35,
  },
  heading: {
    fontSize: 42,
    fontWeight: '900',
    color: '#F8FAFC',
    letterSpacing: -1,
  },
  subheading: {
    fontSize: 16,
    color: '#94A3B8',
    marginTop: 6,
    marginBottom: 8,
    fontWeight: '500',
  },
  searchForm: {
    flexDirection: "row",
    marginTop: 25,
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 56,
    backgroundColor: "#1E293B",
    color: "#F8FAFC",
    paddingHorizontal: 20,
    marginRight: 12,
    borderRadius: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  button: {
    width: 90,
    height: 56,
    backgroundColor: "#6366F1",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  booksList: {
    width: "100%",
    alignItems: "center",
  },
  bookCard: {
    width: "90%",
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#334155',
  },
  imageContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 225,
    borderRadius: 12,
  },
  placeholder: {
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#475569',
    marginBottom: 20,
  },
  placeholderText: {
    color: '#94A3B8',
    fontWeight: '600',
    fontSize: 16,
  },
  bookTitle: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    color: "#F1F5F9",
    marginBottom: 8,
    lineHeight: 28,
  },
  bookSubtitle: {
    fontSize: 15,
    color: "#94A3B8",
    textAlign: "center",
    marginBottom: 12,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  authors: {
    fontSize: 14,
    color: "#818CF8",
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
  emptyContainer: {
    marginTop: 80,
    alignItems: 'center',
  },
  emptyText: {
    color: "#64748B",
    fontSize: 18,
    fontWeight: '500',
  }
});