// app/signup.tsx
import React, { useState } from 'react';
import { KeyboardAvoidingView,  Platform,  ScrollView,  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Signup() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [confirm, setConfirm] = useState('');

  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  function onSignUp() {
    if (!username || !email || !pw || pw !== confirm) {
      return Alert.alert('Error', 'Please check your fields.');
    }
    Alert.alert('Success', 'Account created successfully!');
    router.replace('/login');
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <LinearGradient colors={['#32996D', '#156043']} style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View>
              <Text style={styles.title}>Create an account</Text>

              {/* Username */}
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="account"
                  size={20}
                  color="#013A2E"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Username"
                  placeholderTextColor="#013A2E"
                  style={styles.input}
                  value={username}
                  onChangeText={setUsername}
                />
              </View>

              {/* Email */}
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="email"
                  size={20}
                  color="#013A2E"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#013A2E"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>

              {/* Password */}
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="lock"
                  size={20}
                  color="#013A2E"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#013A2E"
                  style={styles.input}
                  secureTextEntry={!showPw}
                  value={pw}
                  onChangeText={setPw}
                />
                <TouchableOpacity onPress={() => setShowPw(!showPw)}>
                  <MaterialCommunityIcons
                    name={showPw ? 'eye-off' : 'eye'}
                    size={20}
                    color="#013A2E"
                  />
                </TouchableOpacity>
              </View>

              {/* Confirm Password */}
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="lock-check"
                  size={20}
                  color="#013A2E"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor="#013A2E"
                  style={styles.input}
                  secureTextEntry={!showConfirmPw}
                  value={confirm}
                  onChangeText={setConfirm}
                />
                <TouchableOpacity onPress={() => setShowConfirmPw(!showConfirmPw)}>
                  <MaterialCommunityIcons
                    name={showConfirmPw ? 'eye-off' : 'eye'}
                    size={20}
                    color="#013A2E"
                  />
                </TouchableOpacity>
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity style={styles.primaryBtn} onPress={onSignUp}>
                <Text style={styles.primaryBtnText}>SIGN UP</Text>
              </TouchableOpacity>

              {/* Already have account */}
              <View style={styles.centerRow}>
                <Text style={styles.normalText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => router.push('/login')}>
                  <Text style={styles.linkText}> Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#013A2E',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 30,
    marginLeft: 38,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#013A2E',
    marginBottom: 22,
    paddingBottom: 6,
    marginLeft: 38,
    marginRight: 38,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#013A2E',
    fontSize: 15,
  },
  primaryBtn: {
    backgroundColor: '#013A2E',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 38,
    marginRight: 38,
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
  centerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
  },
  normalText: {
    color: '#013A2E',
    fontSize: 14,
  },
  linkText: {
    color: '#013A2E',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
