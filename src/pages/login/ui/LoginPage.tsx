import { Logo } from "@/shared/assets";
import KakaoLoginButton from "../components/KakaoLoginButton";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col w-full gap-12">
        <div className="flex flex-col items-center justify-center gap-3">
          <img
            src={Logo}
            alt="포포 로고"
            className="w-[120px] h-[120px] object-contain"
          />
          <div className="flex text-headline-32-bold">포포</div>
          <div className="flex text-16-medium text-center">
            동네 사람들과 함께 산책을
            <br />
            즐겨보세요
          </div>
        </div>

        <div className="flex px-0">
          <KakaoLoginButton />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
