// app/(tabs)/history.tsx
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, LayoutAnimation, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import '@/utils/layoutAnimationSetup';

// Mock data
const MOCK = [
  {
    id: '1',
    date: 'Sep 30, 2025',
    time: '8:30 AM',
    count: '5,000 pcs',
    biomass: '7.5 g',
    feed: '11.25 g/day',
    protein: '6.19 g',
    filler: '5.06 g',
  },
  {
    id: '2',
    date: 'Jun 3, 2025',
    time: '10:47 AM',
    count: '7,500 pcs',
    biomass: '11.25 g',
    feed: '16.88 g/day',
    protein: '9.28 g',
    filler: '7.60 g',
  },
  {
    id: '3',
    date: 'Jan 28, 2025',
    time: '02:25 PM',
    count: '2,200 pcs',
    biomass: '3.5 g',
    feed: '4.62 g/day',
    protein: '2.54 g',
    filler: '2.08 g',
  },
];

export default function History() {
  const [items, setItems] = useState(MOCK);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function toggleExpand(id: string) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  }

  function onDelete(id: string) {
    Alert.alert('Delete', 'Delete this record?', [
      { text: 'Cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setItems((p) => p.filter((x) => x.id !== id)) },
    ]);
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <LinearGradient colors={['#32996D', '#156043']} style={styles.container}>
        <Text style={styles.title}>History</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {items.map((it) => {
            const expanded = expandedId === it.id;
            return (
              <View key={it.id} style={styles.cardContainer}>
                {/* Collapsed Header */}
                <TouchableOpacity style={styles.cardHeader} onPress={() => toggleExpand(it.id)}>
                  <View>
                    <Text style={styles.date}>{it.date}</Text>
                    <Text style={styles.time}>{it.time}</Text>
                  </View>
                  <Text style={styles.chev}>{expanded ? '▴' : '▾'}</Text>
                </TouchableOpacity>

                {/* Expanded Details */}
                {expanded && (
                  <View style={styles.detailsBox}>
                    <View style={styles.lineRow}>
                      <Text style={styles.label}>Total Shrimp Count</Text>
                      <Text style={styles.value}>{it.count}</Text>
                    </View>

                    <View style={styles.lineRow}>
                      <Text style={styles.label}>Total Biomass</Text>
                      <Text style={styles.value}>{it.biomass}</Text>
                    </View>

                    <View style={styles.lineRow}>
                      <Text style={styles.label}>Feed Recommendation</Text>
                      <Text style={styles.value}>{it.feed}</Text>
                    </View>

                    <View style={[styles.lineRow, { marginLeft: 20 }]}>
                      <Text style={styles.label}>Protein</Text>
                      <Text style={styles.value}>{it.protein}</Text>
                    </View>

                    <View style={[styles.lineRow, { marginLeft: 20 }]}>
                      <Text style={styles.label}>Filler</Text>
                      <Text style={styles.value}>{it.filler}</Text>
                    </View>

                    <TouchableOpacity onPress={() => onDelete(it.id)} style={styles.deleteBtn}>
                      <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '700',
    marginTop: 50,
    marginBottom: 55,
  },

  // Card Styles
  cardContainer: {
    marginBottom: 14,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  cardHeader: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  date: { color: '#fff', fontSize: 15, fontWeight: '600' },
  time: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 2 },
  chev: { color: '#fff', fontSize: 18 },

  detailsBox: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderTopWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  lineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  label: { color: '#fff', fontSize: 14 },
  value: { color: '#fff', fontSize: 15, fontWeight: '600' },

  deleteBtn: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 6,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 6,
    marginTop: 10,
  },
  deleteText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
});
