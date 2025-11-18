import { Footprints, Home, User } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const NAVIGATION_ITEMS = [
  { to: "/", label: "홈", Icon: Home, end: true },
  { to: "/walks", label: "내 산책", Icon: Footprints },
  { to: "/mypage", label: "마이페이지", Icon: User },
];

const MainLayout = () => {
  return (
    <div className="flex flex-col bg-white h-dvh">
      <header className="flex h-20 shrink-0 items-center justify-center border-b border-gray-200">
        <span className="text-3xl font-extrabold text-sky-500">포포</span>
      </header>

      <main className="flex-1 min-h-0 overflow-y-auto px-8 py-6">
        <Outlet />
      </main>

      <nav className="sticky bottom-0 left-0 right-0 shrink-0 border-t border-gray-200 bg-white px-6 py-4">
        <ul className="flex items-center justify-between gap-6">
          {NAVIGATION_ITEMS.map(({ to, label, Icon, end }) => (
            <li key={to} className="flex-1">
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  [
                    "flex flex-col items-center justify-center gap-2 text-base font-semibold transition-colors",
                    isActive ? "text-sky-500" : "text-gray-500",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={28}
                      strokeWidth={2.2}
                      className={isActive ? "text-sky-500" : "text-gray-500"}
                    />
                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MainLayout;
