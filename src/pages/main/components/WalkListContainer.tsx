import WalkCard from "./WalkCard";

const WalkListContainer = () => {
  return (
    <div className="flex flex-col w-full justify-start gap-4">
      <div className="flex items-center">
        <div className="flex text-title-20-semibold">참여 가능한 산책</div>
      </div>

      <div className="flex flex-col gap-3">
        {/* 산책 카드 리스트 */}
        <WalkCard />
        <WalkCard />
        <WalkCard />
        <WalkCard />
        <WalkCard />
      </div>
    </div>
  );
};

export default WalkListContainer;
