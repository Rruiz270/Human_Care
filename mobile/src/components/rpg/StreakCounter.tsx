import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flame } from 'lucide-react-native';
import { colors } from '../../constants/colors';
import { fonts, fontSizes } from '../../constants/typography';

interface StreakCounterProps {
  streak: number;
  label?: string;
}

export function StreakCounter({ streak, label = 'dias seguidos' }: StreakCounterProps) {
  const isHot = streak >= 7;
  const accentColor = isHot ? colors.glow.amber : colors.copper.DEFAULT;

  return (
    <View style={styles.container}>
      <View style={[styles.flameBg, { backgroundColor: `${accentColor}20` }]}>
        <Flame size={20} color={accentColor} fill={isHot ? accentColor : 'transparent'} />
      </View>
      <View>
        <Text style={[styles.count, { color: accentColor }]}>{streak}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flameBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontFamily: fonts.monoBold,
    fontSize: fontSizes.lg,
  },
  label: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.text.secondary,
  },
});
