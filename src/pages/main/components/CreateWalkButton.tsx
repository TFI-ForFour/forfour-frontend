import { useNavigate } from "react-router-dom";

const CreateWalkButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="flex w-full items-center justify-center gap-2 rounded-full bg-sky-500 px-5 py-4 text-title-18-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:ring-offset-1 focus:ring-offset-white active:scale-[0.99]"
      onClick={() => {
        navigate("/createwalk");
      }}
    >
      <span className="flex items-center justify-center">지금 바로 산책 생성하기</span>
    </button>
  );
};

export default CreateWalkButton;
