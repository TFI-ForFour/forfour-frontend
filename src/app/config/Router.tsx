import MainLayout from "@/app/layout/MainLayout";
import CreateWalkPage from "@/pages/createwalk/ui/CreateWalkPage";
import LoginPage from "@/pages/login/ui/LoginPage";
import MainPage from "@/pages/main/ui/MainPage";
import MyPage from "@/pages/mypage/ui/MyPage";
import MyWalksPage from "@/pages/walks/ui/MyWalksPage";
import { createBrowserRouter } from "react-router-dom";
import SubLayout from "../layout/SubLayout";

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
  {
    path: "/",
    element: <SubLayout />,
    children: [
      {
        path: "createwalk",
        element: <CreateWalkPage />,
      },
    ],
  },
]);
