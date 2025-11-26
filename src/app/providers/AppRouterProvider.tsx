import { RouterProvider } from "react-router-dom";
import { router } from "../config/Router";
import { useHydrateProfile } from "@/shared/hooks/useHydrateProfile";

export const AppRouterProvider = () => {
  useHydrateProfile();
  return <RouterProvider router={router} />;
};
