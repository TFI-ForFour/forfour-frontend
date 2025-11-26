import path1Img from "@/shared/assets/walkcourse/path_1.png";
import path2Img from "@/shared/assets/walkcourse/path_2.png";
import path3Img from "@/shared/assets/walkcourse/path_3.png";
import path4Img from "@/shared/assets/walkcourse/path_4.png";
import path5Img from "@/shared/assets/walkcourse/path_5.png";
import path6Img from "@/shared/assets/walkcourse/path_6.png";
import path7Img from "@/shared/assets/walkcourse/path_7.png";

export type WalkCourseMeta = {
  pathId: number;
  pathName: string;
  pathImgUrl: string;
  startMarket: string;
  endMarket: string;
};

export const walkCourse: WalkCourseMeta[] = [
  {
    pathId: 1,
    pathName: "망원한강공원 걷고 커피 한 모금",
    pathImgUrl: path1Img,
    startMarket: "망원초록길 광징",
    endMarket: "카페엠",
  },
  {
    pathId: 2,
    pathName: "우유곽 모으고 환경 지키자!",
    pathImgUrl: path2Img,
    startMarket: "카페엠",
    endMarket: "슬금슬금",
  },
  {
    pathId: 3,
    pathName: "열심히 플로깅 하고, 든든하게 한 끼!",
    pathImgUrl: path3Img,
    startMarket: "평화의공원 모험놀이터",
    endMarket: "왕수제돈까스",
  },
  {
    pathId: 4,
    pathName: "든든하게 먹고 걷는 행복한 소화 코스",
    pathImgUrl: path4Img,
    startMarket: "행복한마당",
    endMarket: "슬금슬금",
  },
  {
    pathId: 5,
    pathName: "자연에서 시작하는 힐링 아트 여행",
    pathImgUrl: path5Img,
    startMarket: "성산 근린공원 음수대",
    endMarket: "공간릴라",
  },
  {
    pathId: 6,
    pathName: "나와 이웃이 행복해지는 '공동체 나눔 여정'",
    pathImgUrl: path6Img,
    startMarket: "울림두레생협 망원점",
    endMarket: "마포희망나눔",
  },
  {
    pathId: 7,
    pathName: "유기농 재료 쇼핑하고, 카페에서 행복 충전!",
    pathImgUrl: path7Img,
    startMarket: "울림두레생협 망원점",
    endMarket: "슬금슬금",
  },
];
