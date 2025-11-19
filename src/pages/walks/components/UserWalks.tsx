import WalkCard from "@/shared/ui/WalkCard";

const UserWalks = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex items-center justify-start">
        <span className="flex text-title-22-semibold text-start">
          참여 예정중인 산책이에요
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <WalkCard />
      </div>
    </div>
  );
};

export default UserWalks;
