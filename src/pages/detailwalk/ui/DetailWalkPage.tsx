import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseDetail from "../components/CourseDetail";
import SubMission from "../components/SubMission";
import WalkPlayer from "../components/WalkPlayer";
import MarketQrScanner from "../components/MarketQrScanner";
import {
  fetchRoomDetail,
  type Participant,
  type RoomDetail,
} from "../model/fetchRoomDetail";
import { updateRecruitStatus } from "../model/startWalk";
import { formatWalkStartAt } from "@/pages/main/model/walkcard";
import { useAuthStore } from "@/shared/store/authStore";

const DetailWalkPage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const authProfile = useAuthStore((state) => state.profile);
  const [roomDetail, setRoomDetail] = useState<RoomDetail | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [showQrScanner, setShowQrScanner] = useState(false);

  const isLeader = useMemo(() => {
    if (!roomDetail || authProfile?.memberId === undefined) return false;
    return roomDetail.leaderId === authProfile.memberId;
  }, [authProfile?.memberId, roomDetail]);

  const isRecruiting = roomDetail?.status === "RECRUITING";
  const isRecruitmentEnded = roomDetail?.status === "RECRUITMENT_ENDED";

  useEffect(() => {
    if (!roomId) {
      setError("방 정보가 없습니다.");
      return;
    }

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const numericId = Number(roomId);
        if (Number.isNaN(numericId)) {
          setError("잘못된 방 정보입니다.");
          return;
        }
        const { roomDetail: detail, participantList } = await fetchRoomDetail(
          numericId
        );
        setRoomDetail(detail);
        setParticipants(participantList);
      } catch (err) {
        console.error("산책 방 상세 조회 실패:", err);
        setError("산책 방 정보를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [roomId]);

  const handleEndRecruit = async () => {
    if (!roomDetail || !isLeader) return;
    try {
      setActionLoading(true);
      await updateRecruitStatus(roomDetail.roomId, "RECRUITMENT_ENDED");
      setRoomDetail((prev) =>
        prev ? { ...prev, status: "RECRUITMENT_ENDED" } : prev
      );
    } catch (err) {
      console.error("모집 종료 실패:", err);
      setError("모집 종료에 실패했습니다.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col items-center gap-10 pb-24">
      <div className="flex w-full flex-col gap-10">
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col gap-2">
            <span className="flex text-title-24-semibold">
              {roomDetail?.title ?? "산책 정보를 불러오는 중입니다"}
            </span>
            {roomDetail?.startAt && (
              <span className="text-17-semibold text-gray-700">
                {formatWalkStartAt(roomDetail.startAt)}
              </span>
            )}
          </div>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-16-semibold text-red-700">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="text-title-18-semibold text-gray-500">
            산책 정보를 불러오는 중입니다...
          </div>
        )}

        {!isLoading && roomDetail && (
          <>
            <CourseDetail
              pathImageUrl={roomDetail.pathImageUrl}
              pathDescription={roomDetail.pathDescription}
              startMarketName={roomDetail.startMarketName}
              endMarketName={roomDetail.endMarketName}
            />

            <SubMission missionName={roomDetail.missionName} />

            <div className="flex w-full items-center justify-start gap-3">
              <span className="flex text-title-22-semibold">방장 :</span>
              <span className="flex text-title-22-semibold">
                {roomDetail.leaderName}
              </span>
            </div>

            <WalkPlayer
              participants={participants}
              leaderId={roomDetail.leaderId}
            />

            {isLeader && isRecruitmentEnded && showQrScanner && (
              <MarketQrScanner
                roomId={roomDetail.roomId}
                onSuccess={() => navigate(`/walking/${roomDetail.roomId}`)}
                onClose={() => setShowQrScanner(false)}
              />
            )}
          </>
        )}
      </div>

      <footer className="sticky bottom-0 left-0 right-0 w-full bg-transparent py-4">
        {isLeader ? (
          <button
            className="w-full rounded-xl bg-sky-500 py-3 text-title-20-semibold text-white transition hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:ring-offset-1 focus:ring-offset-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
            disabled={!roomDetail || isLoading || actionLoading}
            onClick={
              isRecruiting
                ? handleEndRecruit
                : isRecruitmentEnded
                ? () => setShowQrScanner(true)
                : undefined
            }
          >
            {isRecruiting
              ? "모집 종료하기"
              : isRecruitmentEnded
              ? "산책 시작하기"
              : "진행 상태를 확인하세요"}
          </button>
        ) : (
          <button
            className="w-full rounded-xl bg-sky-500 py-3 text-title-20-semibold text-white transition hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:ring-offset-1 focus:ring-offset-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
            disabled={
              !roomDetail || isLoading || roomDetail?.status !== "RECRUITING"
            }
          >
            참여하기
          </button>
        )}
      </footer>
    </div>
  );
};

export default DetailWalkPage;
