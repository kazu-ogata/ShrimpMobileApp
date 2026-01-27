import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '@/api/client'; // Uses alias
import { useRouter, useSegments } from 'expo-router';
// No types import needed

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  // Load token/user from storage
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        const storedUser = await AsyncStorage.getItem('userData');
        if (storedToken && storedUser) {
          // Found saved session
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } else {
          // No saved session
        }
      } catch (e) { console.error('Failed to load auth data', e); }
      finally { setIsLoading(false); }
    };
    loadAuthData();
  }, []);

  // Handle automatic navigation
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(tabs)';
    let currentRoute = segments.length > 0 ? '/' + segments.join('/') : '/';
    const currentToken = token;
    const publicOnlyRoutes = ['/', '/login', '/signup', '/recover', '/verify', '/reset-password'];

    if (!currentToken && inAuthGroup) {
      router.replace('/login');
    } else if (currentToken && !inAuthGroup) {
      if (publicOnlyRoutes.includes(currentRoute)) {
        router.replace('/(tabs)/home');
      }
    }
  }, [token, segments, isLoading, router]);

  const signIn = async (loginInput, password, rememberMe) => { 
    try {
      // We use loginInput (the value from the text box) 
      // and send it as 'loginInput' (the key the backend expects)
      const response = await apiClient.post('/auth/login', { 
        loginInput: loginInput, 
        password: password 
      });
      
      const { result, token: newToken } = response.data;

      setUser(result);
      setToken(newToken);
      console.log('[signIn] Login success, setting state.');

      if (rememberMe) {
        await AsyncStorage.setItem('userToken', newToken);
        await AsyncStorage.setItem('userData', JSON.stringify(result));
      } else {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userData');
      }

    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      throw new Error(error?.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const signUp = async (username, email, password) => {
    // Signup currently always saves the session (acts like "Remember Me" is checked)
    try {
      const response = await apiClient.post('/auth/signup', { username, email, password });
      const { result, token: newToken } = response.data;
      setUser(result);
      setToken(newToken);
      await AsyncStorage.setItem('userToken', newToken);
      await AsyncStorage.setItem('userData', JSON.stringify(result));
      // Navigation handled by useEffect
    } catch (error) {
      // Clear storage on failed signup too
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      throw new Error(error?.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  const signOut = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
    router.replace('/login'); // Explicit navigation
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signUp, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};