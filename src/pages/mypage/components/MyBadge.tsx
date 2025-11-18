const MyBadge = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex items-center justify-start">
        <span className="flex text-title-22-semibold text-start">
          내가 얻은 뱃지
        </span>
      </div>

      {/* API 적용 방안 : 백엔드로부터 해당 유저의 총 거리, 총 산책 횟수를 받아 프론트에서 각 km, 산책 횟수를 분기 처리하여 UI에 반영 */}
      <div className="grid grid-cols-2 w-full gap-4">
        <div className="flex flex-col gap-4 w-full rounded-xl border-2 border-gray-50 bg-gray-200 items-center justify-center p-4">
          {/* 뱃지 이미지 들어갈 곳 */}
          <div className="flex w-full h-[140px] bg-gray-300 rounded-full" />

          <div className="flex w-full items-center justify-center">
            <span className="flex text-title-16-semibold">16KM 달성!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBadge;
