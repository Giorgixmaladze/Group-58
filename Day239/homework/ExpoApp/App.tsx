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
    if (!searchTerm.trim()) return; // Don't search if the input is empty
    
    setLoading(true);
    // Dynamic URL using the searchTerm state
    fetchData(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyCNcOeTBYg0R35383avX3QIXMuMTA238Tw`)
      .then(res => {
        setBooks(res.items || []); // Fallback to empty array if no items found
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Use contentContainerStyle for layout and padding. 
         This ensures the last item isn't cut off! 
      */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.heading}>Book Library</Text>
          
          <View style={styles.searchForm}>
            <TextInput 
              style={styles.input} 
              value={searchTerm} 
              onChangeText={setSearchTerm} 
              placeholder='Search a book' 
            />
            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>{loading ? "..." : "Search"}</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.booksList}>
          {books.length > 0 ? (
            books.map((book) => (
              <View key={book.id} style={styles.bookCard}>
                {/* Optional chaining (?.) prevents crashes if an image is missing */}
                {book.volumeInfo.imageLinks?.thumbnail ? (
                  <Image 
                    source={{ uri: book.volumeInfo.imageLinks.thumbnail }} 
                    style={styles.image} 
                  />
                ) : (
                  <View style={[styles.image, styles.placeholder]}>
                    <Text>No Image</Text>
                  </View>
                )}
                
                <Text style={styles.bookTitle}>{book.volumeInfo.title}</Text>
                <Text style={styles.bookSubtitle}>{book.volumeInfo.subtitle}</Text>
                <Text style={styles.authors}>
                  {book.volumeInfo.authors?.join(', ')}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>
              {loading ? "Loading books..." : "Search for a book to begin!"}
            </Text>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 60, // Fixes the "hidden last element" issue
  },
  header: {
    paddingTop: 50,
    width: "90%",
    marginBottom: 30,
  },
  heading: {
    fontSize: 30,
    fontWeight: '900', // Must be a string in React Native
  },
  searchForm: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "#d2d6d3",
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 8,
  },
  button: {
    width: 80,
    height: 50,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  booksList: {
    width: "100%",
    alignItems: "center",
    gap: 40,
  },
  bookCard: {
    width: "80%",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginBottom: 15,
  },
  placeholder: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  bookSubtitle: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
  },
  authors: {
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 5,
  },
  emptyText: {
    marginTop: 50,
    color: "gray",
  }
});