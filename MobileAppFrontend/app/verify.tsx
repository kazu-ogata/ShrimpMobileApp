// app/verify.tsx
import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function Verify() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const refs = Array.from({ length: 6 }, () => useRef<TextInput>(null));

  function onChangeText(i: number, val: string) {
    if (!/^\d?$/.test(val)) return;
    const next = [...code];
    next[i] = val;
    setCode(next);
    if (val && i < 5) refs[i + 1].current?.focus();
  }

  function verifyCode() {
    if (code.some((c) => c === '')) return Alert.alert('Missing', 'Complete the 6-digit code.');
    Alert.alert('Verified', 'Code verified.');
    router.push('/reset-password');
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <LinearGradient colors={['#32996D', '#156043']} style={{ flex: 1, padding: 24 }}>
        <Text style={styles.title}>Verify Code</Text>
        <Image source={require('../assets/images/verify.png')} style={styles.illustration} resizeMode="contain" />

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

        <TouchableOpacity style={styles.primaryBtn} onPress={verifyCode}>
          <Text style={styles.primaryBtnText}>Verify Code</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: { color: '#fff', fontSize: 35, fontWeight: '700', marginBottom: 15, marginTop: 50},
  illustration: { width: 250, height: 250, alignSelf: 'center', marginBottom: 12 },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, paddingHorizontal: 15 },
  box: { width: 48, height: 65, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.03)', textAlign: 'center', color: '#fff', fontSize: 20 },
  primaryBtn: { backgroundColor: '#FF8C2A', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  primaryBtnText: { color: '#fff', fontWeight: '700' },
});
