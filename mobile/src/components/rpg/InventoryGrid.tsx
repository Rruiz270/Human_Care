import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { GlassCard } from '../design-system/GlassCard';
import { colors } from '../../constants/colors';
import { fonts, fontSizes } from '../../constants/typography';
import type { InventoryItem } from '../../types';
import { Moon, Apple, Clock, Users } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 64) / 2;

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  sleep: <Moon size={24} color={colors.glow.blue} />,
  nutrition: <Apple size={24} color={colors.glow.green} />,
  routine: <Clock size={24} color={colors.glow.amber} />,
  connections: <Users size={24} color={colors.copper.DEFAULT} />,
};

const CATEGORY_COLORS: Record<string, string> = {
  sleep: colors.glow.blue,
  nutrition: colors.glow.green,
  routine: colors.glow.amber,
  connections: colors.copper.DEFAULT,
};

interface InventoryGridProps {
  items: InventoryItem[];
}

export function InventoryGrid({ items }: InventoryGridProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Inventario</Text>
      <View style={styles.grid}>
        {items.map((item) => (
          <GlassCard key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              {CATEGORY_ICONS[item.category]}
              <Text style={[styles.score, { color: CATEGORY_COLORS[item.category] }]}>
                {item.score}%
              </Text>
            </View>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.scoreBar}>
              <View
                style={[
                  styles.scoreBarFill,
                  {
                    width: `${item.score}%`,
                    backgroundColor: CATEGORY_COLORS[item.category],
                  },
                ]}
              />
            </View>
          </GlassCard>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  sectionTitle: {
    fontFamily: fonts.headingMedium,
    fontSize: fontSizes.lg,
    color: colors.text.primary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: CARD_SIZE,
    padding: 14,
    gap: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  score: {
    fontFamily: fonts.monoBold,
    fontSize: fontSizes.md,
  },
  itemName: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.sm,
    color: colors.text.primary,
  },
  scoreBar: {
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 2,
  },
});
