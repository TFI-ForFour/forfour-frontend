import { useNavigate } from "react-router-dom";

const CreateWalkButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="flex w-full rounded-full py-4 items-center justify-center bg-sky-300"
      onClick={() => {
        navigate("/createwalk");
      }}
    >
      <div className="text-white text-[18px] font-medium">
        지금 바로 산책 생성하기
      </div>
    </button>
  );
};

export default CreateWalkButton;
