import { apiClient } from './client';
import type { LifeMap, TimelineEvent, ApiResponse, CreateTimelineEventInput } from '../../types';

export const lifeMapApi = {
  getLifeMap: async (userId?: string): Promise<LifeMap> => {
    const params = userId ? { userId } : {};
    const { data } = await apiClient.get<ApiResponse<LifeMap>>('/life-map', { params });
    return data.data!;
  },

  getTimeline: async (lifeMapId: string): Promise<TimelineEvent[]> => {
    const { data } = await apiClient.get<ApiResponse<TimelineEvent[]>>('/life-map/timeline', {
      params: { lifeMapId },
    });
    return data.data!;
  },

  createTimelineEvent: async (input: CreateTimelineEventInput): Promise<TimelineEvent> => {
    const { data } = await apiClient.post<ApiResponse<TimelineEvent>>('/life-map/timeline', input);
    return data.data!;
  },

  updateTimelineEvent: async (
    id: string,
    updates: Partial<TimelineEvent>
  ): Promise<TimelineEvent> => {
    const { data } = await apiClient.put<ApiResponse<TimelineEvent>>(`/life-map/timeline/${id}`, updates);
    return data.data!;
  },

  deleteTimelineEvent: async (id: string): Promise<void> => {
    await apiClient.delete(`/life-map/timeline/${id}`);
  },
};
