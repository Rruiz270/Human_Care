import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useUserStore } from '../store/user-store';
import { useUIStore } from '../store/ui-store';
import { MainTabNavigator } from './MainTabNavigator';
import { WelcomeScreen } from '../screens/landing/WelcomeScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import type { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const currentUser = useUserStore((s) => s.currentUser);
  const isAuthenticated = !!currentUser;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={MainTabNavigator} />
      ) : (
        <>
          <Stack.Screen name="Landing" component={WelcomeScreen} />
          <Stack.Screen name="Auth" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
