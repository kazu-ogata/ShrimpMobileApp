import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import apiClient from '@/api/client';
import { useAuth } from '@/context/AuthContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  if (!permission) return <View style={styles.center}><ActivityIndicator color="#0D3D45" /></View>;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Ionicons name="camera-reverse-outline" size={80} color="#0D3D45" />
        <Text style={styles.permTitle}>Camera Permission</Text>
        <Text style={styles.permSub}>To authorize and use the ShrimpSense machine, please enable camera access in your settings.</Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={requestPermission}>
          <Text style={styles.btnText}>Allow Access</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleScan = async ({ data }) => {
    setIsScanning(false);
    setLoading(true);
    try {
      await apiClient.post('/auth/authorize-machine', { sessionId: data, userId: user.id });
      Alert.alert("Authorization Successful", "Your mobile session is now linked to the machine.");
    } catch (e) {
      Alert.alert("Authorization Failed", "The QR code is invalid or has expired. Please refresh the machine screen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* --- PROFESSIONAL INSTRUCTION HEADER --- */}
      <View style={styles.header}>
        <View style={styles.iconTextRow}>
          <MaterialCommunityIcons name="shield-check-outline" size={28} color="#0D3D45" />
          <Text style={styles.mainTitle}>Secure Login</Text>
        </View>
        <Text style={styles.instructionText}>
          To operate the <Text style={{fontWeight: 'bold'}}>ShrimpSense Machine</Text>, you must authorize your session by scanning the QR code displayed on the machine.
        </Text>
      </View>

      {/* --- SCANNER VIEWPORT --- */}
      <View style={styles.scannerContainer}>
        {!isScanning ? (
          <View style={styles.placeholder}>
            <View style={styles.placeholderIconBg}>
              <Ionicons name="qr-code-outline" size={100} color="#0D3D45" />
            </View>
            <TouchableOpacity 
              style={styles.startBtn} 
              onPress={() => setIsScanning(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.startBtnText}>START SCANNER</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.cameraWrapper}>
            <CameraView 
              onBarcodeScanned={handleScan} 
              style={StyleSheet.absoluteFillObject} 
            />
            {/* The Scanning Frame Overlay */}
            <View style={styles.overlay}>
              <View style={styles.focusFrame}>
                <View style={styles.cornerTopLeft} />
                <View style={styles.cornerTopRight} />
                <View style={styles.cornerBottomLeft} />
                <View style={styles.cornerBottomRight} />
              </View>
              <Text style={styles.scanHint}>Align QR code within the frame</Text>
            </View>
            
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setIsScanning(false)}>
              <Ionicons name="close-circle" size={40} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0D3D45" />
          <Text style={styles.loadingText}>Authorizing Machine...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF7F2', padding: 25 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  // Header and Instructions
  header: { marginTop: 40, marginBottom: 30, backgroundColor: '#FFFFFF', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: '#EEE' },
  iconTextRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 10 },
  mainTitle: { fontSize: 24, fontWeight: 'bold', color: '#0D3D45' },
  instructionText: { fontSize: 14, color: '#555', lineHeight: 22 },

  // Scanner UI
  scannerContainer: {
    height: width - 10, // Square based on screen width
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#0D3D45',
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  placeholderIconBg: { width: 160, height: 160, borderRadius: 80, backgroundColor: '#F4F7F8', justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  startBtn: { backgroundColor: '#0D3D45', paddingVertical: 15, paddingHorizontal: 50, borderRadius: 15 },
  startBtnText: { color: 'white', fontWeight: 'bold', letterSpacing: 1.2 },

  // Camera and Overlay
  cameraWrapper: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  focusFrame: { width: 200, height: 200, position: 'relative' },
  scanHint: { color: 'white', marginTop: 25, fontWeight: '600', fontSize: 13 },
  cancelBtn: { position: 'absolute', bottom: 20, alignSelf: 'center' },

  // Corner Accents for Scanner
  cornerTopLeft: { position: 'absolute', top: 0, left: 0, width: 40, height: 40, borderTopWidth: 4, borderLeftWidth: 4, borderColor: '#FFF', borderTopLeftRadius: 15 },
  cornerTopRight: { position: 'absolute', top: 0, right: 0, width: 40, height: 40, borderTopWidth: 4, borderRightWidth: 4, borderColor: '#FFF', borderTopRightRadius: 15 },
  cornerBottomLeft: { position: 'absolute', bottom: 0, left: 0, width: 40, height: 40, borderBottomWidth: 4, borderLeftWidth: 4, borderColor: '#FFF', borderBottomLeftRadius: 15 },
  cornerBottomRight: { position: 'absolute', bottom: 0, right: 0, width: 40, height: 40, borderBottomWidth: 4, borderRightWidth: 4, borderColor: '#FFF', borderBottomRightRadius: 15 },

  // Loading
  loadingOverlay: { marginTop: 30, alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#0D3D45', fontWeight: 'bold' },

  // Permissions
  permTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 20, color: '#0D3D45' },
  permSub: { textAlign: 'center', color: '#666', marginVertical: 15, paddingHorizontal: 20 },
  primaryBtn: { backgroundColor: '#0D3D45', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10 },
  btnText: { color: 'white', fontWeight: 'bold' }
});