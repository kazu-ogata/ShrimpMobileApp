import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import apiClient from '@/api/client';

const COLORS = { bg: '#FAF7F2', navy: '#1A3A5F', aqua: '#2A9D8F', white: '#FFFFFF' };

export default function Verify() {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  useEffect(() => { refs[0].current?.focus(); }, []);

  function onChangeText(i, val) {
    if (!/^\d?$/.test(val)) return;
    const next = [...code];
    next[i] = val;
    setCode(next);
    if (val && i < 5) refs[i + 1].current?.focus();
    else if (!val && i > 0) refs[i - 1].current?.focus();
  }

  async function verifyCode() {
    const enteredCode = code.join('');
    if (enteredCode.length !== 6) return Alert.alert('Error', 'Complete the 6-digit code.');
    
    setIsLoading(true);
    try {
      await apiClient.post('/auth/verify-code', { email, code: enteredCode });
      router.push({ pathname: '/reset-password', params: { email, code: enteredCode } });
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Invalid code.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Verify Code</Text>
      <Text style={styles.sub}>Enter the 6-digit code sent to {email}</Text>

      <View style={styles.inputRow}>
        {code.map((c, i) => (
          <TextInput
            key={i}
            ref={refs[i]}
            value={c}
            onChangeText={(v) => onChangeText(i, v)}
            keyboardType="numeric"
            maxLength={1}
            style={styles.box}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.btn} onPress={verifyCode} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color="white" /> : <Text style={styles.btnText}>VERIFY</Text>}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, padding: 30, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: COLORS.navy, textAlign: 'center' },
  sub: { fontSize: 14, color: '#555', textAlign: 'center', marginVertical: 20 },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  box: { width: 45, height: 60, backgroundColor: 'white', borderRadius: 10, textAlign: 'center', fontSize: 20, fontWeight: 'bold', borderWidth: 1, borderColor: '#DDD', color: COLORS.navy },
  btn: { backgroundColor: COLORS.navy, height: 60, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 18 }
});