import MainLayout from "@/app/layout/MainLayout";
import LoginPage from "@/pages/login/ui/LoginPage";
import MainPage from "@/pages/main/ui/MainPage";
import MyPage from "@/pages/mypage/ui/MyPage";
import MyWalksPage from "@/pages/walks/ui/MyWalksPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "walks",
        element: <MyWalksPage />,
      },
      {
        path: "mypage",
        element: <MyPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
