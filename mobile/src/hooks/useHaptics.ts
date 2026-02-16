import * as Haptics from 'expo-haptics';
import { useUIStore } from '../store/ui-store';

export function useHaptics() {
  const hapticEnabled = useUIStore((s) => s.hapticEnabled);

  const impact = (style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light) => {
    if (hapticEnabled) {
      Haptics.impactAsync(style);
    }
  };

  const notification = (type: Haptics.NotificationFeedbackType) => {
    if (hapticEnabled) {
      Haptics.notificationAsync(type);
    }
  };

  const selection = () => {
    if (hapticEnabled) {
      Haptics.selectionAsync();
    }
  };

  return { impact, notification, selection };
}
