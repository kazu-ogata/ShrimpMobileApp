import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';

export default function Profile() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={{marginBottom: 30}}><MaterialCommunityIcons name="arrow-left" size={28} color="#1A3A5F" /></TouchableOpacity>
      <View style={{alignItems: 'center'}}>
        <MaterialCommunityIcons name="account-circle" size={100} color="#1A3A5F" />
        <Text style={styles.un}>{user?.username}</Text>
        <Text style={styles.em}>{user?.email}</Text>
        <TouchableOpacity style={styles.lo} onPress={signOut}><Text style={{color:'white', fontWeight:'bold'}}>LOGOUT</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF7F2', padding: 30 },
  un: { fontSize: 24, fontWeight: 'bold', color: '#1A3A5F', marginTop: 10 },
  em: { fontSize: 16, color: '#555', marginTop: 5 },
  lo: { backgroundColor: '#1A3A5F', padding: 15, borderRadius: 10, marginTop: 40, width: '100%', alignItems: 'center' }
});