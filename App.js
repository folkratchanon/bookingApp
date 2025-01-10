import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import BookingScreen from './BookingScreen';
import ConfirmationScreen from './ConfirmationScreen';
import BookingListScreen from './BookingListScreen';
import ProfileScreen from './ProfileScreen'; 
import BookingHistoryScreen from './BookingHistoryScreen';
import AdminDashboard from './AdminDashboard';
import ManageServicesScreen from './ManageServicesScreen';
import ShopInfoScreen from './ShopInfoScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#8B4513',
        },
        headerTintColor: '#FFF8DC',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          title: 'นวดเพื่อสุขภาพคุณนิ่ม',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="BookingScreen" 
        component={BookingScreen}
        options={{ title: 'จองคิว' }}
      />
      <Stack.Screen 
        name="ConfirmationScreen" 
        component={ConfirmationScreen}
        options={{ title: 'สรุปรายการจอง' }}
      />
      <Stack.Screen name="BookingHistory" component={BookingHistoryScreen} options={{ title: 'ประวัติการจอง' }}/>
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ 
            headerShown: false, // ซ่อน header ทั้งหมด
            
          }} />
      <Stack.Screen name="ManageServices" component={ManageServicesScreen} options={{ title: 'จัดการบริการนวด' }}/>
 
      <Stack.Screen
  name="ShopInfo"
  component={ShopInfoScreen}
  options={{ title: "ข้อมูลร้าน" }}
/>
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'BookingList') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#8B4513',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#FFF8DC',
        },
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStack} 
        options={{ 
          headerShown: false,
          title: 'หน้าหลัก'
        }}
      />
      <Tab.Screen 
        name="BookingList" 
        component={BookingListScreen}
        options={{ title: 'รายการจอง' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'โปรไฟล์' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainApp" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}