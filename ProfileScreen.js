import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "ratchanon watthanakul",
    email: "ratchanon.wa@kkumail.com",
    phone: "0629145814",
    isAdmin: true, // สมมติว่าผู้ใช้นี้เป็น admin
  });

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    setIsEditing(false);
    console.log("Saving user data:", userData);
  };

  const handleChange = (key, value) => {
    setUserData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleLogout = () => {
    Alert.alert(
      "ยืนยันการออกจากระบบ",
      "คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?",
      [
        {
          text: "ยกเลิก",
          style: "cancel"
        },
        { 
          text: "ออกจากระบบ", 
          onPress: () => {
            // ทำการล้างข้อมูลการล็อกอิน (เช่น ลบ token)
            // แล้วนำทางกลับไปยังหน้าล็อกอิน
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        }
      ]
    );
  };

  const handleAdminMenu = () => {
    navigation.navigate('AdminDashboard'); // สมมติว่ามีหน้า AdminDashboard
  };

  const renderInput = (label, key, keyboardType = "default") => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, !isEditing && styles.disabledInput]}
        value={userData[key]}
        onChangeText={(text) => handleChange(key, text)}
        editable={isEditing}
        keyboardType={keyboardType}
        placeholderTextColor="#A0A0A0"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>โปรไฟล์</Text>
          {isEditing ? (
            <TouchableOpacity style={styles.editButton} onPress={handleSave}>
              <Text style={styles.editButtonText}>บันทึก</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Ionicons name="pencil" size={24} color="#8B4513" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.profileSection}>
          {renderInput("ชื่อ", "name")}
          {renderInput("อีเมล", "email", "email-address")}
          {renderInput("เบอร์โทร", "phone", "phone-pad")}
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>เมนู</Text>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("BookingHistory")}
          >
            <Ionicons name="time-outline" size={24} color="#8B4513" />
            <Text style={styles.menuItemText}>ประวัติการจอง</Text>
            <Ionicons name="chevron-forward" size={24} color="#8B4513" />
          </TouchableOpacity>
          {userData.isAdmin && (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleAdminMenu}
            >
              <Ionicons name="settings-outline" size={24} color="#8B4513" />
              <Text style={styles.menuItemText}>หน้า Admin</Text>
              <Ionicons name="chevron-forward" size={24} color="#8B4513" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={24} color="#D32F2F" />
            <Text style={[styles.menuItemText, styles.logoutText]}>ออกจากระบบ</Text>
            <Ionicons name="chevron-forward" size={24} color="#D32F2F" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F5F0",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#8B4513",
  },
  editButton: {
    padding: 10,
  },
  editButtonText: {
    color: "#8B4513",
    fontSize: 16,
    fontWeight: "600",
  },
  profileSection: {
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#8B4513",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    borderColor: "#D2B48C",
    borderWidth: 1,
    color: "#4A2511",
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: "#F5F1E8",
    color: "#8B4513",
  },
  menuSection: {
    marginBottom: 20,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#8B4513",
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemText: {
    flex: 1,
    color: "#4A2511",
    fontSize: 16,
    marginLeft: 15,
  },
  logoutText: {
    color: "#D32F2F",
  },
});

export default ProfileScreen;