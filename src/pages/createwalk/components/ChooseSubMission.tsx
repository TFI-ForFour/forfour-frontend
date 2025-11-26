import { useEffect } from "react";
import type { MissionName } from "../types/walkFunnel";

type ChooseSubMissionProps = {
  subMission?: MissionName;
  onChangeSubMission?: (mission: MissionName) => void;
};

type MissionOption = {
  label: string;
  value: MissionName;
};

const MISSIONS: MissionOption[] = [
  { label: "미션은 하지 않을래요.", value: "NO_MISSION" },
  { label: "산책을 하며 함께 쓰레기를 주워봐요.", value: "PLOGGING" },
  { label: "산책을 하며 함께 이웃 주민에게 배달을 해봐요.", value: "DELIVERY" },
  { label: "산책을 하며 공원에서 운동을 해봐요.", value: "PARK" },
];

const DEFAULT_MISSION = MISSIONS[0].value;

const ChooseSubMission = ({
  subMission,
  onChangeSubMission,
}: ChooseSubMissionProps) => {
  const selected = subMission ?? DEFAULT_MISSION;

  useEffect(() => {
    if (!subMission) {
      onChangeSubMission?.(DEFAULT_MISSION);
    }
  }, [onChangeSubMission, subMission]);

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex flex-col gap-2 items-start justify-center">
        <span className="flex text-title-22-semibold text-start">
          4. 미션을 선택해주세요
        </span>

        <span className="flex text-17-semibold text-start">
          필수 선택은 아니에요
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {MISSIONS.map((mission) => {
          const id = `${mission.value}`;
          const isChecked = selected === mission.value;

          return (
            <label
              key={mission.value}
              htmlFor={id}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition text-black ${
                isChecked
                  ? "border-blue-500 bg-white shadow-sm"
                  : "border-gray-200 bg-white/80 hover:border-blue-200"
              }`}
            >
              <input
                id={id}
                type="checkbox"
                checked={isChecked}
                onChange={() => onChangeSubMission?.(mission.value)}
                className="h-5 w-5 accent-blue-500"
              />
              <span className="text-16-semibold">{mission.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default ChooseSubMission;
