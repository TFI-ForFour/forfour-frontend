import { LucideWandSparkles } from "lucide-react";

type ChooseCourseProps = {
  pathId?: string;
  onChangePathId?: (pathId: string) => void;
};

const ChooseCourse = ({ pathId, onChangePathId }: ChooseCourseProps) => {
  return (
    <>
      <div className="flex w-full items-center justify-start gap-2">
        <LucideWandSparkles className="icon-m text-blue-400" />
        <span className="flex text-title-24-semibold text-start">
          산책 방 생성하기
        </span>
      </div>

      <div className="flex flex-col w-full gap-4">
        <div className="flex items-center justify-start">
          <span className="flex text-title-22-semibold text-start">
            1. 산책 코스를 선택해주세요
          </span>
        </div>

        <div className="flex w-full gap-2">
          {/* 임시 ui */}
          <input
            id="pathId"
            type="text"
            placeholder="코스 ID를 입력해주세요"
            className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-body-16-regular placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
            value={pathId ?? ""}
            onChange={(e) => onChangePathId?.(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default ChooseCourse;
