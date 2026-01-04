import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    if (!username || !password) return Alert.alert('Missing', 'Please enter credentials.');
    setIsLoading(true);
    try {
      await signIn(username, password, remember);
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    } finally { setIsLoading(false); }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/images/ShrimpSenseLogo.png')} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
      
      <View style={styles.inputBox}>
        <Ionicons name="person-outline" size={20} color="#1A3A5F" />
        <TextInput placeholder="Username/Email" style={styles.input} value={username} onChangeText={setUsername} autoCapitalize="none" />
      </View>

      <View style={styles.inputBox}>
        <Ionicons name="lock-closed-outline" size={20} color="#1A3A5F" />
        <TextInput placeholder="Password" style={styles.input} secureTextEntry={!showPassword} value={password} onChangeText={setPassword} />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#1A3A5F" />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => setRemember(!remember)} style={styles.checkboxRow}>
          <View style={[styles.checkbox, remember && styles.checkboxChecked]} />
          <Text style={styles.checkboxLabel}>Remember me</Text>
        </TouchableOpacity>
        <Link href="/recover" asChild>
          <TouchableOpacity><Text style={styles.forgot}>Forgot password?</Text></TouchableOpacity>
        </Link>
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleLogin} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color="white" /> : <Text style={styles.btnText}>LOGIN</Text>}
      </TouchableOpacity>

      <View style={styles.centerRow}>
        <Text style={styles.normalText}>Don’t have an account?</Text>
        <Link href="/signup" asChild>
          <TouchableOpacity><Text style={styles.linkText}> Sign Up</Text></TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF7F2', padding: 30, justifyContent: 'center' },
  logo: { width: 100, height: 100, alignSelf: 'center', marginBottom: 10 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1A3A5F', textAlign: 'center', marginBottom: 30 },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, paddingHorizontal: 15, height: 60, marginBottom: 15, borderWidth: 1, borderColor: '#DDD' },
  input: { flex: 1, marginLeft: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center' },
  checkbox: { width: 18, height: 18, borderWidth: 1.5, borderColor: '#1A3A5F', marginRight: 8, borderRadius: 4 },
  checkboxChecked: { backgroundColor: '#1A3A5F' },
  checkboxLabel: { color: '#1A3A5F', fontSize: 14 },
  forgot: { color: '#2A9D8F', fontSize: 14, fontWeight: '600' },
  btn: { backgroundColor: '#1A3A5F', height: 60, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  centerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  normalText: { color: '#1A3A5F', fontSize: 15 },
  linkText: { color: '#2A9D8F', fontWeight: 'bold', fontSize: 15, textDecorationLine: 'underline' }
});