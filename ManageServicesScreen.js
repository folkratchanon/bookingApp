import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ManageServicesScreen = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: '', price: '', description: '' });
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    // สมมติว่านี่คือการดึงข้อมูลจาก API
    const fetchServices = () => {
      const mockServices = [
        { id: '1', name: 'นวดแผนไทย', price: '500', description: 'นวดแบบดั้งเดิมของไทย ช่วยผ่อนคลายกล้ามเนื้อ' },
        { id: '2', name: 'นวดน้ำมัน', price: '700', description: 'นวดด้วยน้ำมันหอมระเหย ช่วยบำรุงผิวและผ่อนคลาย' },
        { id: '3', name: 'นวดฝ่าเท้า', price: '400', description: 'นวดกดจุดที่เท้า ช่วยกระตุ้นการไหลเวียนเลือด' },
      ];
      setServices(mockServices);
    };

    fetchServices();
  }, []);

  const addService = () => {
    if (newService.name && newService.price && newService.description) {
      const newId = Date.now().toString();
      setServices([...services, { id: newId, ...newService }]);
      setNewService({ name: '', price: '', description: '' });
    } else {
      Alert.alert('ข้อมูลไม่ครบ', 'กรุณากรอกชื่อบริการ ราคา และรายละเอียด');
    }
  };

  const startEditing = (service) => {
    setEditingService({ ...service });
  };

  const saveEdit = () => {
    if (editingService.name && editingService.price && editingService.description) {
      setServices(services.map(s => s.id === editingService.id ? editingService : s));
      setEditingService(null);
    } else {
      Alert.alert('ข้อมูลไม่ครบ', 'กรุณากรอกชื่อบริการ ราคา และรายละเอียด');
    }
  };

  const deleteService = (id) => {
    Alert.alert(
      "ยืนยันการลบ",
      "คุณแน่ใจหรือไม่ว่าต้องการลบบริการนี้?",
      [
        { text: "ยกเลิก", style: "cancel" },
        { text: "ลบ", onPress: () => setServices(services.filter(s => s.id !== id)) }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.serviceItem}>
      {editingService && editingService.id === item.id ? (
        <View>
          <TextInput
            style={styles.input}
            value={editingService.name}
            onChangeText={(text) => setEditingService({ ...editingService, name: text })}
            placeholder="ชื่อบริการ"
          />
          <TextInput
            style={styles.input}
            value={editingService.price}
            onChangeText={(text) => setEditingService({ ...editingService, price: text })}
            placeholder="ราคา/ชั่วโมง"
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={editingService.description}
            onChangeText={(text) => setEditingService({ ...editingService, description: text })}
            placeholder="รายละเอียดบริการ"
            multiline
          />
          <TouchableOpacity style={styles.saveButton} onPress={saveEdit}>
            <Text style={styles.buttonText}>บันทึก</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceName}>{item.name}</Text>
            <Text style={styles.servicePrice}>{item.price} บาท/ชั่วโมง</Text>
            <Text style={styles.serviceDescription}>{item.description}</Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton} onPress={() => startEditing(item)}>
              <Ionicons name="create-outline" size={24} color="#4A2511" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteService(item.id)}>
              <Ionicons name="trash-outline" size={24} color="#D32F2F" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  const ListHeaderComponent = () => (
    <View style={styles.addServiceForm}>
      <TextInput
        style={styles.input}
        value={newService.name}
        onChangeText={(text) => setNewService({ ...newService, name: text })}
        placeholder="ชื่อบริการใหม่"
      />
      <TextInput
        style={styles.input}
        value={newService.price}
        onChangeText={(text) => setNewService({ ...newService, price: text })}
        placeholder="ราคา/ชั่วโมง"
        keyboardType="numeric"
      />
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        value={newService.description}
        onChangeText={(text) => setNewService({ ...newService, description: text })}
        placeholder="รายละเอียดบริการ"
        multiline
      />
      <TouchableOpacity style={styles.addButton} onPress={addService}>
        <Text style={styles.buttonText}>เพิ่มบริการ</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={ListHeaderComponent}
      data={services}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F5F0',
  },
  contentContainer: {
    padding: 20,
  },
  addServiceForm: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: '#D2B48C',
    borderWidth: 1,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#8B4513',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  serviceItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A2511',
  },
  servicePrice: {
    fontSize: 14,
    color: '#8B4513',
    marginVertical: 5,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#4A2511',
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editButton: {
    marginRight: 10,
  },
  deleteButton: {
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default ManageServicesScreen;