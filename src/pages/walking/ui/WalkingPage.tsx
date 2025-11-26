import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { useParams } from "react-router-dom";
import { fetchRoomDetail, type RoomDetail } from "@/pages/detailwalk/model/fetchRoomDetail";
import WalkingRoad from "../components/WalkingRoad";
import WalkingSubMission from "../components/WalkingSubMission";
import EndMarketQrScanner from "../components/EndMarketQrScanner";
import { formatWalkStartAt } from "@/pages/main/model/walkcard";

const WalkingPage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [roomDetail, setRoomDetail] = useState<RoomDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showQrScanner, setShowQrScanner] = useState(false);

  const title = roomDetail?.title ?? "산책 정보를 불러오는 중입니다.";

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
        const { roomDetail: detail } = await fetchRoomDetail(numericId);
        setRoomDetail(detail);
      } catch (err) {
        console.error("산책 방 정보 불러오기 실패:", err);
        setError("산책 방 정보를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [roomId]);

  return (
    <div className="flex h-dvh flex-col bg-linear-to-b from-sky-50 to-white px-6 py-8">
      <div className="flex h-full min-h-0 flex-col gap-10">
        <header className="flex flex-col gap-2">
          <p className="text-title-24-semibold text-black">{title}</p>
          {roomDetail?.startAt && (
            <span className="text-16-regular text-gray-600">
              {formatWalkStartAt(roomDetail.startAt)}
            </span>
          )}
          {error && (
            <span className="text-16-regular text-red-600">{error}</span>
          )}
        </header>

        <section className="flex flex-col gap-6">
          <WalkingSubMission missionName={roomDetail?.missionName} />
          <WalkingRoad
            pathImageUrl={roomDetail?.pathImageUrl}
            startMarketName={roomDetail?.startMarketName}
            endMarketName={roomDetail?.endMarketName}
          />
        </section>

        <div className="flex-1" />

        <div className="flex flex-col gap-6">
          {showQrScanner && roomDetail && (
            <EndMarketQrScanner
              roomId={roomDetail.roomId}
              onClose={() => setShowQrScanner(false)}
            />
          )}

          <footer className="sticky bottom-0 left-0 right-0 w-full bg-transparent py-4">
            <button
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-sky-500 py-4 text-title-20-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:ring-offset-1 focus:ring-offset-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
              onClick={() => setShowQrScanner(true)}
              disabled={!roomDetail || isLoading}
            >
              <LogOut className="icon-m" />
              <span className="flex">산책 종료하기</span>
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default WalkingPage;
