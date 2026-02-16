import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { colors } from '../../constants/colors';
import { fonts, fontSizes } from '../../constants/typography';
import { isIOS, STATUS_BAR_HEIGHT } from '../../utils/platform';

interface HeaderBarProps {
  title: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export function HeaderBar({ title, showBack = false, rightAction }: HeaderBarProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {showBack ? (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.copper.DEFAULT} />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}

        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        {rightAction ? rightAction : <View style={styles.placeholder} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: STATUS_BAR_HEIGHT + (isIOS ? 8 : 16),
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.cream.DEFAULT,
    borderBottomWidth: 1,
    borderBottomColor: colors.glass.border,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.headingMedium,
    fontSize: fontSizes.md,
    color: colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
});
