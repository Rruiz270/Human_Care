import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { colors } from '../../constants/colors';
import { fonts, fontSizes } from '../../constants/typography';
import { borderRadius } from '../../constants/spacing';

interface WarmTechButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export function WarmTechButton({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  style,
}: WarmTechButtonProps) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const sizeStyles = SIZE_MAP[size];

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={[styles.base, style]}
      >
        <LinearGradient
          colors={disabled ? ['#9CA3AF', '#9CA3AF'] : ['#C4956A', '#A67B52']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, sizeStyles.container]}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} size="small" />
          ) : (
            <>
              {icon}
              <Text style={[styles.primaryText, sizeStyles.text]}>{title}</Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const containerStyle = VARIANT_STYLES[variant]?.container;
  const textStyle = VARIANT_STYLES[variant]?.text;

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[styles.base, containerStyle, sizeStyles.container, disabled && styles.disabled, style]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'secondary' ? colors.copper.DEFAULT : colors.text.primary}
          size="small"
        />
      ) : (
        <>
          {icon}
          <Text style={[textStyle, sizeStyles.text, disabled && styles.disabledText]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const SIZE_MAP: Record<string, { container: ViewStyle; text: TextStyle }> = {
  sm: {
    container: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: borderRadius.md },
    text: { fontSize: fontSizes.sm },
  },
  md: {
    container: { paddingHorizontal: 24, paddingVertical: 14, borderRadius: borderRadius.lg },
    text: { fontSize: fontSizes.base },
  },
  lg: {
    container: { paddingHorizontal: 32, paddingVertical: 18, borderRadius: borderRadius.xl },
    text: { fontSize: fontSizes.md },
  },
};

const VARIANT_STYLES: Record<string, { container: ViewStyle; text: TextStyle }> = {
  secondary: {
    container: {
      backgroundColor: colors.cream.dark,
      borderWidth: 1,
      borderColor: colors.copper.glow,
    },
    text: {
      color: colors.copper.dark,
      fontFamily: fonts.bodySemibold,
    },
  },
  outline: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: colors.copper.DEFAULT,
    },
    text: {
      color: colors.copper.DEFAULT,
      fontFamily: fonts.bodySemibold,
    },
  },
  ghost: {
    container: {
      backgroundColor: 'transparent',
    },
    text: {
      color: colors.copper.DEFAULT,
      fontFamily: fonts.bodySemibold,
    },
  },
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryText: {
    color: colors.white,
    fontFamily: fonts.bodySemibold,
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: colors.text.tertiary,
  },
});
