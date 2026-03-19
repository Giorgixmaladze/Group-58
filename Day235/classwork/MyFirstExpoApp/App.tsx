import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useState, useEffect } from 'react';



export default function App() {
  
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

 



  return (
      <SafeAreaView style={styles.screen}>
      <ScrollView >
        {/* Use a wrapper View to handle the row/wrap layout */}
        <View style={styles.container}>
          {products.map((product: any) => (
            <View key={product.id} style={styles.card}>
              <Text style={styles.title} numberOfLines={2}>
                {product.title}
              </Text>

              <Image
                source={{ uri: product.image }}
                style={styles.image}
                resizeMode="contain"
              />

              <Text style={styles.description} numberOfLines={3}>
                {product.description}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      </SafeAreaView>
   
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    padding: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    width: '48%', // Ensures two columns on most screens
    elevation: 3,
    // Add height or minHeight if content varies too much
    minHeight: 300,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
    height: 40,
  },
  image: {
    width: '100%',
    height: 120, // Explicit height is required for Android images
    marginBottom: 12,
    backgroundColor: '#eee', // Placeholder color
  },
  description: {
    fontSize: 11,
    color: '#555',
    lineHeight: 16,
  },
});
