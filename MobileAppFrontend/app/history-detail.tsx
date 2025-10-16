// app/history-detail.tsx
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router'; // ✅ correct hook name
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const D: Record<string, any> = {
  '1': { date: 'Sep 30, 2025 8:30 AM', count: '5,000 pcs', biomass: '7.5 g', feed: '11.25 g/day' },
  '2': { date: 'Jun 3, 2025 10:47 AM', count: '7,500 pcs', biomass: '11.25 g', feed: '16.88 g/day' },
  '3': { date: 'Jan 28, 2025 02:25 PM', count: '2,200 pcs', biomass: '3.5 g', feed: '4.62 g/day' },
};

export default function HistoryDetail() {
  const { id } = useLocalSearchParams(); // ✅ fixed
  const item = D[id as string] ?? D['1'];

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <LinearGradient colors={['#32996D', '#156043']} style={{ flex: 1, padding: 20 }}>
        <Text style={styles.title}>Record Details</Text>
        <View style={styles.card}>
          <Text style={styles.line}>Date: {item.date}</Text>
          <Text style={styles.line}>Total PL Shrimp Count: {item.count}</Text>
          <Text style={styles.line}>Total Biomass: {item.biomass}</Text>
          <Text style={styles.line}>Feed Recommendation: {item.feed}</Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: { color: '#fff', fontSize: 24, fontWeight: '700', marginBottom: 12 },
  card: { backgroundColor: 'rgba(255,255,255,0.06)', padding: 12, borderRadius: 10 },
  line: { color: '#fff', marginBottom: 8 },
});
