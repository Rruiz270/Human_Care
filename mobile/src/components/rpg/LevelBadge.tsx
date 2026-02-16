import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { fonts, fontSizes } from '../../constants/typography';

interface LevelBadgeProps {
  level: number;
  size?: 'sm' | 'md' | 'lg';
}

export function LevelBadge({ level, size = 'md' }: LevelBadgeProps) {
  const sizeConfig = SIZE_MAP[size];

  return (
    <LinearGradient
      colors={['#C4956A', '#A67B52']}
      style={[styles.container, { width: sizeConfig.size, height: sizeConfig.size, borderRadius: sizeConfig.size / 2 }]}
    >
      <Text style={[styles.level, { fontSize: sizeConfig.fontSize }]}>{level}</Text>
    </LinearGradient>
  );
}

const SIZE_MAP = {
  sm: { size: 28, fontSize: 12 },
  md: { size: 40, fontSize: 16 },
  lg: { size: 56, fontSize: 22 },
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  level: {
    fontFamily: fonts.monoBold,
    color: colors.white,
  },
});
