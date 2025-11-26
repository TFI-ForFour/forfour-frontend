import { useAuthStore } from "@/shared/store";

const WelcomeContainer = () => {
  const nickname = useAuthStore((state) => state.profile?.nickName);

  return (
    <div className="flex flex-col w-full py-2 items-center text-center justify-center">
      <div className="flex text-[34px] font-medium">{nickname}님,</div>
      <div className="flex text-[30px] font-medium">
        어떤 산책을 떠나볼까요?
      </div>
    </div>
  );
};

export default WelcomeContainer;
