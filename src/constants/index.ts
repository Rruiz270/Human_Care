export { colors, gradients } from './colors';
export { fonts, fontSizes, lineHeights, textStyles } from './typography';
export { spacing, borderRadius, shadows } from './spacing';
export { translations } from './translations';
export { timing, easings, springConfigs } from './animations';

export const API_BASE_URL = __DEV__
  ? 'http://localhost:3000/api'
  : 'https://human-care.vercel.app/api';

export const APP_NAME = 'Human Care';
export const APP_VERSION = '1.0.0';
