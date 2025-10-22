import React, { useState, useCallback } from 'react';
import { View, Text, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { PieChart } from 'react-native-chart-kit';
import { useFocusEffect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import apiClient from '@/api/client';

const screenWidth = Dimensions.get('window').width;

const initialData = {
  date: '---', time: '---', count: '0 pcs', biomass: '0 g', feed: '0 g/day',
  proteinValue: 0, fillerValue: 100,
  proteinText: 'Protein: 0g (0%)', fillerText: 'Filler: 0g (100%)',
};

export default function Results() {
  const [isLoading, setIsLoading] = useState(true);
  const [record, setRecord] = useState(initialData);
  const { user } = useAuth();

  useFocusEffect(
    useCallback(() => {
      const fetchLatestResult = async () => {
        if (!user) {
            setRecord(initialData);
            setIsLoading(false);
            return;
        };
        setIsLoading(true);

        try {
          const response = await apiClient.get(`/results?ownerId=${user.id}`);
          const data = response.data;

          if (data && data._id) {
            const MOCK_PROTEIN_PERCENT = 0.55;
            const MOCK_FILLER_PERCENT = 0.45;
            const proteinGrams = data.feedMeasurement * MOCK_PROTEIN_PERCENT;
            const fillerGrams = data.feedMeasurement * MOCK_FILLER_PERCENT;
            const dateObj = new Date(data.dateTime);

            setRecord({
              date: dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
              time: dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
              count: `${data.shrimpCount.toLocaleString()} pcs`,
              biomass: `${data.biomass.toFixed(1)} g`,
              feed: `${data.feedMeasurement.toFixed(2)} g/day`,
              proteinValue: MOCK_PROTEIN_PERCENT * 100,
              fillerValue: MOCK_FILLER_PERCENT * 100,
              proteinText: `Protein: ${proteinGrams.toFixed(2)}g (${(MOCK_PROTEIN_PERCENT * 100).toFixed(0)}%)`,
              fillerText: `Filler: ${fillerGrams.toFixed(2)}g (${(MOCK_FILLER_PERCENT * 100).toFixed(0)}%)`,
            });
          } else {
            setRecord(initialData);
          }
        } catch (error) {
          console.error("Failed to fetch results", error);
          setRecord(initialData);
        } finally {
          setIsLoading(false);
        }
      };
      fetchLatestResult();
    }, [user])
  );

  const pieData = [
    { name: 'Protein', population: record.proteinValue || 0, color: '#FF8C2A', legendFontColor: '#fff', legendFontSize: 12 },
    { name: 'Filler', population: record.fillerValue || 1, color: '#013A2E', legendFontColor: '#fff', legendFontSize: 12 },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <LinearGradient colors={['#32996D', '#156043']} style={styles.container}>
        <Text style={styles.title}>Results</Text>
        {isLoading ? (
          <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#FF8C2A" /></View>
        ) : (
          <>
            <View style={styles.dateContainer}>
              <Text style={styles.date}>{record.date}</Text>
              <Text style={styles.date}>{record.time}</Text>
            </View>
            <View style={styles.row}>
              <View style={[styles.card, { marginRight: 10 }]}>
                <Text style={styles.cardLabel}>Total PL Shrimp Count</Text>
                <Text style={styles.cardValue}>{record.count}</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardLabel}>Total Biomass</Text>
                <Text style={styles.cardValue}>{record.biomass}</Text>
              </View>
            </View>
            <View style={styles.feedCard}>
              <Text style={styles.feedTitle}>Feed Recommendation</Text>
              <Text style={styles.feedAmount}>{record.feed}</Text>
              <View style={styles.chartWrapper}>
                <PieChart data={pieData} width={screenWidth * 0.7} height={180} chartConfig={{ color: (opacity = 1) => `rgba(0,0,0, ${opacity})` }} accessor="population" backgroundColor="transparent" paddingLeft="80" hasLegend={false} absolute />
              </View>
              <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#FF8C2A' }]} />
                  <Text style={styles.legendText}>{record.proteinText}</Text>
                </View>
                <View style={[styles.legendItem, { marginLeft: 20 }]}>
                  <View style={[styles.legendDot, { backgroundColor: '#013A2E' }]} />
                  <Text style={styles.legendText}>{record.fillerText}</Text>
                </View>
              </View>
            </View>
          </>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 50, },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', },
  title: { color: '#fff', fontSize: 34, fontWeight: '800', marginTop: 20, },
  dateContainer: { marginTop: 50, marginBottom: 20, },
  date: { color: 'rgba(255,255,255,0.9)', fontSize: 14, },
  row: { flexDirection: 'row', justifyContent: 'space-between', },
  card: { flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 18, paddingVertical: 22, alignItems: 'center', },
  cardLabel: { color: '#013A2E', fontSize: 13, },
  cardValue: { color: '#fff', fontSize: 22, fontWeight: '800', marginTop: 10, },
  feedCard: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 18, paddingVertical: 24, paddingHorizontal: 10, marginTop: 10, alignItems: 'center', width: '100%', alignSelf: 'center', },
  feedTitle: { color: '#013A2E', fontSize: 15, },
  feedAmount: { color: '#fff', fontSize: 20, fontWeight: '800', marginTop: 6, },
  chartWrapper: { marginTop: 16, alignItems: 'center', justifyContent: 'center', },
  legendRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16, },
  legendItem: { flexDirection: 'row', alignItems: 'center', },
  legendDot: { width: 12, height: 12, borderRadius: 6, marginRight: 6, },
  legendText: { color: '#fff', fontSize: 13, },
});