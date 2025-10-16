// app/_layout.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.safe} edges={[]}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Stack screenOptions={{ headerShown: false, contentStyle: { flex: 1 } }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#32996D' },
  container: { flex: 1 },
});
