import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import apiClient from '@/api/client';
import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function History() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useFocusEffect(useCallback(() => {
    const fetchHistory = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const res = await apiClient.get(`/biomass-records?ownerId=${user.id}`);
        setItems(res.data.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)));
      } catch (e) { console.error(e); }
      finally { setIsLoading(false); }
    };
    fetchHistory();
  }, [user]));

  const onDelete = (id) => {
    Alert.alert('Delete', 'Delete record?', [
      { text: 'Cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
          await apiClient.delete(`/biomass-records/${id}`);
          setItems(prev => prev.filter(it => it._id !== id));
      }},
    ]);
  };

  if (isLoading) return <View style={styles.center}><ActivityIndicator color="#1A3A5F" size="large" /></View>;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>History</Text>
        {items.length === 0 ? (
           <View style={styles.emptyContainer}>
             <Text style={styles.emptyText}>No Records Found</Text>
             <Text style={styles.emptySub}>New records from your system will appear here automatically.</Text>
           </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {items.map((it) => (
              <View key={it._id} style={styles.card}>
                <View style={styles.header}>
                  <Text style={styles.date}>{new Date(it.dateTime).toLocaleDateString()} | {new Date(it.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                  <TouchableOpacity onPress={() => onDelete(it._id)}><Ionicons name="trash-outline" size={20} color="#FF4444" /></TouchableOpacity>
                </View>
                <Text style={styles.txt}>{it.shrimpCount} pcs | {it.biomass.toFixed(1)}g</Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAF7F2' },
  container: { flex: 1, padding: 25 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1A3A5F', marginBottom: 25 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 100 },
  emptyText: { fontSize: 20, fontWeight: 'bold', color: '#1A3A5F', marginBottom: 10 },
  emptySub: { fontSize: 15, color: '#888', textAlign: 'center', paddingHorizontal: 20 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 15, marginBottom: 15, elevation: 2, borderWidth: 1, borderColor: '#EEE' },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  date: { fontWeight: 'bold', color: '#1A3A5F' },
  txt: { marginTop: 10, color: '#555', fontSize: 16 }
});