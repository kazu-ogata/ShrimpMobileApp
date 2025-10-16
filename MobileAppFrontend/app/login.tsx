import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, Alert, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin() {
    if (!username || !password) {
      return Alert.alert('Missing', 'Please enter username and password.');
    }
    router.replace('/(tabs)/home');
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <LinearGradient colors={['#32996D', '#156043']} style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <View style={styles.container}>
            {/* Title */}
            <Text style={styles.title}>Login</Text>

            {/* Username Field */}
            <View style={styles.inputContainer}>
              <Ionicons name="person" size={20} color="#013A2E" style={styles.iconLeft} />
              <TextInput
                placeholder="Username/Email"
                placeholderTextColor="#013A2E"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
              />
            </View>

            {/* Password Field */}
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed" size={20} color="#013A2E" style={styles.iconLeft} />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#013A2E"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                style={styles.input}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#013A2E" />
              </TouchableOpacity>
            </View>

            {/* Remember me + Forgot Password */}
            <View style={styles.row}>
              <TouchableOpacity onPress={() => setRemember(!remember)} style={styles.checkboxRow}>
                <View style={[styles.checkbox, remember && styles.checkboxChecked]} />
                <Text style={styles.checkboxLabel}>Remember me</Text>
              </TouchableOpacity>

              <Link href="/recover" asChild>
                <TouchableOpacity>
                  <Text style={styles.forgot}>Forgot password?</Text>
                </TouchableOpacity>
              </Link>
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
              <Text style={styles.loginBtnText}>LOGIN</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.centerRow}>
              <Text style={styles.normalText}>Don’t have an account?</Text>
              <Link href="/signup" asChild>
                <TouchableOpacity>
                  <Text style={styles.linkText}> Sign Up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#013A2E',
    fontWeight: '900',
    marginBottom: 40,
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#013A2E',
    borderBottomWidth: 1.2,
    marginBottom: 24,
    width: 320,
    paddingBottom: 6,
  },
  iconLeft: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#013A2E',
    fontSize: 16,
    paddingVertical: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 320,
    marginBottom: 24,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1.3,
    borderColor: '#013A2E',
    marginRight: 6,
  },
  checkboxChecked: {
    backgroundColor: '#013A2E',
  },
  checkboxLabel: {
    color: '#013A2E',
    fontSize: 13,
  },
  forgot: {
    color: '#013A2E',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  loginBtn: {
    backgroundColor: '#013A2E',
    borderRadius: 6,
    paddingVertical: 13,
    alignItems: 'center',
    width: 320,
    marginTop: 10,
  },
  loginBtnText: {
    color: '#D9F0E3',
    fontSize: 16,
    fontWeight: '700',
  },
  centerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  normalText: {
    color: '#013A2E',
    fontSize: 13,
  },
  linkText: {
    color: '#013A2E',
    fontWeight: '700',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
});
