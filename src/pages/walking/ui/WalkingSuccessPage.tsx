import { PartyPopper, Wand2 } from "lucide-react";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { EndMarketResult } from "@/pages/detailwalk/model/startWalk";
import { formatWalkStartAt } from "@/pages/main/model/walkcard";
import type { MissionName } from "@/pages/createwalk/types/walkFunnel";

const WalkingSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const endResult = (
    location.state as { endResult?: EndMarketResult } | undefined
  )?.endResult;
  const missionLabels: Record<MissionName, string> = {
    NO_MISSION: "미션 없음",
    PLOGGING: "산책하며 플로깅 해요",
    DELIVERY: "산책하며 이웃에게 배달을 해요",
    PARK: "공원에서 함께 운동해요",
  };

  const formattedStart = useMemo(() => {
    if (!endResult?.roomDetail.startAt) return null;
    return formatWalkStartAt(endResult.roomDetail.startAt);
  }, [endResult?.roomDetail.startAt]);

  const distanceText = endResult ? `${endResult.distance.toFixed(1)}km` : "0km";
  const minutesText = useMemo(() => {
    const totalMinutes = endResult?.minutes ?? 0;
    if (totalMinutes < 60) return `${totalMinutes}분`;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (minutes === 0) return `${hours}시간`;
    return `${hours}시간 ${minutes}분`;
  }, [endResult?.minutes]);
  const missionLabel = endResult?.roomDetail.missionName
    ? missionLabels[endResult.roomDetail.missionName as MissionName] ??
      endResult.roomDetail.missionName
    : "미션 정보 없음";

  const handleGoHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="flex h-dvh flex-col bg-linear-to-b from-sky-50 to-white px-6 py-8 pb-28">
      <header className="flex flex-col gap-3">
        <div className="text-center">
          <p className="text-title-24-semibold text-black">
            {endResult?.roomDetail.title ?? "산책이 완료되었습니다"}
          </p>
          <p className="text-16-regular text-gray-500 mt-1">
            시작 시간 : {formattedStart ?? "알 수 없음"}
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-6 shadow-sm shadow-sky-100/70">
          <Wand2 className="icon-m" />
          <div className="flex flex-col">
            <span className="text-title-24-semibold text-black">
              {endResult?.roomDetail.title ?? "산책 제목"}
            </span>
          </div>
        </div>
      </header>

      <section className="mt-6 flex flex-col gap-4 rounded-2xl bg-white px-5 py-4 shadow-md shadow-sky-100/80">
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="flex flex-col gap-1 rounded-xl bg-sky-50/70 px-3 py-3">
            <span className="text-title-22-semibold text-black">
              {distanceText}
            </span>
            <span className="text-16-regular text-gray-500">이동 거리</span>
          </div>
          <div className="flex flex-col gap-1 rounded-xl bg-sky-50/70 px-3 py-3">
            <span className="text-title-22-semibold text-black">
              {minutesText}
            </span>
            <span className="text-16-regular text-gray-500">산책 시간</span>
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 px-4 py-3">
          <p className="text-title-18-semibold text-gray-500">서브 미션</p>
          <p className="text-title-20-semibold text-black mt-1">
            {missionLabel}
          </p>
        </div>

        <div className="rounded-2xl bg-linear-to-r from-sky-500 via-sky-400 to-emerald-400 px-5 py-6 shadow-md shadow-sky-200/70">
          <div className="flex items-start gap-3 text-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 shadow-inner shadow-sky-900/30">
              <PartyPopper className="icon-l" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-title-20-semibold leading-tight">산책을 성공적으로 완료했어요!</p>
              <p className="text-16-regular text-white/90">
                함께 걸으며 보낸 시간만큼 몸도 마음도 한결 가벼워졌어요.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="fixed inset-x-0 bottom-0 z-20 flex justify-center bg-transparent px-6 pb-[calc(env(safe-area-inset-bottom,0px)+16px)]">
        <div className="w-full max-w-[500px]">
          <button
            className="w-full rounded-2xl bg-sky-500 py-4 text-title-20-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:ring-offset-1 focus:ring-offset-white"
            onClick={handleGoHome}
          >
            홈화면으로 이동
          </button>
        </div>
      </footer>
    </div>
  );
};

export default WalkingSuccessPage;
