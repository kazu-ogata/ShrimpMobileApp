import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useCallback } from 'react';
import {
  Alert, LayoutAnimation, ScrollView, StyleSheet,
  Text, TouchableOpacity, View, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import apiClient from '@/api/client';
import { useAuth } from '@/context/AuthContext';

export default function History() {
  const [items, setItems] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useFocusEffect(
    useCallback(() => {
      const fetchHistory = async () => {
        if (!user) {
            setItems([]);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        try {
          const response = await apiClient.get(`/biomass-records?ownerId=${user.id}`);
          const sortedData = response.data.sort((a, b) =>
            new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
          );
          setItems(sortedData);
        } catch (error) {
          console.error('Failed to fetch history:', error);
          Alert.alert('Error', 'Could not fetch history data.');
          setItems([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchHistory();
    }, [user])
  );

  function toggleExpand(id) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  }

  function onDelete(id) {
    Alert.alert('Delete', 'Delete this record?', [
      { text: 'Cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: async () => {
          try {
            await apiClient.delete(`/biomass-records/${id}`);
            setItems((prevItems) => prevItems.filter((x) => x._id !== id));
          } catch (error) {
            console.error('Failed to delete record:', error);
            Alert.alert('Error', 'Could not delete record.');
          }
        },
      },
    ]);
  }

  const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  };

  const formatTime = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  if (isLoading) {
    return (
      <LinearGradient colors={['#32996D', '#156043']} style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF8C2A" />
      </LinearGradient>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <LinearGradient colors={['#32996D', '#156043']} style={styles.container}>
        <Text style={styles.title}>History</Text>
        {items.length === 0 ? (
           <View style={styles.emptyStateContainer}>
             <Text style={styles.emptyStateText}>No Records Found</Text>
             <Text style={styles.emptyStateSubText}>New records from your system will appear here automatically.</Text>
           </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {items.map((it) => {
              const expanded = expandedId === it._id;
              const MOCK_PROTEIN_PERCENT = 0.55;
              const MOCK_FILLER_PERCENT = 0.45;
              const proteinGrams = it.feedMeasurement * MOCK_PROTEIN_PERCENT;
              const fillerGrams = it.feedMeasurement * MOCK_FILLER_PERCENT;

              return (
                <View key={it._id} style={styles.cardContainer}>
                  <TouchableOpacity style={styles.cardHeader} onPress={() => toggleExpand(it._id)}>
                    <View>
                      <Text style={styles.date}>{formatDate(it.dateTime)}</Text>
                      <Text style={styles.time}>{formatTime(it.dateTime)}</Text>
                    </View>
                    <Text style={styles.chev}>{expanded ? '▴' : '▾'}</Text>
                  </TouchableOpacity>
                  {expanded && (
                    <View style={styles.detailsBox}>
                      <View style={styles.lineRow}>
                        <Text style={styles.label}>Total Shrimp Count</Text>
                        <Text style={styles.value}>{it.shrimpCount.toLocaleString()} pcs</Text>
                      </View>
                      <View style={styles.lineRow}>
                        <Text style={styles.label}>Total Biomass</Text>
                        <Text style={styles.value}>{it.biomass.toFixed(1)} g</Text>
                      </View>
                      <View style={styles.lineRow}>
                        <Text style={styles.label}>Feed Recommendation</Text>
                        <Text style={styles.value}>{it.feedMeasurement.toFixed(2)} g/day</Text>
                      </View>
                      <View style={[styles.lineRow, { marginLeft: 20 }]}>
                        <Text style={styles.label}>Protein</Text>
                        <Text style={styles.value}>{proteinGrams.toFixed(2)} g</Text>
                      </View>
                      <View style={[styles.lineRow, { marginLeft: 20 }]}>
                        <Text style={styles.label}>Filler</Text>
                        <Text style={styles.value}>{fillerGrams.toFixed(2)} g</Text>
                      </View>
                      <TouchableOpacity onPress={() => onDelete(it._id)} style={styles.deleteBtn}>
                        <Text style={styles.deleteText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, padding: 20 },
  title: { color: '#fff', fontSize: 34, fontWeight: '700', marginTop: 50, marginBottom: 55 },
  emptyStateContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 100 },
  emptyStateText: { color: '#fff', fontSize: 20, fontWeight: '600', marginBottom: 8 },
  emptyStateSubText: { color: 'rgba(255,255,255,0.7)', fontSize: 15, textAlign: 'center', paddingHorizontal: 20 },
  cardContainer: { marginBottom: 14, borderRadius: 12, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.1)' },
  cardHeader: { paddingVertical: 14, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  date: { color: '#fff', fontSize: 15, fontWeight: '600' },
  time: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 2 },
  chev: { color: '#fff', fontSize: 18 },
  detailsBox: { backgroundColor: 'rgba(255,255,255,0.08)', borderTopWidth: 0.5, borderColor: 'rgba(255,255,255,0.2)', paddingVertical: 12, paddingHorizontal: 16 },
  lineRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { color: '#fff', fontSize: 14 },
  value: { color: '#fff', fontSize: 15, fontWeight: '600' },
  deleteBtn: { borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', borderRadius: 6, alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 6, marginTop: 10 },
  deleteText: { color: '#fff', fontSize: 13, fontWeight: '500' },
});