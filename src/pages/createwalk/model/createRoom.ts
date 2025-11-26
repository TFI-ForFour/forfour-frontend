import { apiClient } from "@/shared/api";
import type { MissionName } from "../types/walkFunnel";

export type CreateWalkRoomRequest = {
  title: string;
  pathId: number;
  missionName: MissionName;
  startAt: string;
};

export type CreateWalkRoomResponse = {
  status: number;
  code: string;
  message: string;
  data?: unknown;
};

export const createWalkRoom = async (
  payload: CreateWalkRoomRequest
): Promise<CreateWalkRoomResponse> => {
  const { data } = await apiClient.post<CreateWalkRoomResponse>(
    "/room",
    payload
  );
  return data;
};
