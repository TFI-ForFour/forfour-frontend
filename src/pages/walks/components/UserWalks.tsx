import WalkCard from "@/shared/ui/WalkCard";
import { formatWalkStartAt, type MyWalkRoom } from "../model/mywalk";

type UserWalksProps = {
  walks: MyWalkRoom[];
};

const UserWalks = ({ walks }: UserWalksProps) => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex items-center justify-start">
        <span className="flex text-title-22-semibold text-start">
          참여 예정인 산책이에요
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {walks.length === 0 ? (
          <div className="text-title-18-semibold text-gray-500">
            아직 산책에 참여하지 않았어요
          </div>
        ) : (
          walks.map((walk) => (
            <WalkCard
              key={walk.roomId}
              title={walk.title}
              startAt={formatWalkStartAt(walk.startAt)}
              startMarketName={walk.startMarketName}
              endMarketName={walk.endMarketName}
              leaderName={walk.leaderName}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserWalks;
