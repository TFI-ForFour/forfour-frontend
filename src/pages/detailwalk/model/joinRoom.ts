import { apiClient } from "@/shared/api";

export const joinRoom = async (roomId: number): Promise<void> => {
  await apiClient.post(`/room/${roomId}/participant`);
};
