import { apiClient } from "@/shared/api";

export type MarketQrPayload = {
  marketId: string;
};

export const parseMarketQrPayload = (raw: string): MarketQrPayload => {
  const parsed = JSON.parse(raw) as Partial<MarketQrPayload>;
  if (!parsed.marketId) {
    throw new Error("QR에 marketId가 포함되어 있지 않습니다.");
  }
  return { marketId: parsed.marketId };
};

export const requestStartMarket = async (
  roomId: number,
  marketId: string
): Promise<void> => {
  await apiClient.patch(`/room/${roomId}/start-market/${marketId}`);
};

export type RecruitStatus = "RECRUITING" | "RECRUITMENT_ENDED";

export const updateRecruitStatus = async (
  roomId: number,
  roomStatus: RecruitStatus
): Promise<void> => {
  await apiClient.patch(`/room/${roomId}/recruit-status`, undefined, {
    params: { roomStatus },
  });
};

export type EndMarketResult = {
  minutes: number;
  distance: number;
  roomDetail: {
    roomId: number;
    title: string;
    missionName: string;
    pathImageUrl?: string;
    startAt: string;
  };
};

export const requestEndMarket = async (
  roomId: number,
  marketId: string
): Promise<EndMarketResult> => {
  const { data } = await apiClient.patch<{ data: EndMarketResult }>(
    `/room/${roomId}/end-market/${marketId}`
  );
  return data.data;
};
