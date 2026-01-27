import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { PieChart } from 'react-native-chart-kit';
import { useAuth } from '@/context/AuthContext';
import apiClient from '@/api/client';

const screenWidth = Dimensions.get('window').width;

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ 
    count: 0, biomass: 0, date: '-', feed: 0, protein: 0, filler: 0 
  });

  const fetchLatest = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const res = await apiClient.get(`/results?ownerId=${user.id}`);
      if (res.data?._id) {
        const count = res.data.shrimpCount || 0;
        const biomass = count * 0.01;
        const feed = biomass * 0.06;
        setData({
          count: count,
          biomass: biomass.toFixed(2),
          feed: feed.toFixed(2),
          protein: (feed * 0.55).toFixed(2),
          filler: (feed * 0.45).toFixed(2),
          date: `${new Date(res.data.dateTime).toLocaleDateString()} | ${new Date(res.data.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`
        });
      }
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  };

  useFocusEffect(useCallback(() => { fetchLatest(); }, [user]));

  const pieData = [
    { name: '% Protein', population: 55, color: '#2A9D8F', legendFontColor: '#333', legendFontSize: 12 },
    { name: '% Filler', population: 45, color: '#0D3D45', legendFontColor: '#333', legendFontSize: 12 },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.hi}>Hello!</Text>
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <MaterialCommunityIcons name="account-circle-outline" size={45} color="#000" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.syncBtn} onPress={fetchLatest}>
          <Text style={styles.syncText}>{isLoading ? 'Syncing...' : 'Sync Now'}</Text>
          <Ionicons name="refresh" size={18} color="white" style={{marginLeft: 8}} />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Latest Record</Text>
        <Text style={styles.dateTimeText}>{data.date}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statsCard}><Text style={styles.statsLabel}>Total Shrimp Count</Text><Text style={styles.statsValue}>{data.count}</Text><Text style={styles.unit}>pcs</Text></View>
          <View style={styles.statsCard}><Text style={styles.statsLabel}>Total Biomass</Text><Text style={styles.statsValue}>{data.biomass}</Text><Text style={styles.unit}>g</Text></View>
        </View>

        <View style={styles.feedCard}>
          <Text style={styles.feedTitle}>Feed Recommendation</Text>
          <Text style={styles.feedMainValue}>{data.feed} g/day</Text>
          <PieChart 
            data={pieData} 
            width={screenWidth - 80} 
            height={150} 
            chartConfig={{ color: (o = 1) => `rgba(13, 61, 69, ${o})` }} 
            accessor="population" 
            backgroundColor="transparent" 
            paddingLeft="15" 
            absolute 
          />
          <Text style={styles.feedSubText}>Protein: {data.protein}g | Filler: {data.filler}g</Text>
        </View>

        <TouchableOpacity style={styles.viewHistoryBtn} onPress={() => router.push('/history')}>
          <Text style={styles.viewHistoryText}>View History</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAF7F2' },
  scrollContent: { padding: 25 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  hi: { fontSize: 36, fontWeight: 'bold', color: '#000' },
  syncBtn: { backgroundColor: '#0D3D45', flexDirection: 'row', alignSelf: 'center', paddingVertical: 10, paddingHorizontal: 25, borderRadius: 25, marginBottom: 25 },
  syncText: { color: 'white', fontWeight: 'bold' },
  sectionTitle: { fontSize: 14, fontWeight: 'bold' },
  dateTimeText: { fontSize: 12, color: '#666', marginBottom: 15 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  statsCard: { backgroundColor: 'white', width: '48%', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: '#0D3D45', alignItems: 'center' },
  statsLabel: { fontSize: 11, color: '#0D3D45', fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  statsValue: { fontSize: 22, fontWeight: 'bold' },
  unit: { fontSize: 12, fontWeight: 'bold' },
  feedCard: { backgroundColor: 'white', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: '#0D3D45', alignItems: 'center', marginBottom: 20 },
  feedTitle: { fontSize: 12, fontWeight: 'bold', color: '#0D3D45', marginBottom: 5 },
  feedMainValue: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  feedSubText: { fontSize: 11, fontWeight: 'bold', marginTop: 10 },
  viewHistoryBtn: { backgroundColor: '#0D3D45', padding: 15, borderRadius: 12, alignItems: 'center' },
  viewHistoryText: { color: 'white', fontWeight: 'bold' }
});