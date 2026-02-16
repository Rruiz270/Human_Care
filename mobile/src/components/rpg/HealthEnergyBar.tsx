import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Canvas, RoundedRect, LinearGradient, vec } from '@shopify/react-native-skia';
import { colors } from '../../constants/colors';
import { fonts, fontSizes } from '../../constants/typography';
import { getHealthColor, getEnergyColor } from '../../utils/rpg-calculations';

interface HealthEnergyBarProps {
  label: string;
  value: number; // 0-100
  maxValue?: number;
  type: 'health' | 'energy';
  width?: number;
}

export function HealthEnergyBar({
  label,
  value,
  maxValue = 100,
  type,
  width = 280,
}: HealthEnergyBarProps) {
  const barHeight = 18;
  const percentage = Math.min(value / maxValue, 1);
  const filledWidth = percentage * width;
  const barColor = type === 'health' ? getHealthColor(value) : getEnergyColor(value);
  const icon = type === 'health' ? '\u2764\uFE0F' : '\u26A1';

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>
          {value}/{maxValue}
        </Text>
      </View>
      <View style={[styles.barContainer, { width }]}>
        <Canvas style={{ width, height: barHeight }}>
          {/* Background */}
          <RoundedRect
            x={0}
            y={0}
            width={width}
            height={barHeight}
            r={barHeight / 2}
            color="rgba(0,0,0,0.1)"
          />
          {/* Filled */}
          {filledWidth > 0 && (
            <RoundedRect
              x={0}
              y={0}
              width={filledWidth}
              height={barHeight}
              r={barHeight / 2}
              color={barColor}
            />
          )}
        </Canvas>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  icon: {
    fontSize: 14,
  },
  label: {
    fontFamily: fonts.bodySemibold,
    fontSize: fontSizes.sm,
    color: colors.text.primary,
    flex: 1,
  },
  value: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.xs,
    color: colors.text.secondary,
  },
  barContainer: {
    height: 18,
    borderRadius: 9,
    overflow: 'hidden',
  },
});
