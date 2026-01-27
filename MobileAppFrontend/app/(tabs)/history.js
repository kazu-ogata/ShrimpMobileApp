import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import apiClient from '@/api/client';
import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function HistoryCard({ item, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // DYNAMIC CALCULATIONS based on the specific record
  const count = item.shrimpCount || 0;
  const biomass = count * 0.01;
  const feed = biomass * 0.06;
  const protein = feed * 0.55;
  const filler = feed * 0.45;
  const dt = new Date(item.dateTime);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity 
        style={[styles.cardHeader, isExpanded && styles.cardHeaderActive]} 
        onPress={toggleAccordion} 
        activeOpacity={0.7}
      >
        <View>
          <Text style={styles.dateText}>
            {dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </Text>
          <Text style={styles.timeText}>
            {dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
          </Text>
        </View>
        <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={22} color="#0D3D45" />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.cardDetail}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total PL Shrimp Count</Text>
            <Text style={styles.detailValue}>{count.toLocaleString()} pcs</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Biomass:</Text>
            <Text style={styles.detailValue}>{biomass.toFixed(2)} g</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Feed Recommendation:</Text>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={styles.detailValue}>{feed.toFixed(2)} g/day</Text>
              <Text style={styles.subDetail}>• {protein.toFixed(2)} g (protein)</Text>
              <Text style={styles.subDetail}>• {filler.toFixed(2)} g (filler)</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(item._id)}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default function History() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchHistory = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const res = await apiClient.get(`/biomass-records?ownerId=${user.id}`);
      // Sort newest first
      setItems(res.data.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)));
    } catch (e) { 
      console.error("History Error:", e); 
    } finally { 
      setIsLoading(false); 
    }
  };

  useFocusEffect(useCallback(() => { fetchHistory(); }, [user]));

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/biomass-records/${id}`);
      setItems(prev => prev.filter(it => it._id !== id));
    } catch (e) { 
      console.error("Delete Error:", e); 
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>History</Text>
        
        {isLoading ? (
          <View style={styles.center}><ActivityIndicator color="#0D3D45" size="large" /></View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
            {items.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="notifications-off-outline" size={80} color="#DDD" />
                <Text style={styles.emptyText}>No Records Found</Text>
                <Text style={styles.emptySub}>Records from your machine will appear here automatically.</Text>
              </View>
            ) : (
              items.map(item => (
                <HistoryCard key={item._id} item={item} onDelete={handleDelete} />
              ))
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAF7F2' },
  container: { flex: 1, paddingHorizontal: 25, paddingTop: 25, paddingBottom: 0 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#000', marginBottom: 25 },
  
  // Card Styles
  cardContainer: { 
    backgroundColor: 'white', 
    borderWidth: 1.5, 
    borderColor: '#0D3D45', 
    borderRadius: 15, 
    marginBottom: 15, 
    overflow: 'hidden' 
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20 
  },
  cardHeaderActive: {
    backgroundColor: '#F8F9FA',
  },
  dateText: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  timeText: { fontSize: 13, color: '#666', fontWeight: '600', marginTop: 2 },
  
  // Detail Styles
  cardDetail: { 
    padding: 20, 
    paddingTop: 10, 
    borderTopWidth: 1, 
    borderTopColor: '#EEE' 
  },
  detailRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginVertical: 10 
  },
  detailLabel: { fontSize: 13, fontWeight: 'bold', color: '#333' },
  detailValue: { fontSize: 13, fontWeight: 'bold', color: '#000' },
  subDetail: { fontSize: 12, color: '#555', fontWeight: '600', marginTop: 2 },
  
  // Action Styles
  deleteBtn: { 
    alignSelf: 'center', 
    marginTop: 20, 
    borderWidth: 1, 
    borderColor: '#0D3D45', 
    paddingVertical: 6, 
    paddingHorizontal: 40, 
    borderRadius: 8 
  },
  deleteText: { fontSize: 12, fontWeight: 'bold', color: '#000' },

  // Empty State Styles
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 100 },
  emptyText: { fontSize: 20, fontWeight: 'bold', color: '#AAA', marginTop: 15 },
  emptySub: { fontSize: 14, color: '#BBB', textAlign: 'center', paddingHorizontal: 30, marginTop: 10 }
});