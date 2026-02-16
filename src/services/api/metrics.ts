import { apiClient } from './client';
import type { DailyTracking, CareMetrics, DashboardStats, ApiResponse } from '../../types';

export const metricsApi = {
  getDailyTracking: async (
    lifeMapId: string,
    date?: string
  ): Promise<DailyTracking | null> => {
    const { data } = await apiClient.get<ApiResponse<DailyTracking>>('/daily-tracking', {
      params: { lifeMapId, date },
    });
    return data.data ?? null;
  },

  saveDailyTracking: async (tracking: Partial<DailyTracking>): Promise<DailyTracking> => {
    const { data } = await apiClient.post<ApiResponse<DailyTracking>>('/daily-tracking', tracking);
    return data.data!;
  },

  getCareMetrics: async (lifeMapId: string): Promise<CareMetrics[]> => {
    const { data } = await apiClient.get<ApiResponse<CareMetrics[]>>('/metrics/care', {
      params: { lifeMapId },
    });
    return data.data!;
  },

  getDashboardStats: async (userId: string): Promise<DashboardStats> => {
    const { data } = await apiClient.get<ApiResponse<DashboardStats>>('/metrics/dashboard', {
      params: { userId },
    });
    return data.data!;
  },
};
