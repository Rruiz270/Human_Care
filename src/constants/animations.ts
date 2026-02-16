import { Easing } from 'react-native-reanimated';

export const timing = {
  fast: 200,
  normal: 350,
  slow: 500,
  verySlow: 800,
} as const;

export const easings = {
  ease: Easing.bezier(0.25, 0.1, 0.25, 1),
  easeIn: Easing.bezier(0.42, 0, 1, 1),
  easeOut: Easing.bezier(0, 0, 0.58, 1),
  easeInOut: Easing.bezier(0.42, 0, 0.58, 1),
  spring: Easing.bezier(0.68, -0.55, 0.27, 1.55),
} as const;

export const springConfigs = {
  gentle: {
    damping: 15,
    stiffness: 100,
    mass: 1,
  },
  bouncy: {
    damping: 10,
    stiffness: 150,
    mass: 0.8,
  },
  snappy: {
    damping: 20,
    stiffness: 200,
    mass: 0.5,
  },
} as const;
