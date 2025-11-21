import TodayWalks from "../components/TodayWalks";
import UserWalks from "../components/UserWalks";

const MyWalksPage = () => {
  return (
    // 오늘 참여할 산책 + 참여 예정 중인 산책은 유저의 전체 산책 리스트를 API로 받아와,
    // 프론트에서 직접 오늘 날짜와 비교하여 분기 처리 후 UI에 반영하는 방식으로 구현 예정.
    <div className="flex flex-col items-center justify-center gap-8">
      <TodayWalks />
      <UserWalks />
    </div>
  );
};

export default MyWalksPage;
