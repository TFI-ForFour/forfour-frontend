import { useEffect } from "react";
import { hydrateActiveParticipation, hydrateAuthProfile } from "@/shared/api";

export const useHydrateProfile = () => {
  useEffect(() => {
    void hydrateAuthProfile();
    void hydrateActiveParticipation();
  }, []);
};
