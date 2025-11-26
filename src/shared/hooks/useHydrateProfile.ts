import { useEffect } from "react";
import { hydrateAuthProfile } from "@/shared/api";

export const useHydrateProfile = () => {
  useEffect(() => {
    void hydrateAuthProfile();
  }, []);
};
