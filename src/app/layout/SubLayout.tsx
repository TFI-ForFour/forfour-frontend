import { ChevronLeft } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

type SubLayoutProps = {
  backTo?: string;
};

type LocationStateWithBack = {
  backTo?: string;
};

const SubLayout = ({ backTo }: SubLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as LocationStateWithBack | null;
  const backTarget = locationState?.backTo ?? backTo;

  const handleBack = () => {
    if (backTarget) {
      navigate(backTarget);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex h-dvh flex-col bg-gray-50">
      <header className="relative flex h-18 shrink-0 items-center px-4">
        <button
          type="button"
          onClick={handleBack}
          className="absolute left-4 flex items-center gap-1 rounded-md px-2 py-1 text-title-20-semibold text-gray-900"
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
