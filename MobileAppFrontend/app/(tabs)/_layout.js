import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { height: 80, paddingBottom: 15, backgroundColor: '#FFFFFF' },
        tabBarActiveTintColor: '#2A9D8F',
        tabBarInactiveTintColor: '#1A3A5F',
        tabBarIcon: ({ color, size }) => {
          const names = { home: 'home', results: 'chart-pie', history: 'history' };
          return <MaterialCommunityIcons name={names[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="results" options={{ title: 'Results' }} />
      <Tabs.Screen name="history" options={{ title: 'History' }} />
    </Tabs>
  );
}