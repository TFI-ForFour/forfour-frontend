import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "../store";

type MemberResponse = {
  status: number;
  code: string;
  message: string;
  data: {
    id: number;
    nickname: string;
    role: string;
    totalWalkCount: number;
    totalDistance: number;
  };
};

export const createAuthHandlers = (memberClient: AxiosInstance) => {
  let profileHydrated = false;

  const withAuthHeader = async (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;

      if (!profileHydrated && !useAuthStore.getState().profile) {
        profileHydrated = true;
        try {
          const { data } = await memberClient.get<MemberResponse>("/member");
          const { id, nickname, totalWalkCount, totalDistance } = data.data;
          useAuthStore
            .getState()
            .setProfile({
              memberId: id,
              nickName: nickname,
              totalWalkCount,
              totalDistance,
            });
        } catch (error) {
          console.error("사용자 정보를 불러오지 못했습니다.", error);
        }
      }
    }
    return config;
  };

  const handleAuthError = (error: unknown) => {
    if (!axios.isAxiosError<{ code?: string }>(error)) {
      return Promise.reject(error);
    }

    const res = error.response;
    const data = res?.data;

    if (!res) return Promise.reject(error);

    const isOnLoginPage = window.location.pathname.startsWith("/login");

    if (res.status === 401 && data?.code === "ATH-010" && !isOnLoginPage) {
      localStorage.removeItem("accessToken");
      useAuthStore.getState().clearProfile();
      window.location.replace("/login");
    }

    return Promise.reject(error);
  };

  return { withAuthHeader, handleAuthError };
};
