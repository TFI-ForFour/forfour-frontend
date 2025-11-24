import { LogOut } from "lucide-react";
import WalkingRoad from "../components/WalkingRoad";
import WalkingSubMission from "../components/WalkingSubMission";

const WalkingPage = () => {
  return (
    <div className="flex h-dvh flex-col bg-linear-to-b from-sky-50 to-white px-6 py-8">
      <div className="flex h-full min-h-0 flex-col gap-10">
        <header className="flex flex-col gap-2">
          <p className="text-title-24-semibold text-black">
            산책 제목이 들어올 자리입니다.
          </p>
        </header>

        <section className="flex flex-col gap-6">
          <WalkingSubMission />
          <WalkingRoad />
        </section>

        <div className="flex-1" />

        <footer className="sticky bottom-0 left-0 right-0 w-full bg-transparent py-4">
          <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-sky-500 py-4 text-title-20-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:ring-offset-1 focus:ring-offset-white">
            <LogOut className="icon-m" />
            <span className="flex">산책 종료하기</span>
          </button>
        </footer>
      </div>
    </div>
  );
};

export default WalkingPage;
