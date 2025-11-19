const WalkCard = () => {
  return (
    <div className="flex flex-col w-full gap-2 rounded-xl p-4 justify-center border border-gray-200 bg-gray-300">
      {/* 산책 제목 */}
      <div className="flex items-center">
        <span className="text-title-20-semibold">산책 제목 자리입니다</span>
      </div>

      {/* 산책 예정 시간 */}
      <div className="flex items-center">
        <span className="text-title-24-semibold">
          2025년 11월 25일 (월) 오후 2시
        </span>
      </div>

      {/* 모이는 장소 */}
      <div className="flex items-center">
        <span className="text-title-22-semibold">모이는 장소: 사부작 앞</span>
      </div>

      {/* 도착 예정 장소 */}
      <div className="flex items-center">
        <span className="text-title-22-semibold">도착 장소: 사부작 앞</span>
      </div>
    </div>
  );
};

export default WalkCard;
