import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const BookingListScreen = ({ navigation, route }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // ตรวจสอบว่ามีข้อมูลการจองใหม่จาก ConfirmationScreen หรือไม่
    if (route.params?.newBooking) {
      setBookings(prevBookings => [...prevBookings, route.params.newBooking]);
    }
  }, [route.params?.newBooking]);

  const handleCancelBooking = (bookingId) => {
    Alert.alert(
      "ยืนยันการยกเลิก",
      "คุณแน่ใจหรือไม่ที่จะยกเลิกการจองนี้?",
      [
        { text: "ไม่", style: "cancel" },
        { text: "ใช่", onPress: () => {
          // ลบการจองออกจากรายการ
          setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
          // ในสถานการณ์จริง คุณอาจต้องส่งคำขอไปยัง API เพื่อยกเลิกการจองในฐานข้อมูล
        }}
      ]
    );
  };

  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingItem}>
      <Text style={styles.massageType}>{item.massageType}</Text>
      <Text style={styles.dateTime}>{item.date} | {item.startTime} - {item.endTime}</Text>
      <Text style={styles.duration}>ระยะเวลา: {item.duration} ชั่วโมง</Text>
      <Text style={styles.price}>ราคารวม: {item.totalPrice} บาท</Text>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => handleCancelBooking(item.id)}
      >
        <Text style={styles.cancelButtonText}>ยกเลิกการจอง</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>รายการจองของคุณ</Text>
      {bookings.length > 0 ? (
        <FlatList
          data={bookings}
          renderItem={renderBookingItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noBookingsText}>คุณยังไม่มีการจอง</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5DC',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  bookingItem: {
    backgroundColor: '#FFF8DC',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#8B4513',
    borderWidth: 1,
  },
  massageType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 5,
  },
  dateTime: {
    fontSize: 16,
    color: '#4A2511',
    marginBottom: 5,
  },
  duration: {
    fontSize: 16,
    color: '#4A2511',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#D2691E',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#F5F5DC',
    fontWeight: 'bold',
  },
  noBookingsText: {
    fontSize: 18,
    color: '#8B4513',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BookingListScreen;