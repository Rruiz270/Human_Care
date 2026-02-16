export const colors = {
  // Warm Earth Tones
  copper: {
    DEFAULT: '#C4956A',
    light: '#D4AD85',
    dark: '#A67B52',
    glow: 'rgba(196,149,106,0.25)',
  },
  sage: {
    DEFAULT: '#8B9E7C',
    light: '#A3B596',
    dark: '#6E8160',
  },
  cream: {
    DEFAULT: '#F5F0E8',
    light: '#FAF8F4',
    dark: '#E8E0D4',
  },

  // Tech Accents
  glow: {
    green: '#A4DF00',
    blue: '#6CCFF6',
    amber: '#F0A830',
  },

  // RPG Colors
  rpg: {
    health: '#EF4444',
    healthFull: '#22C55E',
    energy: '#F59E0B',
    energyFull: '#22C55E',
    xp: '#6CCFF6',
  },

  // Glass
  glass: {
    bg: 'rgba(245,240,232,0.65)',
    border: 'rgba(196,149,106,0.25)',
    bgDark: 'rgba(26,26,46,0.75)',
  },

  // Base
  dark: '#1A1A2E',
  darkSoft: '#2D2D44',
  white: '#FFFFFF',
  black: '#000000',

  // Status
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#6CCFF6',

  // Text
  text: {
    primary: '#1A1A2E',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
  },
} as const;

export const gradients = {
  warmSunset: ['#C4956A', '#F0A830'],
  techGlow: ['#A4DF00', '#6CCFF6'],
  glassOverlay: ['rgba(245,240,232,0.8)', 'rgba(245,240,232,0.4)'],
  copperShine: ['#D4AD85', '#C4956A', '#A67B52'],
  healthBar: ['#EF4444', '#F59E0B', '#22C55E'],
  energyBar: ['#F59E0B', '#A4DF00', '#22C55E'],
  xpBar: ['#3B82F6', '#6CCFF6'],
} as const;
