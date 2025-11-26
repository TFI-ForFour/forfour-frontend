import { apiClient } from "@/shared/api";
import { walkCourse } from "../utils/walkcourse";

export type PathListItem = {
  pathId: number;
  pathName: string;
  distance: number;
  pathDescription?: string;
  startMarketName: string;
  endMarketName: string;
  startMarketId: string;
  endMarketId: string;
  pathImageUrl: string;
};

type Pageable = {
  pageSize: number;
  pageNum: number;
  numberOfElements: number;
  isLast: boolean;
};

type PathListResponse = {
  status: number;
  code: string | null;
  message: string;
  data: {
    dataList: PathListItem[];
    pageable: Pageable;
  };
};

const pathImageById = new Map<number, string>(
  walkCourse.map(({ pathId, pathImgUrl }) => [pathId, pathImgUrl])
);
const pathDescriptionById = new Map<number, string>(
  walkCourse.map(({ pathId, pathDescription }) => [pathId, pathDescription])
);

export const fetchPathList = async (
  pageSize = 5,
  pageNum = 0
): Promise<PathListItem[]> => {
  const { data } = await apiClient.get<PathListResponse>("/path-list", {
    params: { pageSize, pageNum },
  });

  return data.data.dataList.map((item) => ({
    ...item,
    // 이미지 URL은 pathId 기준으로 정적 맵에서 우선 선택
    pathImageUrl: pathImageById.get(item.pathId) ?? item.pathImageUrl,
    pathDescription:
      pathDescriptionById.get(item.pathId) ?? item.pathDescription,
  }));
};
