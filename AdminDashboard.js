import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

// นำเข้า Screens
import ShopInfoScreen from './ShopInfoScreen';
import ManageServicesScreen from './ManageServicesScreen';
import CustomerInfoScreen from './CustomerInfoScreen'; // เพิ่มการนำเข้า CustomerInfoScreen

const Stack = createStackNavigator();

// หน้าหลักของ Admin Dashboard
const AdminDashboardHome = ({ navigation }) => {
  const MenuItem = ({ title, icon, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Ionicons name={icon} size={24} color="#8B4513" />
      <Text style={styles.menuItemText}>{title}</Text>
      <Ionicons name="chevron-forward" size={24} color="#8B4513" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <View style={styles.menuSection}>
          <MenuItem
            title="ตารางคิวนวด"
            icon="calendar-outline"
            onPress={() => navigation.navigate("MassageSchedule")}
          />
          <MenuItem
            title="จัดการบริการนวด"
            icon="list-outline"
            onPress={() => navigation.navigate("ManageServices")}
          />
          <MenuItem
            title="ข้อมูลร้าน"
            icon="business-outline"
            onPress={() => navigation.navigate("ShopInfo")}
          />
          <MenuItem
            title="สถิติ"
            icon="stats-chart-outline"
            onPress={() => navigation.navigate("Statistics")}
          />
          <MenuItem
            title="ข้อมูลลูกค้า"
            icon="people-outline"
            onPress={() => navigation.navigate("CustomerInfo")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// หน้าย่อยต่างๆ (ตัวอย่างเบื้องต้น สำหรับหน้าที่ยังไม่ได้สร้างเป็นไฟล์แยก)
const MassageScheduleScreen = () => (
  <View style={styles.screenContainer}>
    <Text>ตารางคิวนวด</Text>
  </View>
);

const StatisticsScreen = () => (
  <View style={styles.screenContainer}>
    <Text>สถิติ</Text>
  </View>
);

// AdminDashboard Navigator
const AdminDashboard = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#8B4513",
        },
        headerTintColor: "#FFF8DC",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="AdminDashboardHome"
        component={AdminDashboardHome}
        options={{ title: "Admin Dashboard" }}
      />
      <Stack.Screen
        name="MassageSchedule"
        component={MassageScheduleScreen}
        options={{ title: "ตารางคิวนวด" }}
      />
      <Stack.Screen
        name="ManageServices"
        component={ManageServicesScreen}
        options={{ title: "จัดการบริการนวด" }}
      />
      <Stack.Screen
        name="ShopInfo"
        component={ShopInfoScreen}
        options={{ title: "ข้อมูลร้าน" }}
      />
      <Stack.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{ title: "สถิติ" }}
      />
      <Stack.Screen
        name="CustomerInfo"
        component={CustomerInfoScreen}
        options={{ title: "ข้อมูลลูกค้า" }}
      />
    </Stack.Navigator>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#8B4513",
    marginBottom: 20,
  },
  menuSection: {
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
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
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F5F0",
  },
});

export default AdminDashboard;
