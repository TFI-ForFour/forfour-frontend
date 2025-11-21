const WalkCard = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 border-[#ececec] bg-color color-black-15">
      {/* 산책 제목 */}
      <div className="flex text-title-20-semibold">산책 제목입니다~</div>

      {/* 출발 시간 안내 */}
      <div className="flex text-title-18-semibold">
        11월 15일 오전 10시 출발
      </div>

      {/* 신청 마감 안내 */}
      <div className="flex text-title-16-semibold text-color color-black-60">
        11월 14일 오후 10시까지 신청할 수 있어요
      </div>
    </div>
  );
};

export default WalkCard;
