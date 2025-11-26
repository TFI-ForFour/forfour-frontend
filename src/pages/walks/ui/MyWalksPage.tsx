import { useEffect, useMemo, useState } from "react";
import { fetchMyWalkRooms, type MyWalkRoom } from "../model/mywalk";
import TodayWalks from "../components/TodayWalks";
import UserWalks from "../components/UserWalks";

const MyWalksPage = () => {
  const [walks, setWalks] = useState<MyWalkRoom[]>([]);

  useEffect(() => {
    const loadWalks = async () => {
      try {
        const rooms = await fetchMyWalkRooms({});
        setWalks(rooms);
      } catch (error) {
        console.error("내 산책 목록을 불러오지 못했습니다.", error);
      }
    };

    loadWalks();
  }, []);

  const todayWalks = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();

    return walks.filter((walk) => {
      const start = new Date(walk.startAt);
      return (
        start.getFullYear() === year &&
        start.getMonth() === month &&
        start.getDate() === date
      );
    });
  }, [walks]);

  return (
    // 오늘 참여할 산책 + 참여 예정 중인 산책은 유저의 전체 산책 리스트를 API로 받아와,
    // 프론트에서 직접 오늘 날짜와 비교하여 분기 처리 후 UI에 반영하는 방식으로 구현 예정.
    <div className="flex flex-col items-center justify-center gap-8">
      <TodayWalks walks={todayWalks} />
      <UserWalks walks={walks} />
    </div>
  );
};

export default MyWalksPage;
