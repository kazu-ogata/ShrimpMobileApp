import React from 'react';
import { Platform } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0D3D45', // Your Dark Teal
        tabBarInactiveTintColor: '#999',
        tabBarStyle: { 
          height: 80, 
          paddingBottom: Platform.OS === 'ios' ? 25 : 15, 
          paddingTop: 10,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#EEE',
          elevation: 0, // Removes shadow on Android for a flat Figma look
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        }
      }}
    >
      <Tabs.Screen 
        name="home" 
        options={{ 
          title: 'Home', 
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={26} color={color} />
          ) 
        }} 
      />
      
      {/* Changed results to "Scan" with the QR icon */}
      <Tabs.Screen 
        name="scan" 
        options={{ 
          title: 'Scan', 
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "qr-code" : "qr-code-outline"} size={26} color={color} />
          ) 
        }} 
      />

      <Tabs.Screen 
        name="history" 
        options={{ 
          title: 'History', 
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? "history" : "history"} size={26} color={color} />
          ) 
        }} 
      />
    </Tabs>
  );
}