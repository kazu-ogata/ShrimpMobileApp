// app/recover.tsx
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function Recover() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  function sendRecovery() {
    if (!username || !email) return Alert.alert('Missing', 'Enter username and email.');
    Alert.alert('Recovery code sent', 'Check your email for the code.');
    router.push('/verify');
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <LinearGradient colors={['#32996D', '#156043']} style={{ flex: 1, padding: 24 }}>
        <Text style={styles.title}>Recover Password</Text>
        <Image source={require('../assets/images/new.png')} style={styles.illustration} resizeMode="contain" />

        <TextInput placeholder="Username" placeholderTextColor="#d9f0e3" value={username} onChangeText={setUsername} style={styles.input} />
        <TextInput placeholder="Email" placeholderTextColor="#d9f0e3" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />

        <TouchableOpacity style={styles.primaryBtn} onPress={sendRecovery}>
          <Text style={styles.primaryBtnText}>Send Recovery Code</Text>
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
