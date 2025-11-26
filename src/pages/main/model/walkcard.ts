import { apiClient } from "@/shared/api";

export type WalkRoomStatus =
  | "RECRUITING"
  | "RECRUITED_END"
  | "CANCLED"
  | "PROGRESS"
  | "COMPLETED";

export type WalkRoom = {
  roomId: number;
  title: string;
  leaderId: number;
  leaderName: string;
  pathId: number;
  startMarketName: string;
  endMarketName: string;
  missionName: string;
  maxMemberCount: number;
  memberCount: number;
  status: WalkRoomStatus;
  startAt: string;
};

type Pageable = {
  pageSize: number;
  pageNum: number;
  numberOfElements: number;
  isLast: boolean;
};

type RoomListResponse = {
  status: number;
  code: string;
  message: string;
  data: {
    dataList: WalkRoom[];
    pageable: Pageable;
  };
};

export type FetchWalkRoomsParams = {
  pageSize?: number;
  pageNum?: number;
  roomStatus?: WalkRoomStatus;
};

export const fetchWalkRooms = async ({
  pageSize = 10,
  pageNum = 10,
  roomStatus = "RECRUITING",
}: FetchWalkRoomsParams = {}): Promise<WalkRoom[]> => {
  const { data } = await apiClient.get<RoomListResponse>("/room-list", {
    params: { pageSize, pageNum, roomStatus },
  });

  return data.data.dataList;
};

// 날짜 변환 함수
export const formatWalkStartAt = (isoDate: string): string => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
};
