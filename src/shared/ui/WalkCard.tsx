type WalkCardProps = {
  title: string;
  startAt: string;
  startMarketName: string;
  endMarketName: string;
  leaderName: string;
};

const WalkCard = ({
  title,
  startAt,
  startMarketName,
  endMarketName,
  leaderName,
}: WalkCardProps) => {
  return (
    <div className="flex flex-col w-full gap-2 rounded-xl p-4 justify-center border border-gray-200 bg-gray-300">
      {/* 산책 제목 */}
      <div className="flex items-center">
        <span className="text-title-20-semibold">{title}</span>
      </div>

      {/* 산책 예정 시간 */}
      <div className="flex items-center">
        <span className="text-title-24-semibold">{startAt}</span>
      </div>

      {/* 모이는 장소 */}
      <div className="flex items-center">
        <span className="text-title-22-semibold">
          모이는 장소: {startMarketName}
        </span>
      </div>

      {/* 도착 예정 장소 */}
      <div className="flex items-center">
        <span className="text-title-22-semibold">
          도착 장소: {endMarketName}
        </span>
      </div>

      {/* 산책 방장 닉네임 */}
      <div className="flex items-center mt-3">
        <span className="text-title-20-semibold">방장: {leaderName}</span>
      </div>
    </div>
  );
};

export default WalkCard;
