// app/reset-password.js
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router'; // Import useLocalSearchParams
import apiClient from '@/api/client'; // Assuming alias works
import Toast from 'react-native-toast-message';

export default function ResetPassword() {
  const router = useRouter();
  const params = useLocalSearchParams(); // Get parameters
  const email = params.email;
  const code = params.code;

  const [pw, setPw] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function onSave() {
    if (!pw || !confirm) {
        return Alert.alert('Error', 'Please enter and confirm your new password.');
    }
    if (pw !== confirm) {
        return Alert.alert('Error', 'Passwords do not match.');
    }
    if (!email || !code) {
        // Should not happen, but good to check
        return Alert.alert('Error', 'Missing verification details. Please start over.');
    }

    setIsLoading(true);
    try {
        // Call backend reset endpoint
        await apiClient.post('/auth/reset-password', {
            email: email,
            code: code,
            newPassword: pw,
        });

        Toast.show({
            type: 'success',
            text1: 'Password Reset Successful',
            text2: 'You can now log in with your new password.',
            visibilityTime: 3000,
            // Prevent toast from being automatically dismissed
            // onHide: () => { router.replace('/login'); } // Navigate after toast hides
        });
        // Navigate back to login AFTER showing toast
        router.replace('/login');


    } catch (error) {
        console.error("Reset password error:", error.response?.data || error.message);
        Toast.show({
            type: 'error',
            text1: 'Reset Failed',
            text2: error?.response?.data?.message || 'Could not reset password. Please try again.',
            visibilityTime: 4000,
        });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <LinearGradient colors={['#32996D', '#156043']} style={{ flex: 1, padding: 24 }}>
        <Text style={styles.title}>Change Password</Text>
        <Image source={require('../assets/images/recover.png')} style={styles.illustration} resizeMode="contain" />

        <TextInput
            placeholder="New Password"
            placeholderTextColor="#d9f0e3"
            secureTextEntry
            value={pw}
            onChangeText={setPw}
            style={styles.input}
         />
        <TextInput
            placeholder="Confirm New Password"
            placeholderTextColor="#d9f0e3"
            secureTextEntry
            value={confirm}
            onChangeText={setConfirm}
            style={styles.input}
         />

        <TouchableOpacity
            style={[styles.primaryBtn, isLoading && styles.disabledBtn]}
            onPress={onSave}
            disabled={isLoading}
        >
            {isLoading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={styles.primaryBtnText}>Save New Password</Text>
            )}
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: { color: '#fff', fontSize: 35, fontWeight: '700', marginBottom: 15, marginTop: 50 },
  illustration: { width: 250, height: 250, alignSelf: 'center', marginBottom: 12 },
  input: { backgroundColor: 'rgba(255,255,255,0.03)', color: '#fff', borderRadius: 12, padding: 12, marginBottom: 12 },
  primaryBtn: { backgroundColor: '#FF8C2A', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 6, height: 50, justifyContent: 'center' },
  primaryBtnText: { color: '#fff', fontWeight: '700' },
  disabledBtn: { backgroundColor: '#FF8C2A80' },
});