import { useEffect, useState } from "react";
import {
  fetchWalkRooms,
  formatWalkStartAt,
  type WalkRoom,
} from "../model/walkcard";
import WalkCard from "@/shared/ui/WalkCard";

const WalkListContainer = () => {
  const [walkRooms, setWalkRooms] = useState<WalkRoom[]>([]);

  useEffect(() => {
    const loadWalkRooms = async () => {
      try {
        const rooms = await fetchWalkRooms({});
        setWalkRooms(rooms);
      } catch (error) {
        console.error("산책방 목록을 불러오지 못했습니다.", error);
      }
    };

    loadWalkRooms();
  }, []);

  return (
    <div className="flex flex-col w-full justify-start gap-4">
      <div className="flex items-center">
        <div className="flex text-title-20-semibold">참여 가능한 산책</div>
      </div>

      <div className="flex flex-col gap-3">
        {walkRooms.length === 0 ? (
          <div className="text-title-18-semibold text-gray-500">
            첫번째 산책의 주인공이 되어 보세요!
          </div>
        ) : (
          walkRooms.map((room) => (
            <WalkCard
              key={room.roomId}
              title={room.title}
              startAt={formatWalkStartAt(room.startAt)}
              startMarketName={room.startMarketName}
              endMarketName={room.endMarketName}
              leaderName={room.leaderName}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default WalkListContainer;
