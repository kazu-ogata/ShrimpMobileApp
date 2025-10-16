// app/profile.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Profile() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <LinearGradient colors={['#32996D', '#156043']} style={styles.container}>
        
        {/* Top Section (arrow, title, icon) */}
        <View style={styles.topSection}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialCommunityIcons name="arrow-left" size={28} color="#013A2E" />
            </TouchableOpacity>
            <Text style={styles.title}>Profile</Text>
          </View>

          <View style={styles.profileSection}>
            <MaterialCommunityIcons name="account-circle" size={120} color="#013A2E" />
          </View>
        </View>

        {/* Info fields */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#013A2E"
            editable={false}
            value="ShrimpSense"
          />

          <Text style={[styles.label, { marginTop: 24 }]}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#013A2E"
            editable={false}
            value="shrimpsense@gmail.com"
          />
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace('/login')}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>

      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
  },
  topSection: {
    marginTop: 70,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#013A2E',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 40,
  },
  inputSection: {
    marginHorizontal: 20,
  },
  label: {
    fontSize: 14,
    color: '#013A2E',
    marginBottom: 6,
    marginLeft: 2,
    fontWeight: '500',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#013A2E',
    paddingVertical: 8,
    fontSize: 16,
    color: '#013A2E',
  },
  logoutBtn: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
  },
  logoutText: {
    color: '#013A2E',
    fontSize: 20,
    fontWeight: '600',
  },
});
