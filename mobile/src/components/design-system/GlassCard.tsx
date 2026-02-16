import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors } from '../../constants/colors';
import { borderRadius, shadows } from '../../constants/spacing';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  variant?: 'default' | 'copper' | 'dark';
  noPadding?: boolean;
}

export function GlassCard({
  children,
  style,
  intensity = 40,
  variant = 'default',
  noPadding = false,
}: GlassCardProps) {
  const borderColor =
    variant === 'copper'
      ? colors.copper.DEFAULT
      : variant === 'dark'
      ? 'rgba(255,255,255,0.1)'
      : colors.glass.border;

  const backgroundColor =
    variant === 'dark' ? colors.glass.bgDark : colors.glass.bg;

  return (
    <View
      style={[
        styles.container,
        { borderColor, backgroundColor },
        variant === 'copper' && shadows.glow,
        !noPadding && styles.padding,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    overflow: 'hidden',
  },
  padding: {
    padding: 16,
  },
});
