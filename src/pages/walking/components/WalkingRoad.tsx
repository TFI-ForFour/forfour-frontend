import { Check } from "lucide-react";

const WalkingRoad = () => {
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex items-center justify-start">
        <span className="flex text-title-22-semibold">가야할 목적지</span>
      </div>
      {/* 산책 코스 사진이 들어올 자리 */}
      <div className="flex w-full h-50 rounded-xl shadow-sm bg-gray-200" />

      {/* 출발지 도착지가 들어오는 자리입니다. */}
      <div className="flex flex-col gap-4 justify-center">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-full icon-l bg-gray-200">
              <span className="text-title-18-semibold">1</span>
            </div>

            <div className="flex items-center">
              <div className="flex gap-1 items-center">
                <span className="text-title-22-semibold">출발 :</span>
                <span className="text-title-22-semibold">사부작</span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex icon-l items-center justify-center rounded-xl bg-green-500">
              <Check className="icon-m text-black" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-full icon-l bg-gray-200">
            <span className="text-title-18-semibold">2</span>
          </div>

          <div className="flex gap-1 items-center">
            <span className="text-title-22-semibold">도착 :</span>
            <span className="text-title-22-semibold">복지관</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalkingRoad;
