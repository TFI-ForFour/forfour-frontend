import { useModal } from "@/shared/hooks/useModal";
import MyBadge from "../components/MyBadge";
import NickNameHeader from "../components/NickNameHeader";
import TotalStats from "../components/TotalStats";
import ChangeNickNameModal from "../components/ChangeNickNameModal";
import { useAuthStore } from "@/shared/store/authStore";

const MyPage = () => {
  const userProfile = useAuthStore((state) => state.profile);

  const {
    isOpen: isChangeNickNameModalOpen,
    open: openChangeNickNameModal,
    close: closeChangeNickNameModal,
  } = useModal();

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <NickNameHeader
        onOpen={openChangeNickNameModal}
        nickName={userProfile?.nickName}
      />
      <TotalStats
        totalDistance={userProfile?.totalDistance}
        totalWalkCount={userProfile?.totalWalkCount}
      />
      <MyBadge
        totalDistance={userProfile?.totalDistance}
        totalWalkCount={userProfile?.totalWalkCount}
      />
      {isChangeNickNameModalOpen && (
        <ChangeNickNameModal onClose={closeChangeNickNameModal} />
      )}
    </div>
  );
};

export default MyPage;
