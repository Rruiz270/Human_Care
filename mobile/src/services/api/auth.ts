import { apiClient } from './client';
import type { User, ApiResponse } from '../../types';

interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

interface RegisterInput {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const { data } = await apiClient.post<ApiResponse<LoginResponse>>('/auth/login', {
      email,
      password,
    });
    return data.data!;
  },

  register: async (input: RegisterInput): Promise<LoginResponse> => {
    const { data } = await apiClient.post<ApiResponse<LoginResponse>>('/auth/register', input);
    return data.data!;
  },

  refreshToken: async (refreshToken: string): Promise<{ token: string; refreshToken: string }> => {
    const { data } = await apiClient.post('/auth/refresh', { refreshToken });
    return data.data;
  },

  forgotPassword: async (email: string): Promise<void> => {
    await apiClient.post('/auth/forgot-password', { email });
  },

  getProfile: async (): Promise<User> => {
    const { data } = await apiClient.get<ApiResponse<User>>('/users/me');
    return data.data!;
  },
};
