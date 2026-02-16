import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts, fontSizes } from '../../constants/typography';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'copper';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
}

const VARIANT_COLORS: Record<BadgeVariant, { bg: string; text: string }> = {
  default: { bg: colors.cream.dark, text: colors.text.secondary },
  success: { bg: 'rgba(34,197,94,0.15)', text: colors.success },
  warning: { bg: 'rgba(245,158,11,0.15)', text: colors.warning },
  error: { bg: 'rgba(239,68,68,0.15)', text: colors.error },
  info: { bg: 'rgba(108,207,246,0.15)', text: colors.info },
  copper: { bg: 'rgba(196,149,106,0.15)', text: colors.copper.DEFAULT },
};

export function Badge({ label, variant = 'default', style }: BadgeProps) {
  const variantColors = VARIANT_COLORS[variant];

  return (
    <View style={[styles.container, { backgroundColor: variantColors.bg }, style]}>
      <Text style={[styles.text, { color: variantColors.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: fonts.bodySemibold,
    fontSize: fontSizes.xs,
  },
});
