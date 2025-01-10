import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ต้องติดตั้ง expo-vector-icons ก่อน

const BookingHistoryScreen = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // จำลองการดึงข้อมูลจาก API
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    // ข้อมูลจำลอง
    const mockBookings = [
      { id: '1', type: 'นวดแผนไทย', date: '15 ต.ค. 2024', time: '10:00', status: 'completed', price: '500฿' },
      { id: '2', type: 'นวดน้ำมันอโรมา', date: '18 ต.ค. 2024', time: '14:00', status: 'cancelled', price: '800฿' },
      { id: '3', type: 'นวดฝ่าเท้า', date: '20 ต.ค. 2024', time: '16:00', status: 'completed', price: '400฿' },
    ];
    setBookings(mockBookings);
  };

  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingItem}>
      <View style={styles.bookingHeader}>
        <Text style={styles.bookingType}>{item.type}</Text>
        <Text style={[
          styles.bookingStatus,
          item.status === 'completed' ? styles.completedStatus : styles.cancelledStatus
        ]}>
          {item.status === 'completed' ? 'เสร็จสิ้น' : 'ยกเลิก'}
        </Text>
      </View>
      <View style={styles.bookingDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="calendar-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="cash-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{item.price}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ประวัติการจอง</Text>
      <FlatList
        data={bookings}
        renderItem={renderBookingItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  bookingItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bookingType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bookingStatus: {
    fontSize: 14,
    fontWeight: '600',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  completedStatus: {
    backgroundColor: '#E6F7ED',
    color: '#0C6B3D',
  },
  cancelledStatus: {
    backgroundColor: '#FFEAEA',
    color: '#D64545',
  },
  bookingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#666',
  },
});

export default BookingHistoryScreen;