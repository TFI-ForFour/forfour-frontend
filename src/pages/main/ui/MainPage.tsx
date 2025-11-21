import CreateWalkButton from "../components/CreateWalkButton";
import WalkListContainer from "../components/WalkListContainer";
import WelcomeContainer from "../components/WelcomeContainer";

const MainPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <WelcomeContainer />
      <CreateWalkButton />
      <WalkListContainer />
    </div>
  );
};

export default MainPage;
