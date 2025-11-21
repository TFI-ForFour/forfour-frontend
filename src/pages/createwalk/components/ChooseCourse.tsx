import { LucideWandSparkles } from "lucide-react";

const ChooseCourse = () => {
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

        <div className="flex w-full gap-2"></div>
      </div>
    </>
  );
};

export default ChooseCourse;
