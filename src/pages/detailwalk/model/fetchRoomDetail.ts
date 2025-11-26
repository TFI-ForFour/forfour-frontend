import { apiClient } from "@/shared/api";
import { walkCourse } from "@/pages/createwalk/utils/walkcourse";
import type { MissionName } from "@/pages/createwalk/types/walkFunnel";

export type Participant = {
  memberId: number;
  memberNickName: string;
};

export type RoomDetail = {
  roomId: number;
  title: string;
  leaderId: number;
  leaderName: string;
  pathId: number;
  startMarketName: string;
  endMarketName: string;
  missionName: MissionName;
  maxMemberCount: number;
  memberCount: number;
  status: string;
  startAt: string;
  pathImageUrl?: string;
  pathDescription?: string;
};

type RoomDetailResponse = {
  status: number;
  code: string | null;
  message: string;
  data: {
    roomDetail: RoomDetail;
    participantList: Participant[];
  };
};

export const fetchRoomDetail = async (
  roomId: number
): Promise<{ roomDetail: RoomDetail; participantList: Participant[] }> => {
  const { data } = await apiClient.get<RoomDetailResponse>(`/room/${roomId}`);

  const pathMeta = walkCourse.find(
    (courseMeta) => courseMeta.pathId === data.data.roomDetail.pathId
  );

  return {
    roomDetail: {
      ...data.data.roomDetail,
      pathImageUrl: pathMeta?.pathImgUrl ?? data.data.roomDetail.pathImageUrl,
      pathDescription: pathMeta?.pathDescription ?? data.data.roomDetail.pathDescription,
    },
    participantList: data.data.participantList,
  };
};
