import axios, { type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../store";

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

const withAuthHeader = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// 공통 JWT 토큰 에러 핸들러
const handleAuthError = (error: unknown) => {
  if (!axios.isAxiosError<{ code?: string }>(error)) {
    return Promise.reject(error);
  }

  const res = error.response;
  const data = res?.data;

  if (!res) return Promise.reject(error);

  const isOnLoginPage = window.location.pathname.startsWith("/login");

  if (res.status === 401 && data?.code === "ATH-010" && !isOnLoginPage) {
    // 토큰 만료 시 accessToken 제거
    localStorage.removeItem("accessToken");

    useAuthStore.getState().clearProfile();

    window.location.replace("/login");
  }

  return Promise.reject(error);
};

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
