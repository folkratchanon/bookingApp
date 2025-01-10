import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';

const ConfirmationScreen = ({ route, navigation }) => {
  const { massageType, date, startTime, endTime, duration, totalPrice } = route.params;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isPaid, setIsPaid] = useState(false);

  const handleConfirm = () => {
    if (!isPaid) {
      Alert.alert('ยังไม่ได้ชำระเงิน', 'กรุณาชำระเงินก่อนยืนยันการจอง');
      return;
    }

    const newBookingId = Date.now().toString();
    const newBooking = {
      id: newBookingId,
      massageType,
      date,
      startTime,
      endTime,
      duration,
      totalPrice,
      phoneNumber,
      paymentMethod,
      isPaid: true
    };
    
    console.log('Booking confirmed:', newBooking);
    navigation.navigate('BookingList', { newBooking });
  };

  const handlePayment = () => {
    setTimeout(() => {
      setIsPaid(true);
      Alert.alert('การชำระเงินสำเร็จ', 'ขอบคุณสำหรับการชำระเงิน');
    }, 3000);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>สรุปรายละเอียดการจอง</Text>
      
      <View style={styles.detailContainer}>
        <Text style={styles.label}>รายการ:</Text>
        <Text style={styles.value}>{massageType}</Text>
      </View>
      
      <View style={styles.detailContainer}>
        <Text style={styles.label}>วันที่:</Text>
        <Text style={styles.value}>{date}</Text>
      </View>
      
      <View style={styles.detailContainer}>
        <Text style={styles.label}>เวลา:</Text>
        <Text style={styles.value}>{startTime} - {endTime}</Text>
      </View>
      
      <View style={styles.detailContainer}>
        <Text style={styles.label}>จำนวนชั่วโมง:</Text>
        <Text style={styles.value}>{duration}</Text>
      </View>
      
      <View style={styles.detailContainer}>
        <Text style={styles.label}>ราคารวม:</Text>
        <Text style={styles.value}>{totalPrice} บาท</Text>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="เบอร์โทรศัพท์"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      
      <Text style={styles.label}>วิธีการชำระเงิน:</Text>
      <TouchableOpacity
        style={[styles.paymentButton, paymentMethod === 'PromptPay' && styles.selectedPayment]}
        onPress={() => setPaymentMethod('PromptPay')}
      >
        <Text style={[styles.paymentButtonText, paymentMethod === 'PromptPay' && styles.selectedPaymentText]}>PromptPay</Text>
      </TouchableOpacity>
      
      {paymentMethod === 'PromptPay' && (
        <View style={styles.qrContainer}>
          <Image
            source={{ uri: 'https://example.com/qr-promptpay.png' }}
            style={styles.qrImage}
          />
          <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
            <Text style={styles.payButtonText}>ยืนยันการชำระเงิน</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <TouchableOpacity 
        style={[styles.confirmButton, !isPaid && styles.disabledButton]} 
        onPress={handleConfirm}
        disabled={!isPaid}
      >
        <Text style={styles.confirmButtonText}>ยืนยันการจอง</Text>
      </TouchableOpacity>
    </ScrollView>
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
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    color: '#8B4513',
  },
  value: {
    fontSize: 18,
    color: '#4A2511',
  },
  input: {
    backgroundColor: '#FFF8DC',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#8B4513',
    borderWidth: 1,
  },
  paymentButton: {
    backgroundColor: '#D2B48C',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  selectedPayment: {
    backgroundColor: '#8B4513',
  },
  paymentButtonText: {
    color: '#4A2511',
    fontSize: 16,
  },
  selectedPaymentText: {
    color: '#F5F5DC',
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  qrImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  payButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#8B4513',
    padding: 15,
    borderRadius: 10,
  },
  disabledButton: {
    backgroundColor: '#D3D3D3',
  },
  confirmButtonText: {
    color: '#F5F5DC',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ConfirmationScreen;