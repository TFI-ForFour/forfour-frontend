import Footer from "@/app/layout/Footer";
import { Logo } from "@/shared/assets";
import KakaoLoginButton from "../components/KakaoLoginButton";

const LoginPage = () => {
  return (
    <div className="flex min-h-dvh flex-col bg-white px-7.5 py-10">
      <div className="flex flex-1 flex-col items-center justify-center px-8">
        <div className="flex w-full flex-col items-center gap-12">
          <div className="flex flex-col items-center justify-center gap-3">
            <img
              src={Logo}
              alt="포포 로고"
              className="h-[120px] w-[120px] object-contain"
            />
            <div className="flex text-headline-32-bold">포포</div>
            <div className="flex text-16-medium text-center">
              동네 사람들과 함께 산책을
              <br />
              즐겨보세요
            </div>
          </div>

          <div className="flex w-full px-0">
            <KakaoLoginButton />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;
