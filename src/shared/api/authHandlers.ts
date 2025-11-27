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
  let participationChecked = false;

  const hydrateProfile = async () => {
    if (profileHydrated) return;

    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const existingProfile = useAuthStore.getState().profile;
    if (existingProfile) {
      profileHydrated = true;
      return;
    }

    profileHydrated = true;
    try {
      const { data } = await memberClient.get<MemberResponse>("/member");
      const { id, nickname, totalWalkCount, totalDistance } = data.data;
      useAuthStore.getState().setProfile({
        memberId: id,
        nickName: nickname,
        totalWalkCount,
        totalDistance,
      });
    } catch (error) {
      profileHydrated = false;
      console.error("사용자 정보를 불러오지 못했습니다.", error);
    }
  };

  const withAuthHeader = (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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

  const checkActiveParticipation = async () => {
    if (participationChecked) return;

    const token = localStorage.getItem("accessToken");
    if (!token) return;

    participationChecked = true;
    try {
      const { data } = await memberClient.get<{
        data: { hasActiveRoom: boolean; roomId?: number };
      }>("/my-participation");

      if (data.data.hasActiveRoom) {
        const target = `/walking/${data.data.roomId}`;
        if (window.location.pathname !== target) {
          window.location.replace(target);
        }
      }
    } catch (error) {
      participationChecked = false;
      console.error("활동 중인 산책방 정보를 불러오지 못했습니다.", error);
    }
  };

  return {
    withAuthHeader,
    handleAuthError,
    hydrateProfile,
    checkActiveParticipation,
  };
};
