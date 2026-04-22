import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, Modal } from 'react-native';
import { useState } from 'react';
import { Post } from './types';

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pendingDeleteIndex, setPendingDeleteIndex] = useState<number | null>(null);

  const addPost = () => {
    if (!title.trim() || !content.trim()) return;

    const newPost = {
      title: title.trim(),
      content: content.trim(),
    };
    setPosts((prevPosts) => [...prevPosts, newPost]);
    setTitle('');
    setContent('');
  };

  const deletePost = (index: number) => {
    setPendingDeleteIndex(index);
  };

  const confirmDelete = () => {
    if (pendingDeleteIndex === null) return;
    setPosts((prevPosts) => prevPosts.filter((_, i) => i !== pendingDeleteIndex));
    setPendingDeleteIndex(null);
  };

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
          <Pressable 
            style={({ pressed }) => [
              styles.addButton,
              pressed && { opacity: 0.8 }
            ]} 
            onPress={addPost}
          >
            <Text style={styles.addButtonText}>Add Post</Text>
          </Pressable>
        </View>

        <View style={styles.postList}>
          {posts.map((post, index) => (
            <View key={index} style={styles.postCard}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postContent}>{post.content}</Text>
              
              <Pressable 
                style={({ pressed }) => [
                  styles.deleteButton,
                  pressed && { opacity: 0.7 }
                ]} 
                onPress={() => deletePost(index)}
              >
                <Text style={styles.deleteButtonText}>Delete Post</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal
        transparent
        animationType="fade"
        visible={pendingDeleteIndex !== null}
        onRequestClose={() => setPendingDeleteIndex(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Delete Post</Text>
            <Text style={styles.modalText}>Are you sure you want to delete this post?</Text>
            <View style={styles.modalActions}>
              <Pressable style={styles.modalCancelButton} onPress={() => setPendingDeleteIndex(null)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.modalDeleteButton} onPress={confirmDelete}>
                <Text style={styles.modalDeleteText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    gap: 20,
    paddingBottom: 40, // დამატებითი სივრცე ბოლოში
    flexGrow: 1,
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
    minHeight: 100,
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
    gap: 16,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 2,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
  },
  postContent: {
    fontSize: 15,
    color: '#64748B',
    lineHeight: 22,
    marginBottom: 16,
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingVertical: 12, // სიმაღლის ნაცვლად ვიყენებთ padding-ს
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    gap: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  modalText: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 4,
  },
  modalCancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
  },
  modalCancelText: {
    color: '#334155',
    fontWeight: '600',
  },
  modalDeleteButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: '#EF4444',
  },
  modalDeleteText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});