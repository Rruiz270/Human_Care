import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function HabitTrackerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habitos</Text>
      <Text style={styles.subtitle}>Em desenvolvimento</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F0E8',
    padding: 20,
  },
  title: {
    fontWeight: '700',
    fontSize: 24,
    color: '#1A1A2E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
});
