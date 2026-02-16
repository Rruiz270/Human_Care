import { Platform, Dimensions } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

const { width, height } = Dimensions.get('window');
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const isSmallDevice = width < 375;
export const isMediumDevice = width >= 375 && width < 414;
export const isLargeDevice = width >= 414;

export const TAB_BAR_HEIGHT = isIOS ? 88 : 70;
export const HEADER_HEIGHT = isIOS ? 96 : 56;
export const STATUS_BAR_HEIGHT = isIOS ? 44 : 24;

export function hitSlop(size: number = 10) {
  return { top: size, bottom: size, left: size, right: size };
}
