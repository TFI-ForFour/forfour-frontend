import { apiClient } from "@/shared/api";

export type UpdateNicknameResponse = {
  status: number;
  code: string;
  message: string;
  data?: unknown;
};

export const updateNickname = async (
  nickname: string
): Promise<UpdateNicknameResponse> => {
  const { data } = await apiClient.patch<UpdateNicknameResponse>("/member", {
    nickname,
  });
  return data;
};
