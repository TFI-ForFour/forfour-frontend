type TotalStatsProps = {
  totalDistance?: number;
  totalWalkCount?: number;
};

const TotalStats = ({
  totalDistance = 0,
  totalWalkCount = 0,
}: TotalStatsProps) => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex items-center justify-start">
        <span className="flex text-title-22-semibold text-start">
          벌써 이만큼 달성했어요!
        </span>
      </div>

      <div className="flex w-full rounded-xl border-2 border-amber-50 bg-gray-100 py-7 px-6 items-center justify-center">
        <div className="flex w-full">
          <div className="flex flex-col w-1/2 items-center justify-center gap-2">
            <span className="flex text-title-16-semibold">총 산책 거리</span>
            <span className="flex text-headline-28-bold">
              {totalDistance.toFixed(1)}KM
            </span>
          </div>

          <div className="flex flex-col w-1/2 items-center justify-center gap-2">
            <span className="flex text-title-16-semibold">산책 횟수</span>
            <span className="flex text-headline-28-bold">
              {totalWalkCount}회
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalStats;
