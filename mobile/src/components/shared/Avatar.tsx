import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { getInitials } from '../../utils/helpers';

interface AvatarProps {
  name: string;
  uri?: string | null;
  size?: number;
  style?: ViewStyle | ImageStyle;
}

export function Avatar({ name, uri, size = 40, style }: AvatarProps) {
  const fontSize = size * 0.4;

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[
          styles.image,
          { width: size, height: size, borderRadius: size / 2 },
          style as ImageStyle,
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.fallback,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
    >
      <Text style={[styles.initials, { fontSize }]}>{getInitials(name)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    borderWidth: 2,
    borderColor: colors.copper.glow,
  },
  fallback: {
    backgroundColor: colors.copper.light,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.copper.glow,
  },
  initials: {
    color: colors.white,
    fontFamily: fonts.bodySemibold,
  },
});
