import React, { useState, useCallback } from 'react';
import { View, Text, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PieChart } from 'react-native-chart-kit';
import { useFocusEffect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import apiClient from '@/api/client';

const screenWidth = Dimensions.get('window').width;

export default function Results() {
  const [isLoading, setIsLoading] = useState(true);
  const [record, setRecord] = useState({ count: '0', biomass: '0', date: '---', time: '---', protein: 55, filler: 45 });
  const { user } = useAuth();

  useFocusEffect(useCallback(() => {
    const fetchRes = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const res = await apiClient.get(`/results?ownerId=${user.id}`);
        if (res.data?._id) {
          const dt = new Date(res.data.dateTime);
          setRecord({
            count: res.data.shrimpCount,
            biomass: res.data.biomass.toFixed(1),
            date: dt.toLocaleDateString(),
            time: dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            protein: 55, filler: 45
          });
        }
      } catch (e) { console.error(e); }
      finally { setIsLoading(false); }
    };
    fetchRes();
  }, [user]));

  const pieData = [
    { name: 'Protein', population: record.protein, color: '#2A9D8F', legendFontColor: '#1A3A5F', legendFontSize: 12 },
    { name: 'Filler', population: record.filler, color: '#1A3A5F', legendFontColor: '#1A3A5F', legendFontSize: 12 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Results</Text>
      {isLoading ? <ActivityIndicator color="#1A3A5F" /> : (
        <View style={styles.card}>
          <Text style={styles.dateTimeText}>{record.date} | {record.time}</Text>
          <Text style={styles.val}>{record.count} pcs / {record.biomass}g</Text>
          <PieChart data={pieData} width={screenWidth - 80} height={200} chartConfig={{ color: () => '#1A3A5F' }} accessor="population" backgroundColor="transparent" paddingLeft="15" absolute />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF7F2', padding: 25 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1A3A5F', marginBottom: 20 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 20, elevation: 3, alignItems: 'center' },
  dateTimeText: { color: '#888', marginBottom: 10, fontSize: 14 },
  val: { fontSize: 24, fontWeight: 'bold', color: '#1A3A5F', marginBottom: 20 }
});