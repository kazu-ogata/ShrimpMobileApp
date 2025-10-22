import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import apiClient from '@/api/client';

const initialData = {
  date: 'No data found', count: '0 pcs', biomass: '0 g',
  feed: '0 g/day', protein: '0g', filler: '0g',
};

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchAndSetData = async () => {
        if (!user) {
          setData(initialData);
          setIsLoading(false);
          return;
        }
        setIsLoading(true);
        try {
          const response = await apiClient.get(`/results?ownerId=${user.id}`);
          const record = response.data;

          if (record && record._id) {
            const date = new Date(record.dateTime);
            const MOCK_PROTEIN_PERCENT = 0.55;
            const MOCK_FILLER_PERCENT = 0.45;
            const proteinGrams = record.feedMeasurement * MOCK_PROTEIN_PERCENT;
            const fillerGrams = record.feedMeasurement * MOCK_FILLER_PERCENT;

            setData({
              date: `${date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} | ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`,
              count: `${record.shrimpCount.toLocaleString()} pcs`,
              biomass: `${record.biomass.toFixed(1)} g`,
              feed: `${record.feedMeasurement.toFixed(2)} g/day`,
              protein: `${proteinGrams.toFixed(2)}g`,
              filler: `${fillerGrams.toFixed(2)}g`,
            });
          } else {
            setData(initialData);
          }
        } catch (error) {
          console.error('Failed to fetch latest record', error);
          setData(initialData);
        } finally {
          setIsLoading(false);
        }
      };
      fetchAndSetData();
    }, [user])
  );

  const fetchLatestRecord = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
          const response = await apiClient.get(`/results?ownerId=${user.id}`);
          const record = response.data;
          if (record && record._id) {
              const date = new Date(record.dateTime);
              const MOCK_PROTEIN_PERCENT = 0.55;
              const MOCK_FILLER_PERCENT = 0.45;
              const proteinGrams = record.feedMeasurement * MOCK_PROTEIN_PERCENT;
              const fillerGrams = record.feedMeasurement * MOCK_FILLER_PERCENT;
              setData({
                  date: `${date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} | ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`,
                  count: `${record.shrimpCount.toLocaleString()} pcs`,
                  biomass: `${record.biomass.toFixed(1)} g`,
                  feed: `${record.feedMeasurement.toFixed(2)} g/day`,
                  protein: `${proteinGrams.toFixed(2)}g`,
                  filler: `${fillerGrams.toFixed(2)}g`,
              });
          } else {
              setData(initialData);
          }
      } catch (error) {
          console.error('Failed to fetch latest record during sync', error);
          setData(initialData);
      } finally {
          setIsLoading(false);
      }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <LinearGradient colors={['#32996D', '#156043']} style={{ flex: 1, padding: 20 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Hello!</Text>
          <TouchableOpacity onPress={() => router.push('/profile')} style={{ position: 'absolute', right: 1 }}>
            <MaterialCommunityIcons name="account-circle" size={45} color="#013A2E" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.syncBtn} onPress={fetchLatestRecord} disabled={isLoading}>
          <Text style={styles.syncText}>{isLoading ? 'Syncing...' : 'Sync Now'}</Text>
          {isLoading ? <ActivityIndicator size="small" color="#fff" style={{ marginLeft: 6 }} /> : <Ionicons name="refresh" size={16} color="#fff" style={{ marginLeft: 6 }} />}
        </TouchableOpacity>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.recordLabel}>Latest Record</Text>
          <Text style={styles.recordDate}>{data.date}</Text>
        </View>
        <View style={styles.dashboard}>
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
          <View style={styles.feedCard}>
            <Text style={styles.feedLabel}>Feed Recommendation</Text>
            <Text style={styles.feedValue}>{data.feed}</Text>
            <Text style={styles.feedSub}>Protein: {data.protein} | Filler: {data.filler}</Text>
          </View>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('/(tabs)/results')}>
            <Text style={styles.btnText}>View Result</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('/(tabs)/history')}>
            <Text style={styles.btnText}>View History</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, },
  title: { fontSize: 34, fontWeight: '800', color: '#fff', },
  syncBtn: { flexDirection: 'row', backgroundColor: '#013A2E', alignSelf: 'center', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 22, alignItems: 'center', marginVertical: 18, marginBottom: 35, },
  syncText: { color: '#fff', fontWeight: '700', fontSize: 14, },
  recordLabel: { color: '#fff', fontSize: 13, fontWeight: '600', },
  recordDate: { color: '#fff', fontSize: 13, marginBottom: 10, },
  dashboard: { backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 18, padding: 18, marginBottom: 20, },
  row: { flexDirection: 'row', justifyContent: 'space-between', },
  card: { flex: 1, height: 120, borderWidth: 1, borderColor: 'rgba(1,58,46,0.3)', borderRadius: 14, paddingVertical: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.2)', marginRight: 10, },
  cardLabel: { color: '#013A2E', fontSize: 13, },
  cardValue: { color: '#fff', fontSize: 22, fontWeight: '800', marginTop: 10, },
  feedCard: { borderWidth: 1, borderColor: 'rgba(1,58,46,0.3)', borderRadius: 14, paddingVertical: 25, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', marginTop: 14, },
  feedLabel: { color: '#013A2E', fontSize: 13, },
  feedValue: { color: '#fff', fontSize: 22, fontWeight: '800', marginTop: 10, },
  feedSub: { color: '#fff', fontSize: 12, marginTop: 4, },
  buttonRow: { flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', },
  actionBtn: { flex: 1, backgroundColor: '#013A2E', borderRadius: 10, paddingVertical: 12, alignItems: 'center', marginHorizontal: 5, },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 14, },
});