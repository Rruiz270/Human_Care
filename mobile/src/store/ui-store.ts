import { create } from 'zustand';

interface UIState {
  isOnboarded: boolean;
  isDarkMode: boolean;
  hapticEnabled: boolean;
  notificationsEnabled: boolean;

  setOnboarded: (onboarded: boolean) => void;
  toggleDarkMode: () => void;
  toggleHaptic: () => void;
  toggleNotifications: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isOnboarded: true, // true for dev, false for production
  isDarkMode: false,
  hapticEnabled: true,
  notificationsEnabled: true,

  setOnboarded: (isOnboarded) => set({ isOnboarded }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  toggleHaptic: () => set((state) => ({ hapticEnabled: !state.hapticEnabled })),
  toggleNotifications: () => set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
}));
