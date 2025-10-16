// app/(tabs)/home.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  const oldData = {
    date: 'Jun 3, 2025 | 10:47 AM',
    count: '7,500 pcs',
    biomass: '11.25 g',
    feed: '16.88 g/day',
    protein: '9.29g',
    filler: '7.59g',
  };

  const newData = {
    date: 'Sep 30, 2025 | 8:30 AM',
    count: '5,000 pcs',
    biomass: '7.5 g',
    feed: '11.25 g/day',
    protein: '6.19g',
    filler: '5.06g',
  };

  const [data, setData] = useState(oldData);
  const [synced, setSynced] = useState(false);

  const handleSync = () => {
    setSynced(!synced);
    setData(synced ? oldData : newData);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <LinearGradient colors={['#32996D', '#156043']} style={{ flex: 1, padding: 20 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Hello!</Text>
          <TouchableOpacity onPress={() => router.push('/profile')} style={{ position: 'absolute', right: 1 }}>
            <MaterialCommunityIcons name="account-circle" size={45} color="#013A2E" />
          </TouchableOpacity>
        </View>

        {/* Sync Button */}
        <TouchableOpacity style={styles.syncBtn} onPress={handleSync}>
          <Text style={styles.syncText}>Sync Now</Text>
          <Ionicons name="refresh" size={16} color="#fff" style={{ marginLeft: 6 }} />
        </TouchableOpacity>

        {/* Latest Record (now outside the dashboard) */}
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.recordLabel}>Latest Record</Text>
          <Text style={styles.recordDate}>{data.date}</Text>
        </View>

        {/* Dashboard */}
        <View style={styles.dashboard}>
          {/* Shrimp Count + Biomass */}
          <View style={styles.row}>
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Total Shrimp Count</Text>
              <Text style={styles.cardValue}>{data.count}</Text>
            </View>
            <View style={[styles.card, { marginRight: 0 }]}>
              <Text style={styles.cardLabel}>Total Biomass</Text>
              <Text style={styles.cardValue}>{data.biomass}</Text>
            </View>
          </View>

          {/* Feed Recommendation */}
          <View style={styles.feedCard}>
            <Text style={styles.feedLabel}>Feed Recommendation</Text>
            <Text style={styles.feedValue}>{data.feed}</Text>
            <Text style={styles.feedSub}>
              Protein: {data.protein}   |   Filler: {data.filler}
            </Text>
          </View>
        </View>

        {/* Buttons outside dashboard */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => router.push('/(tabs)/results')}
          >
            <Text style={styles.btnText}>View Result</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => router.push('/(tabs)/history')}
          >
            <Text style={styles.btnText}>View History</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#fff',
  },
  syncBtn: {
    flexDirection: 'row',
    backgroundColor: '#013A2E',
    alignSelf: 'center',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 22,
    alignItems: 'center',
    marginVertical: 18,
    marginBottom: 35,
  },
  syncText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  recordLabel: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  recordDate: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 10,
  },
  dashboard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    height: 120,
    borderWidth: 1,
    borderColor: 'rgba(1,58,46,0.3)',
    borderRadius: 14,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginRight: 10,
  },
  cardLabel: {
    color: '#013A2E',
    fontSize: 13,
  },
  cardValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 10,
  },
  feedCard: {
    borderWidth: 1,
    borderColor: 'rgba(1,58,46,0.3)',
    borderRadius: 14,
    paddingVertical: 25,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginTop: 14,
  },
  feedLabel: {
    color: '#013A2E',
    fontSize: 13,
  },
  feedValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 10,
  },
  feedSub: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  actionBtn: {
    flex: 1,
    backgroundColor: '#013A2E',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
