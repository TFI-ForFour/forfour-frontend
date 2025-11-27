import axios from "axios";
import { createAuthHandlers } from "./authHandlers";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

// 공통 API 클라이언트: 기본 경로는 /v1
export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// /v1 prefix를 사용하지 않는 외부 API(Kakao 로그인 등) 전용 클라이언트
export const externalClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 인증 토큰을 공통 헤더에 설정
export const setAuthToken = (token: string) => {
  apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  externalClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const { withAuthHeader, handleAuthError, hydrateProfile, checkActiveParticipation } =
  createAuthHandlers(apiClient);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => handleAuthError(error)
);

externalClient.interceptors.response.use(
  (response) => response,
  (error) => handleAuthError(error)
);

apiClient.interceptors.request.use(withAuthHeader);
externalClient.interceptors.request.use(withAuthHeader);

export const hydrateAuthProfile = hydrateProfile;
export const hydrateActiveParticipation = checkActiveParticipation;
