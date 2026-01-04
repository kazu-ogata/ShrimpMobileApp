import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import apiClient from '@/api/client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function QRScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  if (!permission?.granted) {
    return (
      <View style={styles.center}>
        <Text style={{marginBottom: 20, color: '#1A3A5F'}}>Camera access required</Text>
        <TouchableOpacity style={styles.btn} onPress={requestPermission}><Text style={{color:'white'}}>Allow</Text></TouchableOpacity>
      </View>
    );
  }

  const handleScan = async ({ data }) => {
    console.log("Scanned Data:", data); // Check if this is the UUID
    console.log("Current User ID:", user?.id); // CHECK IF THIS IS NULL
    setScanned(true);
    try {
      await apiClient.post('/auth/authorize-machine', { sessionId: data, userId: user.id });
      Alert.alert("Success", "Machine Authorized!");
      router.back();
    } catch (e) {
      Alert.alert("Error", "Invalid QR Code");
      setScanned(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView onBarcodeScanned={scanned ? undefined : handleScan} style={StyleSheet.absoluteFillObject} />
      <TouchableOpacity style={styles.close} onPress={() => router.back()}><Ionicons name="close-circle" size={50} color="white" /></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAF7F2' },
  btn: { backgroundColor: '#1A3A5F', padding: 15, borderRadius: 10 },
  close: { position: 'absolute', top: 50, right: 20 }
});