import { createRoot } from "react-dom/client";
import "@/app/styles/global.css";
import { AppRouterProvider } from "./app/providers/AppRouterProvider";

createRoot(document.getElementById("root")!).render(
  <>
    <AppRouterProvider />
  </>
);
