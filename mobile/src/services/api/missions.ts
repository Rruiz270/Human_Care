import { apiClient } from './client';
import type { Mission, ApiResponse } from '../../types';

export const missionsApi = {
  getMissions: async (params?: {
    userId?: string;
    status?: string;
    type?: string;
  }): Promise<Mission[]> => {
    const { data } = await apiClient.get<ApiResponse<Mission[]>>('/missions', { params });
    return data.data!;
  },

  getMission: async (id: string): Promise<Mission> => {
    const { data } = await apiClient.get<ApiResponse<Mission>>(`/missions/${id}`);
    return data.data!;
  },

  createMission: async (input: Partial<Mission>): Promise<Mission> => {
    const { data } = await apiClient.post<ApiResponse<Mission>>('/missions', input);
    return data.data!;
  },

  updateMission: async (id: string, updates: Partial<Mission>): Promise<Mission> => {
    const { data } = await apiClient.put<ApiResponse<Mission>>(`/missions/${id}`, updates);
    return data.data!;
  },

  completeMission: async (id: string): Promise<Mission> => {
    const { data } = await apiClient.put<ApiResponse<Mission>>(`/missions/${id}`, {
      status: 'COMPLETED',
      completedAt: new Date(),
    });
    return data.data!;
  },
};
