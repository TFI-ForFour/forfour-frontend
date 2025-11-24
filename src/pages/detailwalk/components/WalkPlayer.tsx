import { User2 } from "lucide-react";

const WalkPlayer = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex items-center">
        <span className="flex text-title-22-semibold">참여하는 사람들</span>
      </div>

      <div className="flex items-center gap-3">
        {/* 참여자 아바타 */}
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="flex icon-xl rounded-full items-center justify-center bg-gray-200">
            <User2 className="icon-m text-black" />
          </div>

          <span className="text-14-medium">참가자1</span>
        </div>
      </div>
    </div>
  );
};

export default WalkPlayer;
