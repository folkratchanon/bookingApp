import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomerInfoScreen = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // ในอนาคตคุณจะดึงข้อมูลจาก API ที่นี่
    // สำหรับตอนนี้เราจะใช้ข้อมูลจำลอง
    const mockCustomers = [
      { id: '1', name: 'จอห์น โด', phone: '081-234-5678' },
      { id: '2', name: 'เจน โด', phone: '089-876-5432' },
      { id: '3', name: 'บ็อบ สมิธ', phone: '062-345-6789' },
      { id: '4', name: 'อลิซ จอห์นสัน', phone: '091-234-5678' },
      { id: '5', name: 'ชาลี บราวน์', phone: '083-456-7890' },
    ];
    setCustomers(mockCustomers);
  }, []);

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  const renderCustomerItem = ({ item }) => (
    <View style={styles.customerItem}>
      <Text style={styles.customerName}>{item.name}</Text>
      <Text style={styles.customerPhone}>{item.phone}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#8B4513" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="ค้นหาชื่อหรือเบอร์โทร"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredCustomers}
        renderItem={renderCustomerItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F5F0',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    color: '#4A2511',
  },
  list: {
    flex: 1,
  },
  customerItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A2511',
    marginBottom: 4,
  },
  customerPhone: {
    fontSize: 14,
    color: '#8B4513',
  },
});

export default CustomerInfoScreen;