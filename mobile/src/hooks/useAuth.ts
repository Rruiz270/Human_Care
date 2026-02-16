import { useState } from 'react';
import { useAuthStore } from '../store/auth-store';
import { useUserStore } from '../store/user-store';
import { authApi } from '../services/api/auth';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setTokens, clearTokens } = useAuthStore();
  const { setCurrentUser, logout: clearUser } = useUserStore();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await authApi.login(email, password);
      setTokens(result.token, result.refreshToken);
      setCurrentUser(result.user);
    } catch (err: any) {
      const message = err.response?.data?.error ?? 'Erro ao fazer login';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, phone?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await authApi.register({ name, email, password, phone });
      setTokens(result.token, result.refreshToken);
      setCurrentUser(result.user);
    } catch (err: any) {
      const message = err.response?.data?.error ?? 'Erro ao criar conta';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearTokens();
    clearUser();
  };

  return { login, register, logout, isLoading, error };
}
