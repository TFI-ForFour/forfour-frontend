const KakaoLoginButton = () => {
  return (
    <button
      type="button"
      className="w-full max-w-[320px] h-12 mx-auto bg-[#FEE500] rounded-xl flex justify-center items-center gap-2 active:opacity-90 px-2"
      aria-label="카카오 로그인"
    >
      <div className=" justify-center inline-flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-black w-5 h-5 shrink-0"
          aria-hidden
        >
          <path d="M12 3C6.477 3 2 6.58 2 10.996c0 2.77 1.83 5.206 4.62 6.66-.16.595-.57 2.12-.65 2.45-.1.41.15.4.32.29.13-.08 2.06-1.4 2.89-1.96.92.14 1.87.21 2.82.21 5.523 0 10-3.58 10-7.996C24 6.58 19.523 3 12 3z" />
        </svg>
        <span
          className="text-[15px] font-medium"
          style={{ color: "rgba(0,0,0,0.85)" }}
        >
          카카오 로그인
        </span>
      </div>
    </button>
  );
};

export default KakaoLoginButton;
