import MainLayout from "@/app/layout/MainLayout";
import CreateWalkPage from "@/pages/createwalk/ui/CreateWalkPage";
import LoginPage from "@/pages/login/ui/LoginPage";
import MainPage from "@/pages/main/ui/MainPage";
import MyPage from "@/pages/mypage/ui/MyPage";
import MyWalksPage from "@/pages/walks/ui/MyWalksPage";
import { createBrowserRouter } from "react-router-dom";
import SubLayout from "../layout/SubLayout";
import CourseSuccess from "@/pages/createwalk/components/CourseSuccess";
import DetailWalkPage from "@/pages/detailwalk/ui/DetailWalkPage";
import WalkingPage from "@/pages/walking/ui/WalkingPage";
import WalkingSuccessPage from "@/pages/walking/ui/WalkingSuccessPage";
import LoginCallBackPage from "@/pages/login/ui/LoginCallBackPage";

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
    path: "/",
    element: <SubLayout backTo="/" />,
    children: [
      {
        path: "createwalk",
        element: <CreateWalkPage />,
      },
      {
        path: "room/:roomId",
        element: <DetailWalkPage />,
      },
    ],
  },
  {
    path: "/",
    children: [
      {
        path: "/kakao/callback",
        element: <LoginCallBackPage />,
      },
      {
        path: "/createwalk/success",
        element: <CourseSuccess />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/walking/:roomId",
        element: <WalkingPage />,
      },
      {
        path: "/walking/:roomId/success",
        element: <WalkingSuccessPage />,
      },
    ],
  },
]);
