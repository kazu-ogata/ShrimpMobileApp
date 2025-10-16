// app/(tabs)/results.tsx
import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function Results() {
  const data = [
    { name: 'Protein', population: 55, color: '#FF8C2A', legendFontColor: '#fff', legendFontSize: 12 },
    { name: 'Filler', population: 45, color: '#013A2E', legendFontColor: '#fff', legendFontSize: 12 },
  ];

  const proteinText = 'Protein: 6.19g (55%)';
  const fillerText = 'Filler: 5.06g (45%)';

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <LinearGradient colors={['#32996D', '#156043']} style={styles.container}>

        {/* Title */}
        <Text style={styles.title}>Results</Text>

        {/* Date Section */}
        <View style={styles.dateContainer}>
          <Text style={styles.date}>Sep 30, 2025</Text>
          <Text style={styles.date}>8:30 AM</Text>
        </View>

        {/* Two Stat Boxes */}
        <View style={styles.row}>
          <View style={[styles.card, { marginRight: 10 }]}>
            <Text style={styles.cardLabel}>Total PL Shrimp Count</Text>
            <Text style={styles.cardValue}>5,000 pcs</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Total Biomass</Text>
            <Text style={styles.cardValue}>7.5 g</Text>
          </View>
        </View>

        {/* Feed Recommendation Box */}
        <View style={styles.feedCard}>
          <Text style={styles.feedTitle}>Feed Recommendation</Text>
          <Text style={styles.feedAmount}>11.25 g/day</Text>

          <View style={styles.chartWrapper}>
            <PieChart
              data={data}
              width={screenWidth * 0.7}
              height={180}
              chartConfig={{
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="80"
              hasLegend={false}
            />
          </View>

          {/* Legend below Pie */}
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FF8C2A' }]} />
              <Text style={styles.legendText}>{proteinText}</Text>
            </View>
            <View style={[styles.legendItem, { marginLeft: 20 }]}>
              <View style={[styles.legendDot, { backgroundColor: '#013A2E' }]} />
              <Text style={styles.legendText}>{fillerText}</Text>
            </View>
          </View>
        </View>

      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '800',
    marginTop: 20,
  },
  dateContainer: {
    marginTop: 50,
    marginBottom: 20,
  },
  date: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 18,
    paddingVertical: 22,
    alignItems: 'center',
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
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 18,
    paddingVertical: 24,
    paddingHorizontal: 10,
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  feedTitle: {
    color: '#013A2E',
    fontSize: 15,
  },
  feedAmount: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    marginTop: 6,
  },
  chartWrapper: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    color: '#fff',
    fontSize: 13,
  },
});
