import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setTokens: (token: string, refreshToken: string) => void;
  clearTokens: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,

  setTokens: (token, refreshToken) =>
    set({ token, refreshToken, isAuthenticated: true }),

  clearTokens: () =>
    set({ token: null, refreshToken: null, isAuthenticated: false }),

  setLoading: (isLoading) => set({ isLoading }),
}));
