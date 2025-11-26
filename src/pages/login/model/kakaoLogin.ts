import { apiClient } from "@/shared/api";

type KakaoLoginRequest = {
  code: string;
};

type KakaoLoginResponse = {
  status: number;
  code: string;
  message: string;
  data: {
    memberId: number;
    nickName: string;
    totalWalkCount: number;
    totalDistance: number;
    jwtToken: {
      accessToken: string;
    };
    isRegistered: boolean;
  };
};

export const kakaoLogin = async (payload: KakaoLoginRequest) => {
  const { data } = await apiClient.post<KakaoLoginResponse>(
    "/auth/login/kakao",
    payload,
    {
      baseURL: import.meta.env.VITE_API_BASE_URL,
    }
  );
  return data;
};
