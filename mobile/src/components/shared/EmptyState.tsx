import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts, fontSizes } from '../../constants/typography';
import { WarmTechButton } from '../design-system/WarmTechButton';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      {actionLabel && onAction && (
        <WarmTechButton title={actionLabel} onPress={onAction} variant="outline" size="sm" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 12,
  },
  iconContainer: {
    marginBottom: 8,
    opacity: 0.6,
  },
  title: {
    fontFamily: fonts.headingMedium,
    fontSize: fontSizes.lg,
    color: colors.text.primary,
    textAlign: 'center',
  },
  description: {
    fontFamily: fonts.body,
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
    textAlign: 'center',
    maxWidth: 280,
  },
});
