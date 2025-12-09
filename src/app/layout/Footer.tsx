import KakaoLogo from "@/shared/assets/footer/kakao.svg?react";
import KakaoImpactLogo from "@/shared/assets/footer/kakao_impact.svg?react";
import footerMent from "@/shared/assets/footer/ment.png";

const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center gap-5 text-gray-500">
      <div className="flex items-center gap-3 text-[#000000]">
        <KakaoLogo className="h-4 w-auto text-[#000000]" />
        <span className="text-xl leading-none">|</span>
        <KakaoImpactLogo className="h-4 w-auto text-[#1E1E1E]" />
      </div>

      <img
        src={footerMent}
        alt="서비스 후원 안내 문구"
        className="h-12 w-auto object-contain"
      />
    </footer>
  );
};

export default Footer;
