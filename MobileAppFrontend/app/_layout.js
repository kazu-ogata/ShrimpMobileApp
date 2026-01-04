import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@/context/AuthContext';
import '@/utils/layoutAnimationSetup';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.safe} edges={[]}>
        <StatusBar style="dark" />
        <View style={styles.container}>
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#FAF7F2' } }} />
        </View>
      </SafeAreaView>
      <Toast />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAF7F2' },
  container: { flex: 1 },
});
