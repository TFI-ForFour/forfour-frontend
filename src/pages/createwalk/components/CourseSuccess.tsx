import { useNavigate } from "react-router-dom";

const CourseSuccess = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="flex h-full flex-col items-center justify-between gap-10 bg-white p-6">
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <div className="flex items-center justify-center rounded-full bg-sky-50 px-4 py-2 text-title-20-semibold text-sky-600">
          성공!
        </div>
        <p className="text-title-24-semibold text-black">
          성공적으로 산책방이 생성됐어요
        </p>
        <p className="text-16-regular text-gray-600">
          이제 사람들과 함께 산책을 시작해보세요.
        </p>
      </div>

      <button
        className="w-full rounded-xl bg-sky-500 py-3 text-title-20-semibold text-white hover:bg-sky-600"
        onClick={handleGoHome}
      >
        처음 화면으로 돌아가기
      </button>
    </div>
  );
};

export default CourseSuccess;
