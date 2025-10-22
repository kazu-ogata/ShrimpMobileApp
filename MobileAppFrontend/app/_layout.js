import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@/context/AuthContext';
import '@/utils/layoutAnimationSetup';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#156043', height: 80, width: '90%' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 16, fontWeight: 'bold', color: '#013A2E' }}
      text2Style={{ fontSize: 14, color: '#156043' }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#CC3333', height: 80, width: '90%' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 16, fontWeight: 'bold', color: '#A30000' }}
      text2Style={{ fontSize: 14, color: '#CC3333' }}
    />
  ),
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.safe} edges={[]}>
        <StatusBar style="light" />
        <View style={styles.container}>
          <Stack screenOptions={{ headerShown: false, contentStyle: { flex: 1 } }} />
        </View>
      </SafeAreaView>
      <Toast config={toastConfig} />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#32996D' },
  container: { flex: 1 },
});