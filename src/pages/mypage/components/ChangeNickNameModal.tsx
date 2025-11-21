import type { ChangeNickNameModalProps } from "@/shared/types/modal";

const ChangeNickNameModal = ({ onClose }: ChangeNickNameModalProps) => {
  return (
    // 모달 바깥 배경 부분을 반투명으로 처리할지 그냥 검정 화면으로 둘지 테스트해봐야 함
    // 이유 : 반투명일 경우 뒤에 있는 화면이 보이면서 집중도가 떨어질 수 있음
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black px-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-3">
          <div className="text-title-20-bold">닉네임 변경</div>
          <p className="text-14-regular text-gray-500">
            아직 닉네임 수정 기능을 준비 중입니다.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="rounded-xl border border-gray-200 px-4 py-2 text-16-medium"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeNickNameModal;
