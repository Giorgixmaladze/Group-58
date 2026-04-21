import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import { Post } from './types';
import { TextInput, Pressable, ScrollView } from 'react-native';


export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const addPost = () =>{
    if (!title.trim() || !content.trim()) return;

    const newPost = {
      title: title.trim(),
      content: content.trim(),
    }
    setPosts((prevPosts) => [...prevPosts, newPost]);
    setTitle('');
    setContent('');
  }



  const deletePost = (index:number) =>{
    setPosts((prevPosts) => prevPosts.filter((_, i) => i !== index));
  }
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Community Pulse</Text>
        <Text style={styles.subtitle}>Share your thoughts with the world</Text>
      </View>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Create a new post</Text>
          <TextInput
            placeholder="Enter the post title"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder="Enter the post content"
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            style={[styles.input, styles.textArea]}
            value={content}
            onChangeText={setContent}
          />
          <Pressable style={styles.addButton} onPress={addPost}>
            <Text style={styles.addButtonText}>Add Post</Text>
          </Pressable>
        </View>
        <View style={styles.postList}>
          {posts.map((post, index) => (
            <View key={index} style={styles.postCard}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postContent}>{post.content}</Text>
              <Pressable style={styles.deleteButton} onPress={() => deletePost(index)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Slate 50
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A', // Slate 900
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B', // Slate 500
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    gap: 20,
    paddingBottom: 24,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 24,
    elevation: 4,
    gap: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#0F172A',
  },
  textArea: {
    minHeight: 130,
  },
  addButton: {
    marginTop: 6,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#1D4ED8',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 3,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  postList: {
    gap: 14,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  postContent: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  deleteButton: {
    marginTop: 6,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    width: '100%',
    height: 40,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
