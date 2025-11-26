import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { kakaoLogin } from "../model/kakaoLogin";
import { setAuthToken } from "@/shared/api";
import { useAuthStore } from "@/shared/store";

const LoginCallBackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const code = searchParams.get("code");
  const setProfile = useAuthStore((state) => state.setProfile);

  useEffect(() => {
    const run = async () => {
      if (!code) {
        setError("카카오 인가 코드가 없습니다.");
        return;
      }

      try {
        const response = await kakaoLogin({ code });
        const { memberId, nickName, totalWalkCount, totalDistance, jwtToken } =
          response.data;

        const accessToken = jwtToken?.accessToken;
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          setAuthToken(accessToken);
        }

        setProfile({ memberId, nickName, totalWalkCount, totalDistance });
        navigate("/", { replace: true });
      } catch (err) {
        console.error(err);
        setError("로그인 처리 중 문제가 발생했습니다.");
      }
    };

    void run();
  }, [code, navigate, setProfile]);

  if (error) {
    return (
      <div className="flex h-dvh items-center justify-center bg-white px-6">
        <div className="rounded-xl border border-red-100 bg-red-50 px-6 py-4 text-center text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-dvh items-center justify-center bg-white px-6">
      <div className="rounded-xl border border-gray-100 bg-gray-50 px-6 py-4 text-center text-gray-700">
        로그인 처리 중입니다...
      </div>
    </div>
  );
};

export default LoginCallBackPage;
