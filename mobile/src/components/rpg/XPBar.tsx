import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Canvas, RoundedRect } from '@shopify/react-native-skia';
import { colors } from '../../constants/colors';
import { fonts, fontSizes } from '../../constants/typography';

interface XPBarProps {
  currentXP: number;
  xpToNext: number;
  level: number;
  width?: number;
}

export function XPBar({ currentXP, xpToNext, level, width = 280 }: XPBarProps) {
  const barHeight = 12;
  const percentage = Math.min(currentXP / xpToNext, 1);
  const filledWidth = percentage * width;

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>Nv. {level}</Text>
        </View>
        <Text style={styles.xpText}>
          {currentXP} / {xpToNext} XP
        </Text>
      </View>
      <View style={[styles.barContainer, { width }]}>
        <Canvas style={{ width, height: barHeight }}>
          <RoundedRect
            x={0}
            y={0}
            width={width}
            height={barHeight}
            r={barHeight / 2}
            color="rgba(108,207,246,0.2)"
          />
          {filledWidth > 0 && (
            <RoundedRect
              x={0}
              y={0}
              width={filledWidth}
              height={barHeight}
              r={barHeight / 2}
              color={colors.glow.blue}
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
    gap: 8,
  },
  levelBadge: {
    backgroundColor: colors.glow.blue,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 100,
  },
  levelText: {
    fontFamily: fonts.monoBold,
    fontSize: fontSizes.xs,
    color: colors.white,
  },
  xpText: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.xs,
    color: colors.text.secondary,
  },
  barContainer: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
});
