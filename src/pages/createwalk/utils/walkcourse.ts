import path1Img from "@/shared/assets/walkcourse/path_1.png";
import path2Img from "@/shared/assets/walkcourse/path_2.png";
import path3Img from "@/shared/assets/walkcourse/path_3.png";
import path4Img from "@/shared/assets/walkcourse/path_4.png";

export type WalkCourseMeta = {
  pathId: number;
  pathDescription: string;
  pathImgUrl: string;
};

export const walkCourse: WalkCourseMeta[] = [
  {
    pathId: 1,
    pathDescription:
      "이 코스로 걷다보면 옹호가게 카페 총 세 곳을 자연스럽게 거치게 됩니다",
    pathImgUrl: path1Img,
  },
  {
    pathId: 2,
    pathDescription:
      "망원동 골목을 걸으며 즐거운 플로깅을 한 후, 땀 흘린 만큼 든든하고 맛있는 돈까스로 채우는 보람찬 코스예요.",
    pathImgUrl: path2Img,
  },
  {
    pathId: 3,
    pathDescription:
      "맛있는 식사로 든든하게 시작! 즐거운 산책 후 분위기 좋은 카페에서 여유를 만끽하는 완벽한 소화 코스예요.",
    pathImgUrl: path3Img,
  },
  {
    pathId: 4,
    pathDescription:
      "울림두레생협 망원점에서 시작해 문화예술창작소 공간 릴라'로 걸어가 나만의 예술을 만들고 치유를 경험하는 특별한 창작 여행이에요.",
    pathImgUrl: path4Img,
  },
];
