import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const BookingScreen = ({ route, navigation }) => {
  const { massageType, price } = route.params;
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [duration, setDuration] = useState(1);
  const [totalPrice, setTotalPrice] = useState(parseInt(price));

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleStartTimeChange = (selectedTime) => {
    setStartTime(selectedTime);
    if (timeToMinutes(selectedTime) >= timeToMinutes(endTime)) {
      const newEndTime = addHourToTime(selectedTime, 1);
      setEndTime(newEndTime);
    }
    calculateDuration(selectedTime, endTime);
  };

  const handleEndTimeChange = (selectedTime) => {
    if (timeToMinutes(selectedTime) <= timeToMinutes(startTime)) {
      Alert.alert("ไม่สามารถเลือกเวลาสิ้นสุดก่อนเวลาเริ่มต้นได้");
      return;
    }
    setEndTime(selectedTime);
    calculateDuration(startTime, selectedTime);
  };

  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const addHourToTime = (time, hoursToAdd) => {
    const [hours, minutes] = time.split(':').map(Number);
    const newHours = (hours + hoursToAdd) % 24;
    return `${newHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const calculateDuration = (start, end) => {
    const startMinutes = timeToMinutes(start);
    const endMinutes = timeToMinutes(end);
    let durationMinutes = endMinutes - startMinutes;
    if (durationMinutes < 0) {
      durationMinutes += 24 * 60; // Add 24 hours if end time is on the next day
    }
    const durationHours = durationMinutes / 60;
    setDuration(durationHours);
    setTotalPrice(Math.round(parseInt(price) * durationHours));
  };

  useEffect(() => {
    calculateDuration(startTime, endTime);
  }, [startTime, endTime]);

  const handleBooking = () => {
    navigation.navigate('ConfirmationScreen', {
      massageType,
      date: date.toLocaleDateString(),
      startTime,
      endTime,
      duration,
      totalPrice,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>จองคิว {massageType}</Text>
      
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateButtonText}>เลือกวันที่: {date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={new Date()}
        />
      )}

      <View style={styles.timeContainer}>
        <Text style={styles.label}>เลือกเวลาเริ่มต้น:</Text>
        <View style={styles.timeButtonContainer}>
          {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map((timeSlot) => (
            <TouchableOpacity
              key={timeSlot}
              style={[styles.timeButton, startTime === timeSlot && styles.selectedTime]}
              onPress={() => handleStartTimeChange(timeSlot)}
            >
              <Text style={[styles.timeButtonText, startTime === timeSlot && styles.selectedTimeText]}>{timeSlot}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.label}>เลือกเวลาสิ้นสุด:</Text>
        <View style={styles.timeButtonContainer}>
          {['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map((timeSlot) => (
            <TouchableOpacity
              key={timeSlot}
              style={[styles.timeButton, endTime === timeSlot && styles.selectedTime]}
              onPress={() => handleEndTimeChange(timeSlot)}
              disabled={timeToMinutes(timeSlot) <= timeToMinutes(startTime)}
            >
              <Text style={[
                styles.timeButtonText, 
                endTime === timeSlot && styles.selectedTimeText,
                timeToMinutes(timeSlot) <= timeToMinutes(startTime) && styles.disabledTimeText
              ]}>
                {timeSlot}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.durationContainer}>
        <Text style={styles.label}>ระยะเวลา:</Text>
        <Text style={styles.duration}>{duration} ชั่วโมง</Text>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.label}>ราคารวม:</Text>
        <Text style={styles.price}>{totalPrice} บาท</Text>
      </View>

      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <Text style={styles.bookButtonText}>ยืนยันการจอง</Text>
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
  dateButton: {
    backgroundColor: '#D2B48C',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  dateButtonText: {
    color: '#4A2511',
    fontSize: 16,
    textAlign: 'center',
  },
  timeContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#8B4513',
    marginBottom: 10,
  },
  timeButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeButton: {
    backgroundColor: '#D2B48C',
    padding: 15,
    borderRadius: 10,
    margin: 5,
  },
  selectedTime: {
    backgroundColor: '#8B4513',
  },
  timeButtonText: {
    color: '#4A2511',
    fontSize: 16,
    textAlign: 'center',
  },
  selectedTimeText: {
    color: '#F5F5DC',
  },
  durationContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  duration: {
    fontSize: 18,
    color: '#8B4513',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  bookButton: {
    backgroundColor: '#8B4513',
    padding: 15,
    borderRadius: 10,
  },
  bookButtonText: {
    color: '#F5F5DC',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disabledTimeText: {
    color: '#A0A0A0',
  },
});

export default BookingScreen;
