import { Wand2 } from "lucide-react";

import { useNavigate } from "react-router-dom";

const WalkingSuccessPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="flex h-dvh flex-col bg-linear-to-b from-sky-50 to-white px-6 py-8">
      <header className="flex flex-col gap-3">
        <div className="text-center">
          <p className="text-title-24-semibold text-black">오늘의 산책</p>
          <p className="text-16-regular text-gray-500 mt-1">
            시작 시간 : 2025년 12월 25일 오후 3시 30분
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-6 shadow-sm shadow-sky-100/70">
          <Wand2 className="icon-m" />
          <div className="flex flex-col">
            <span className="text-title-24-semibold text-black">
              산책 제목이 들어올 자리입니다
            </span>
          </div>
        </div>
      </header>

      <section className="mt-6 flex flex-col gap-4 rounded-2xl bg-white px-5 py-4 shadow-md shadow-sky-100/80">
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="flex flex-col gap-1 rounded-xl bg-sky-50/70 px-3 py-3">
            <span className="text-title-22-semibold text-black">1.5km</span>
            <span className="text-16-regular text-gray-500">이동 거리</span>
          </div>
          <div className="flex flex-col gap-1 rounded-xl bg-sky-50/70 px-3 py-3">
            <span className="text-title-22-semibold text-black">1시간 2분</span>
            <span className="text-16-regular text-gray-500">산책 시간</span>
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 px-4 py-3">
          <p className="text-title-18-semibold text-gray-500">서브 미션</p>
          <p className="text-title-20-semibold text-black mt-1">
            서브 미션이 들어올 자리입니다
          </p>
        </div>

        <div className="rounded-2xl bg-white px-4 py-6 shadow-inner shadow-gray-200">
          <div className="flex h-36 items-center justify-center rounded-xl bg-linear-to-b from-gray-50 to-gray-100 text-16-regular text-gray-500">
            코스 사진
          </div>
        </div>
      </section>

      <div className="mt-auto pt-6">
        <button
          className="w-full rounded-2xl bg-sky-500 py-4 text-title-20-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:ring-offset-1 focus:ring-offset-white"
          onClick={handleGoHome}
        >
          홈화면으로 이동
        </button>
      </div>
    </div>
  );
};

export default WalkingSuccessPage;
