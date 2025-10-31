import KakaoLoginButton from "../components/KakaoLoginButton";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col w-full space-between">
        <div className="flex flex-col items-center justify-center">
          <div className="text-2xl font-bold">포포</div>
        </div>
        <div className="mt-10 px-0">
          <KakaoLoginButton />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
