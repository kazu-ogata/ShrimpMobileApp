import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function Landing() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#156043' }}> 
      {/* 👆 ensures full screen background behind SafeArea */}
      <SafeAreaView style={{ flex: 1 }} edges={[]}> 
        {/* 👆 disable safe-area padding so gradient touches screen edges */}
        <LinearGradient
          colors={['#32996D', '#156043']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.logoWrapper}>
            <Image
              source={require('../assets/images/shrimp-logo.gif')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>SHRIMP SENSE</Text>
          </View>

          <View style={styles.bottom}>
            <TouchableOpacity
              style={styles.getStartedBtn}
              onPress={() => router.push('/login')}
              activeOpacity={0.9}
            >
              <Text style={styles.getStartedText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1, alignItems: 'center', justifyContent: 'space-between' },
  logoWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 180,
  },
  logo: { width: 300, height: 300 },
  title: {
    color: '#FF8C2A',
    fontSize: 50,
    fontWeight: '900',
    letterSpacing: 5,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: Platform.select({
      ios: 'AvenirNext-Bold',
      android: 'sans-serif-condensed',
      default: 'System',
    }),
  },
  bottom: {
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 260,
    alignItems: 'center',
  },
  getStartedBtn: {
    width: Math.min(250, width * 0.65),
    backgroundColor: '#013A2E',
    paddingVertical: 17,
    borderRadius: 999,
    alignItems: 'center',
  },
  getStartedText: {
    color: '#FF8C2A',
    fontWeight: '700',
    fontSize: 24,
    fontFamily: Platform.select({
      ios: 'AvenirNext-Bold',
      android: 'sans-serif-condensed',
      default: 'System',
    }),
  },
});
