import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import apiClient from '@/api/client';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Recover() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRecover = async () => {
    if (!email) return Alert.alert('Error', 'Enter email');
    setLoading(true);
    try {
      await apiClient.post('/auth/recover', { email });
      router.push({ pathname: '/verify', params: { email } });
    } catch (e) { Alert.alert('Error', 'Recovery failed'); }
    finally { setLoading(false); }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Recover</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TouchableOpacity style={styles.btn} onPress={handleRecover}>
        {loading ? <ActivityIndicator color="white" /> : <Text style={styles.btnTxt}>SEND CODE</Text>}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF7F2', padding: 30, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1A3A5F', marginBottom: 30 },
  input: { backgroundColor: 'white', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#DDD', marginBottom: 20 },
  btn: { backgroundColor: '#1A3A5F', padding: 18, borderRadius: 12, alignItems: 'center' },
  btnTxt: { color: 'white', fontWeight: 'bold' }
});