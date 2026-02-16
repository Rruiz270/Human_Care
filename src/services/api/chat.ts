import { apiClient } from './client';
import type { ChatMessage, ApiResponse } from '../../types';

interface ChatResponse {
  message: string;
  suggestions?: string[];
  relatedTopics?: string[];
}

export const chatApi = {
  getMessages: async (userId: string): Promise<ChatMessage[]> => {
    const { data } = await apiClient.get<ApiResponse<ChatMessage[]>>('/chat', {
      params: { userId },
    });
    return data.data!;
  },

  sendMessage: async (
    userId: string,
    message: string,
    context?: Record<string, unknown>
  ): Promise<ChatResponse> => {
    const { data } = await apiClient.post<ApiResponse<ChatResponse>>('/chat', {
      userId,
      message,
      context,
    });
    return data.data!;
  },
};
