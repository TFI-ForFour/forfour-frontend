import { create } from "zustand";

type AuthProfile = {
  memberId: number;
  nickName: string;
  totalWalkCount: number;
  totalDistance: number;
};

type AuthState = {
  profile?: AuthProfile;
};

type AuthActions = {
  setProfile: (profile: AuthProfile) => void;
  clearProfile: () => void;
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  profile: undefined,
  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: undefined }),
}));
