import type { MissionName } from "@/pages/createwalk/types/walkFunnel";

const MISSION_LABEL: Record<MissionName, string> = {
  NO_MISSION: "미션 없음",
  PLOGGING: "산책하며 플로깅 해요",
  DELIVERY: "산책하며 이웃에게 배달을 해요",
  PARK: "공원에서 함께 운동해요",
};

type WalkingSubMissionProps = {
  missionName?: MissionName;
};

const WalkingSubMission = ({ missionName }: WalkingSubMissionProps) => {
  const label = missionName ? MISSION_LABEL[missionName] ?? missionName : "미션 정보가 없습니다";

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex items-center">
        <span className="flex text-title-22-semibold">
          아래의 미션을 완료해보세요!
        </span>
      </div>

      <div className="flex w-full rounded-xl border border-gray-200 bg-gray-100 shadow-sm items-center justify-center px-3 py-5">
        <span className="text-title-22-semibold">{label}</span>
      </div>
    </div>
  );
};

export default WalkingSubMission;
