import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';

const ShopInfoScreen = () => {
  const [shopInfo, setShopInfo] = useState({
    name: 'ร้านนวดเพื่อสุขภาพคุณนิ่ม',
    address: '307 หมู่ที่1 ตำบลบ้านทุ่ม อำเภอเมือง จังหวัดขอนแก่น 40000',
    phone: '02-123-4567',
    openingHours: '09:00 - 18:00',
    image: 'https://www.sotraveler.com/wp-content/uploads/2019/11/Massages-in-Bangkok-2-700x458.jpg' // URL ของรูปภาพ
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({ ...shopInfo });

  useEffect(() => {
    // ในอนาคตอาจจะดึงข้อมูลจาก API ตรงนี้
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedInfo({ ...shopInfo });
  };

  const handleSave = () => {
    // ในอนาคตอาจจะส่งข้อมูลไปยัง API ตรงนี้
    setShopInfo(editedInfo);
    setIsEditing(false);
    Alert.alert('บันทึกสำเร็จ', 'ข้อมูลร้านได้รับการอัปเดตแล้ว');
  };

  const renderContent = () => {
    if (isEditing) {
      return (
        <View>
          <Image source={{ uri: shopInfo.image }} style={styles.image} />
          <TextInput
            style={styles.input}
            value={editedInfo.name}
            onChangeText={(text) => setEditedInfo({ ...editedInfo, name: text })}
            placeholder="ชื่อร้าน"
          />
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={editedInfo.address}
            onChangeText={(text) => setEditedInfo({ ...editedInfo, address: text })}
            placeholder="ที่อยู่ร้าน"
            multiline
          />
          <TextInput
            style={styles.input}
            value={editedInfo.phone}
            onChangeText={(text) => setEditedInfo({ ...editedInfo, phone: text })}
            placeholder="เบอร์โทร"
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            value={editedInfo.openingHours}
            onChangeText={(text) => setEditedInfo({ ...editedInfo, openingHours: text })}
            placeholder="เวลาทำการ"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>บันทึก</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <Image source={{ uri: shopInfo.image }} style={styles.image} />
          <Text style={styles.label}>ชื่อร้าน:</Text>
          <Text style={styles.info}>{shopInfo.name}</Text>
          <Text style={styles.label}>ที่อยู่ร้าน:</Text>
          <Text style={styles.info}>{shopInfo.address}</Text>
          <Text style={styles.label}>เบอร์โทร:</Text>
          <Text style={styles.info}>{shopInfo.phone}</Text>
          <Text style={styles.label}>เวลาทำการ:</Text>
          <Text style={styles.info}>{shopInfo.openingHours}</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.editButtonText}>แก้ไขข้อมูล</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      {renderContent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F5F0',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    color: '#4A2511',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: '#D2B48C',
    borderWidth: 1,
    fontSize: 16,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  editButton: {
    backgroundColor: '#8B4513',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ShopInfoScreen;