import { apiClient } from './client';
import type { Session, CreateSessionInput, ApiResponse } from '../../types';

export const sessionsApi = {
  getSessions: async (params?: {
    clientId?: string;
    professionalId?: string;
    status?: string;
    type?: string;
  }): Promise<Session[]> => {
    const { data } = await apiClient.get<ApiResponse<Session[]>>('/sessions', { params });
    return data.data!;
  },

  getSession: async (id: string): Promise<Session> => {
    const { data } = await apiClient.get<ApiResponse<Session>>(`/sessions/${id}`);
    return data.data!;
  },

  createSession: async (input: CreateSessionInput): Promise<Session> => {
    const { data } = await apiClient.post<ApiResponse<Session>>('/sessions', input);
    return data.data!;
  },

  updateSession: async (id: string, updates: Partial<Session>): Promise<Session> => {
    const { data } = await apiClient.put<ApiResponse<Session>>(`/sessions/${id}`, updates);
    return data.data!;
  },
};
