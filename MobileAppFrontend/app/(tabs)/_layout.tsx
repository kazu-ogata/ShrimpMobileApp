// app/(tabs)/_layout.tsx
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: '#156043',
          borderTopWidth: 1, 
          borderColor: '#013A2E',
        },
        tabBarActiveTintColor: '#FF8C2A',
        tabBarInactiveTintColor: '#013A2E',
        tabBarIcon: ({ color, size }) => {
          const name = route.name;
          if (name === 'home')
            return <MaterialCommunityIcons name="home" size={size} color={color} />;
          if (name === 'results')
            return <MaterialCommunityIcons name="chart-pie" size={size} color={color} />;
          if (name === 'history')
            return <MaterialCommunityIcons name="history" size={size} color={color} />;
          return null;
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="results" options={{ title: 'Results' }} />
      <Tabs.Screen name="history" options={{ title: 'History' }} />
    </Tabs>
  );
}
