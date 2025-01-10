import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleAuth = () => {
    if (isLogin) {
      // Handle login
      console.log('Logging in with:', email, password);
      navigation.navigate('MainApp');
    } else {
      // Handle sign up
      console.log('Signing up with:', name, email, password);
      // After successful sign up, you might want to automatically log in the user
      navigation.navigate('MainApp');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://example.com/spa-background.jpg' }}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.overlay}>
          <Text style={styles.logo}>ร้านนวดคุณนิ่ม</Text>
          <View style={styles.formContainer}>
            <Text style={styles.title}>{isLogin ? 'Welcome' : 'Create Account'}</Text>
            
            {!isLogin && (
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={24} color="#8B4513" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor="#8B4513"
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={24} color="#8B4513" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#8B4513"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={24} color="#8B4513" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#8B4513"
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleAuth}>
              <Text style={styles.buttonText}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
              <Text style={styles.switchText}>
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 248, 220, 0.9)',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#8B4513',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#8B4513',
    fontSize: 16,
    padding: 10,
  },
  button: {
    backgroundColor: '#8B4513',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF8DC',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchText: {
    color: '#8B4513',
    textAlign: 'center',
    marginTop: 20,
  },
});