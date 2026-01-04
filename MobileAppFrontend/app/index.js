import { useRouter } from 'expo-router';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function Landing() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#FAF7F2' }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoWrapper}>
          <Image 
            source={require('../assets/images/ShrimpSenseLogo.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity 
            style={styles.getStartedBtn} 
            onPress={() => router.push('/signup')}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logoWrapper: { alignItems: 'center', marginBottom: 150 },
  logo: { width: 250, height: 250 },
  title: { color: '#1A3A5F', fontSize: 42, fontWeight: '900', letterSpacing: 4, marginTop: 10 },
  bottom: { width: '100%', alignItems: 'center', paddingBottom: 50 },
  getStartedBtn: { width: width * 0.7, backgroundColor: '#1A3A5F', paddingVertical: 18, borderRadius: 999, alignItems: 'center' },
  getStartedText: { color: '#FAF7F2', fontWeight: 'bold', fontSize: 22 },
});