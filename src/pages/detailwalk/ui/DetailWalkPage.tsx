import CourseDetail from "../components/CourseDetail";
import SubMission from "../components/SubMission";
import WalkPlayer from "../components/WalkPlayer";

const DetailWalkPage = () => {
  return (
    <div className="flex h-full min-h-0 flex-col items-center gap-10 pb-24">
      <div className="flex w-full flex-col gap-10">
        {/* 산책 제목 */}
        <div className="flex w-full items-center justify-start">
          <span className="flex text-title-24-semibold">
            산책 제목이 들어갈 자리입니다
          </span>
        </div>

        <CourseDetail />

        <SubMission />

        <div className="flex w-full items-center justify-start gap-3">
          <span className="flex text-title-22-semibold">방장 :</span>
          <span className="flex text-title-22-semibold">김가천</span>
        </div>

        <WalkPlayer />
      </div>

      <footer className="sticky bottom-0 left-0 right-0 w-full bg-transparent py-4">
        <button className="w-full rounded-xl bg-sky-500 py-3 text-title-20-semibold text-white transition hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:ring-offset-1 focus:ring-offset-white">
          참여하기
        </button>
      </footer>
    </div>
  );
};

export default DetailWalkPage;
