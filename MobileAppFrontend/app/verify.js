// app/verify.js
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router'; // Import useLocalSearchParams
import apiClient from '@/api/client'; // Assuming alias works
import Toast from 'react-native-toast-message';

export default function Verify() {
  const router = useRouter();
  const params = useLocalSearchParams(); // Get parameters passed from previous screen
  const email = params.email; // Get the email

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  // Refs setup (remains the same)
  const inputRef0 = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const refs = [inputRef0, inputRef1, inputRef2, inputRef3, inputRef4, inputRef5];

  // Add effect to focus first input on mount
  useEffect(() => {
    inputRef0.current?.focus();
  }, []);

  function onChangeText(i, val) {
    if (!/^\d?$/.test(val)) return;
    const next = [...code];
    next[i] = val;
    setCode(next);
    if (val && i < 5) {
      refs[i + 1].current?.focus();
    } else if (!val && i > 0) { // Add backspace functionality
        refs[i - 1].current?.focus();
    }
  }

  async function verifyCode() {
    const enteredCode = code.join('');
    if (enteredCode.length !== 6) {
        return Alert.alert('Missing', 'Complete the 6-digit code.');
    }
    if (!email) {
        // Should not happen if navigation works, but good to check
        return Alert.alert('Error', 'Email address not found. Please go back.');
    }

    setIsLoading(true);
    try {
        // Call backend verification endpoint
        await apiClient.post('/auth/verify-code', { email: email, code: enteredCode });

        Toast.show({
            type: 'success',
            text1: 'Code Verified',
            visibilityTime: 1500,
        });
        // Navigate to reset password screen, passing email and code
        router.push({ pathname: '/reset-password', params: { email: email, code: enteredCode } });

    } catch (error) {
        console.error("Verification error:", error.response?.data || error.message);
        Toast.show({
            type: 'error',
            text1: 'Verification Failed',
            text2: error?.response?.data?.message || 'Invalid or expired code.',
            visibilityTime: 3000,
        });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <LinearGradient colors={['#32996D', '#156043']} style={{ flex: 1, padding: 24 }}>
        <Text style={styles.title}>Verify Code</Text>
        <Image source={require('../assets/images/verify.png')} style={styles.illustration} resizeMode="contain" />
        <Text style={styles.instructions}>Enter the 6-digit code sent to {email || 'your email'}.</Text>

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
              selectTextOnFocus // Improve UX
            />
          ))}
        </View>

        <TouchableOpacity
            style={[styles.primaryBtn, isLoading && styles.disabledBtn]}
            onPress={verifyCode}
            disabled={isLoading}
        >
            {isLoading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={styles.primaryBtnText}>Verify Code</Text>
            )}
        </TouchableOpacity>
        {/* Optional: Add a 'Resend Code' button here */}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: { color: '#fff', fontSize: 35, fontWeight: '700', marginBottom: 15, marginTop: 50 },
  illustration: { width: 250, height: 250, alignSelf: 'center', marginBottom: 12 },
  instructions: { color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginBottom: 20, fontSize: 15 },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, paddingHorizontal: 15 },
  box: { width: 48, height: 65, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.03)', textAlign: 'center', color: '#fff', fontSize: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }, // Added border
  primaryBtn: { backgroundColor: '#FF8C2A', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 20, height: 50, justifyContent: 'center' },
  primaryBtnText: { color: '#fff', fontWeight: '700' },
  disabledBtn: { backgroundColor: '#FF8C2A80' },
});