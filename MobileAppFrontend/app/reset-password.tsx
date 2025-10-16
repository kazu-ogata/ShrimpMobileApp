// app/reset-password.tsx
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function ResetPassword() {
  const router = useRouter();
  const [pw, setPw] = useState('');
  const [confirm, setConfirm] = useState('');

  function onSave() {
    if (!pw || pw !== confirm) return Alert.alert('Error', 'Passwords missing or don’t match.');
    Alert.alert('Success', 'Password changed.');
    router.replace('/login');
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <LinearGradient colors={['#32996D', '#156043']} style={{ flex: 1, padding: 24 }}>
        <Text style={styles.title}>Change Password</Text>
        <Image source={require('../assets/images/recover.png')} style={styles.illustration} resizeMode="contain" />

        <TextInput placeholder="New Password" placeholderTextColor="#d9f0e3" secureTextEntry value={pw} onChangeText={setPw} style={styles.input} />
        <TextInput placeholder="Confirm New Password" placeholderTextColor="#d9f0e3" secureTextEntry value={confirm} onChangeText={setConfirm} style={styles.input} />

        <TouchableOpacity style={styles.primaryBtn} onPress={onSave}>
          <Text style={styles.primaryBtnText}>Save</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: { color: '#fff', fontSize: 35, fontWeight: '700', marginBottom: 15, marginTop: 50 },
  illustration: { width: 250, height: 250, alignSelf: 'center', marginBottom: 12 },
  input: { backgroundColor: 'rgba(255,255,255,0.03)', color: '#fff', borderRadius: 12, padding: 12, marginBottom: 12 },
  primaryBtn: { backgroundColor: '#FF8C2A', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 6 },
  primaryBtnText: { color: '#fff', fontWeight: '700' },
});
