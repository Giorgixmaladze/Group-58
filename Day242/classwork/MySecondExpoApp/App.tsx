import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Platform, Pressable, TextInput } from 'react-native';
import { useState } from 'react';
import cars from './data/cars';
import { Modal } from 'react-native'

export default function App() {
  const getInitials = (brand: string) => {
    return brand.substring(0, 1).toUpperCase();
  };

  const [brand,setBrand] = useState("");
  const [model,setModel] = useState("");
  const [year,setYear] = useState("");
  const [color,setColor] = useState("");
  const [type,setType] = useState("");
  const [modal,setModal] = useState(false);
  const [allCars,setCars] = useState(cars);
  const handleAddCar = () => {
    setCars([...allCars,{brand,model,year:Number(year),color,type,id:allCars.length+1}]);
    setModal(false);
    setBrand("");
    setModel("");
    setYear("");
    setColor("");
    setType("");
  };


  const handleDeleteCar = (id: number) => {
    setCars(allCars.filter((car) => car.id !== id));
  };

  const renderItem = ({ item }: { item: typeof cars[0] }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitials(item.brand)}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.brandText}>{item.brand}</Text>
          <Text style={styles.modelText}>{item.model}</Text>
        </View>
        <View style={styles.yearTag}>
          <Text style={styles.yearText}>{item.year}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.type}</Text>
        </View>
        <View style={[styles.badge, styles.colorBadge]}>
          <Text style={[styles.badgeText, { color: '#E0E0E0' }]}>{item.color}</Text>
        </View>
      </View>
      <Pressable style={styles.deleteButton} onPress={() => handleDeleteCar(item.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <Modal visible={modal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Car</Text>
              <Pressable style={styles.modalCloseIcon} onPress={() => setModal(false)}>
                <Text style={styles.modalCloseIconText}>✕</Text>
              </Pressable>
            </View>

            <View style={styles.modalForm}>
              <TextInput style={styles.input} placeholder="Brand" placeholderTextColor="#8A8D9F" value={brand} onChangeText={setBrand} />
              <TextInput style={styles.input} placeholder="Model" placeholderTextColor="#8A8D9F" value={model} onChangeText={setModel} />
              <TextInput style={styles.input} placeholder="Year" placeholderTextColor="#8A8D9F" keyboardType="numeric" value={year} onChangeText={setYear} />
              <TextInput style={styles.input} placeholder="Color" placeholderTextColor="#8A8D9F" value={color} onChangeText={setColor} />
              <TextInput style={styles.input} placeholder="Type" placeholderTextColor="#8A8D9F" value={type} onChangeText={setType} />
              
              <Pressable style={styles.submitButton} onPress={handleAddCar}>
                <Text style={styles.submitButtonText}>Save Car</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Premium Fleet</Text>
          <Text style={styles.headerSubtitle}>Discover your next ride</Text>
        </View>
        <View style={styles.buttonBlock}>
          <Pressable onPress={()=>{
               setModal(true);
          }} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Car</Text>
          </Pressable>
        </View>
        <FlatList
          data={allCars}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F1015',
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#0F1015',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#8A8D9F',
    marginTop: 6,
    fontWeight: '500',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#1E1F29',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2C39',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#373A4F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#8B5CF6',
    fontSize: 22,
    fontWeight: '800',
  },
  titleContainer: {
    flex: 1,
  },
  brandText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  modelText: {
    color: '#8A8D9F',
    fontSize: 15,
    fontWeight: '500',
  },
  yearTag: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  yearText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  cardBody: {
    flexDirection: 'row',
    gap: 10,
  },
  badge: {
    backgroundColor: '#2A2C39',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  colorBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  badgeText: {
    color: '#B0B3C6',
    fontSize: 13,
    fontWeight: '600',
  },
  buttonBlock:{
    paddingHorizontal:20,
    paddingBottom:20
  },
  addButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 10,
    width:"30%",
    height:50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 16, 21, 0.85)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1E1F29',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  modalCloseIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2A2C39',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseIconText: {
    color: '#8A8D9F',
    fontSize: 14,
    fontWeight: '700',
  },
  modalForm: {
    gap: 16,
  },
  input: {
    backgroundColor: '#0F1015',
    borderWidth: 1,
    borderColor: '#2A2C39',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: '#FFFFFF',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  deleteButton: {
    backgroundColor: '#FF4444',
    borderRadius: 10,
    width:"30%",
    height:50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});
