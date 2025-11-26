import { useState } from "react";
import { updateNickname } from "../model/changeNickname";
import { useAuthStore } from "@/shared/store";
import type { ChangeNickNameModalProps } from "@/shared/types/modal";

const ChangeNickNameModal = ({ onClose }: ChangeNickNameModalProps) => {
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const profile = useAuthStore((state) => state.profile);
  const setProfile = useAuthStore((state) => state.setProfile);

  const handleSubmit = async () => {
    const trimmed = nickname.trim();
    if (!trimmed) {
      setError("닉네임을 입력해주세요.");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      await updateNickname(trimmed);
      if (profile) {
        setProfile({ ...profile, nickName: trimmed });
      }
      onClose();
    } catch (err) {
      console.error(err);
      setError("닉네임을 변경하지 못했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // 모달 바깥 배경 부분을 반투명으로 처리할지 그냥 검정 화면으로 둘지 테스트해봐야 함
    // 이유 : 반투명일 경우 뒤에 있는 화면이 보이면서 집중도가 떨어질 수 있음
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-3">
          <div className="text-title-24-semibold">닉네임 변경</div>
          <label className="flex flex-col gap-2 text-14-regular text-gray-700">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-4 text-16-medium focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="새 닉네임을 입력하세요"
            />
          </label>
          {error && <p className="text-14-regular text-red-500">{error}</p>}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="rounded-xl border border-gray-200 px-4 py-2 text-16-medium text-gray-700 mr-2"
            onClick={onClose}
            disabled={isSubmitting}
          >
            닫기
          </button>
          <button
            type="button"
            className="rounded-xl bg-color color-primary border border-primary px-4 py-2 text-16-medium text-white disabled:opacity-60"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "변경 중..." : "변경하기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeNickNameModal;
