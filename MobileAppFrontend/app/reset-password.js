import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import apiClient from '@/api/client';

const COLORS = { bg: '#FAF7F2', navy: '#1A3A5F', white: '#FFFFFF' };

export default function ResetPassword() {
  const router = useRouter();
  const { email, code } = useLocalSearchParams();
  const [pw, setPw] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function onSave() {
    if (!pw || pw !== confirm) return Alert.alert('Error', 'Passwords do not match.');
    
    setIsLoading(true);
    try {
      await apiClient.post('/auth/reset-password', { email, code, newPassword: pw });
      Alert.alert('Success', 'Password updated successfully!');
      router.replace('/login');
    } catch (error) {
      Alert.alert('Error', 'Could not reset password.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>New Password</Text>
      <Text style={styles.sub}>Please enter your new password below.</Text>

      <View style={styles.inputBox}>
        <TextInput 
            placeholder="New Password" 
            style={styles.input} 
            secureTextEntry 
            value={pw} 
            onChangeText={setPw} 
        />
      </View>

      <View style={styles.inputBox}>
        <TextInput 
            placeholder="Confirm New Password" 
            style={styles.input} 
            secureTextEntry 
            value={confirm} 
            onChangeText={setConfirm} 
        />
      </View>

      <TouchableOpacity style={styles.btn} onPress={onSave} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color="white" /> : <Text style={styles.btnText}>UPDATE PASSWORD</Text>}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, padding: 30, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: COLORS.navy, textAlign: 'center' },
  sub: { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 30 },
  inputBox: { backgroundColor: 'white', borderRadius: 12, paddingHorizontal: 15, height: 60, marginBottom: 15, borderWidth: 1, borderColor: '#DDD', justifyContent: 'center' },
  input: { flex: 1 },
  btn: { backgroundColor: COLORS.navy, height: 60, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 18 }
});