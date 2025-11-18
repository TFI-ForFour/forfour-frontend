import { useModal } from "@/shared/hooks/useModal";
import MyBadge from "../components/MyBadge";
import NickNameHeader from "../components/NickNameHeader";
import TotalStats from "../components/TotalStats";
import ChangeNickNameModal from "../components/ChangeNickNameModal";

const MyPage = () => {
  const {
    isOpen: isChangeNickNameModalOpen,
    open: openChangeNickNameModal,
    close: closeChangeNickNameModal,
  } = useModal();

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <NickNameHeader onOpen={openChangeNickNameModal} />
      <TotalStats />
      <MyBadge />
      {isChangeNickNameModalOpen && (
        <ChangeNickNameModal onClose={closeChangeNickNameModal} />
      )}
    </div>
  );
};

export default MyPage;
