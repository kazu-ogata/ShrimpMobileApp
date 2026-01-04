import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';

const COLORS = { bg: '#FAF7F2', navy: '#1A3A5F', aqua: '#2A9D8F', white: '#FFFFFF' };

export default function Signup() {
  const router = useRouter();
  const { signUp } = useAuth();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [confirm, setConfirm] = useState('');
  
  // Visibility States
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);

  async function onSignUp() {
    if (!username || !email || !pw) return Alert.alert('Error', 'Please fill in all fields.');
    if (pw !== confirm) return Alert.alert('Error', 'Passwords do not match.');
    
    setIsLoading(true);
    try { 
      await signUp(username, email, pw); 
      router.replace('/(tabs)/home'); 
    } catch (e) { 
      Alert.alert('Signup Failed', e.message); 
    } finally { 
      setIsLoading(false); 
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1, justifyContent:'center'}}>
        <Image source={require('../assets/images/ShrimpSenseLogo.png')} style={styles.logo} />
        <Text style={styles.title}>Create Account</Text>
        
        {/* Username */}
        <View style={styles.inputBox}>
          <MaterialCommunityIcons name="account-outline" size={20} color={COLORS.navy} style={styles.icon} />
          <TextInput placeholder="Username" style={styles.input} value={username} onChangeText={setUsername} autoCapitalize="none" />
        </View>

        {/* Email */}
        <View style={styles.inputBox}>
          <MaterialCommunityIcons name="email-outline" size={20} color={COLORS.navy} style={styles.icon} />
          <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        </View>

        {/* Password with Toggle */}
        <View style={styles.inputBox}>
          <MaterialCommunityIcons name="lock-outline" size={20} color={COLORS.navy} style={styles.icon} />
          <TextInput 
            placeholder="Password" 
            style={styles.input} 
            secureTextEntry={!showPw} 
            value={pw} 
            onChangeText={setPw} 
          />
          <TouchableOpacity onPress={() => setShowPw(!showPw)}>
            <MaterialCommunityIcons name={showPw ? "eye-off-outline" : "eye-outline"} size={20} color={COLORS.navy} />
          </TouchableOpacity>
        </View>

        {/* Confirm Password with Toggle */}
        <View style={styles.inputBox}>
          <MaterialCommunityIcons name="lock-check-outline" size={20} color={COLORS.navy} style={styles.icon} />
          <TextInput 
            placeholder="Confirm Password" 
            style={styles.input} 
            secureTextEntry={!showConfirmPw} 
            value={confirm} 
            onChangeText={setConfirm} 
          />
          <TouchableOpacity onPress={() => setShowConfirmPw(!showConfirmPw)}>
            <MaterialCommunityIcons name={showConfirmPw ? "eye-off-outline" : "eye-outline"} size={20} color={COLORS.navy} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.btn} onPress={onSignUp} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="white" /> : <Text style={styles.btnText}>SIGN UP</Text>}
        </TouchableOpacity>

        <View style={styles.centerRow}>
          <Text style={styles.normalText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.linkText}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, padding: 30 },
  logo: { width: 80, height: 80, alignSelf: 'center', marginBottom: 10 },
  title: { fontSize: 32, fontWeight: 'bold', color: COLORS.navy, textAlign: 'center', marginBottom: 30 },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, paddingHorizontal: 15, height: 60, marginBottom: 15, borderWidth: 1, borderColor: '#DDD' },
  icon: { marginRight: 10 },
  input: { flex: 1, color: COLORS.navy },
  btn: { backgroundColor: COLORS.navy, height: 60, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  centerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  normalText: { color: COLORS.navy, fontSize: 15 },
  linkText: { color: COLORS.aqua, fontWeight: 'bold', fontSize: 15, textDecorationLine: 'underline' }
});