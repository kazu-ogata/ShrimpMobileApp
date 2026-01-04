import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import apiClient from '@/api/client';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const [data, setData] = useState({ count: '0 pcs', biomass: '0 g', date: 'No records' });
  const [isLoading, setIsLoading] = useState(false);

  const fetchLatest = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const res = await apiClient.get(`/results?ownerId=${user.id}`);
      if (res.data?._id) {
        setData({
          count: `${res.data.shrimpCount.toLocaleString()} pcs`,
          biomass: `${res.data.biomass.toFixed(1)} g`,
          date: `${new Date(res.data.dateTime).toLocaleDateString()} | ${new Date(res.data.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        });
      }
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  };

  useFocusEffect(useCallback(() => { fetchLatest(); }, [user]));

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View><Text style={styles.hi}>Hello,</Text><Text style={styles.un}>{user?.username}</Text></View>
          <TouchableOpacity onPress={() => router.push('/profile')}><MaterialCommunityIcons name="account-circle" size={50} color="#1A3A5F" /></TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.sync} onPress={fetchLatest} disabled={isLoading}>
          <Text style={styles.syncT}>{isLoading ? 'Syncing...' : 'Sync Now'}</Text>
          <Ionicons name="refresh" size={16} color="white" style={{marginLeft:8}} />
        </TouchableOpacity>

        <View style={styles.statContainer}>
          <Text style={styles.lab}>LATEST RECORD</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.box}><Text style={styles.val}>{data.count}</Text><Text style={styles.sub}>SHRIMP COUNT</Text></View>
              <View style={styles.box}><Text style={styles.val}>{data.biomass}</Text><Text style={styles.sub}>BIOMASS</Text></View>
            </View>
            <Text style={styles.dt}>{data.date}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.scanBtn} onPress={() => router.push('/scanner')}>
            <LinearGradient colors={['#1A3A5F', '#2c3e50']} style={styles.grad}>
              <Ionicons name="qr-code-outline" size={30} color="white" />
              <View><Text style={styles.scanT}>CONNECT TO MACHINE</Text><Text style={styles.scanS}>Tap here to scan QR code</Text></View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAF7F2' },
  container: { flex: 1, padding: 25 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  hi: { color: '#555', fontSize: 16 },
  un: { color: '#1A3A5F', fontSize: 28, fontWeight: 'bold' },
  sync: { flexDirection: 'row', backgroundColor: '#1A3A5F', alignSelf: 'center', padding: 12, borderRadius: 25, marginBottom: 30 },
  syncT: { color: 'white', fontWeight: 'bold' },
  statContainer: { flex: 1 },
  lab: { fontSize: 13, fontWeight: 'bold', color: '#555', marginBottom: 15 },
  card: { backgroundColor: 'white', padding: 25, borderRadius: 20, elevation: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-around' },
  box: { alignItems: 'center' },
  val: { fontSize: 24, fontWeight: 'bold', color: '#1A3A5F' },
  sub: { fontSize: 11, color: '#2A9D8F', fontWeight: 'bold' },
  dt: { textAlign: 'center', marginTop: 20, color: '#888', fontSize: 12 },
  footer: { marginBottom: 10 },
  scanBtn: { borderRadius: 15, overflow: 'hidden' },
  grad: { flexDirection: 'row', alignItems: 'center', padding: 20, gap: 15 },
  scanT: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  scanS: { color: 'rgba(255,255,255,0.6)', fontSize: 12 }
});