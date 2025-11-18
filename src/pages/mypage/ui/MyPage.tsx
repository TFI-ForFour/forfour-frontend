import MyBadge from "../components/MyBadge";
import NickNameHeader from "../components/NickNameHeader";
import TotalStats from "../components/TotalStats";

const MyPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <NickNameHeader />
      <TotalStats />
      <MyBadge />
    </div>
  );
};

export default MyPage;
