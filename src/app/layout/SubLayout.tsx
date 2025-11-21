import { ChevronLeft } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

const SubLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-dvh flex-col bg-white">
      <header className="relative flex h-14 shrink-0 items-center px-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute left-4 flex items-center gap-1 rounded-md px-2 py-1 text-title-18-semibold text-gray-900"
        >
          <ChevronLeft className="icon-m" />
          <span className="flex items-center">뒤로가기</span>
        </button>
      </header>

      <main className="flex-1 min-h-0 overflow-y-auto px-8 py-4">
        <Outlet />
      </main>
    </div>
  );
};

export default SubLayout;
