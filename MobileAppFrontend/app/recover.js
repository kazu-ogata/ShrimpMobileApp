// app/recover.js
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import apiClient from '@/api/client'; // Assuming alias works
import Toast from 'react-native-toast-message';

export default function Recover() {
  const router = useRouter();
  // Removed username state, assuming recovery via email only for simplicity
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function sendRecovery() {
    if (!email) {
        return Alert.alert('Missing', 'Please enter your email address.');
    }

    setIsLoading(true);
    try {
        // Call the new backend endpoint
        const response = await apiClient.post('/auth/recover', { email });

        Toast.show({
            type: 'success',
            text1: 'Check Your Email',
            text2: response.data.message, // Use message from backend
            visibilityTime: 4000,
        });
        // Navigate to verify screen, passing email along
        router.push({ pathname: '/verify', params: { email: email } });

    } catch (error) {
        console.error("Recovery error:", error.response?.data || error.message);
        Toast.show({
            type: 'error',
            text1: 'Recovery Failed',
            // Use backend error message if available, otherwise generic
            text2: error?.response?.data?.message || 'Could not send recovery code. Please try again.',
            visibilityTime: 4000,
        });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <LinearGradient colors={['#32996D', '#156043']} style={{ flex: 1, padding: 24 }}>
        <Text style={styles.title}>Recover Password</Text>
        <Image source={require('../assets/images/new.png')} style={styles.illustration} resizeMode="contain" />

        {/* Removed Username Input */}
        <TextInput
            placeholder="Email"
            placeholderTextColor="#d9f0e3"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
         />

        <TouchableOpacity
            style={[styles.primaryBtn, isLoading && styles.disabledBtn]} // Style disabled button
            onPress={sendRecovery}
            disabled={isLoading}
        >
            {isLoading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={styles.primaryBtnText}>Send Recovery Code</Text>
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
  primaryBtn: { backgroundColor: '#FF8C2A', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 6, height: 50, justifyContent: 'center' }, // Added height for indicator
  primaryBtnText: { color: '#fff', fontWeight: '700' },
  disabledBtn: { backgroundColor: '#FF8C2A80' }, // Semi-transparent orange when disabled
});