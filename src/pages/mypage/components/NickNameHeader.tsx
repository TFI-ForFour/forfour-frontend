import type { ModalBaseOpenProps } from "@/shared/types/modal";
import { User2 } from "lucide-react";

const NickNameHeader = ({ onOpen }: ModalBaseOpenProps) => {
  return (
    <div className="flex w-full items-center gap-2 justify-between">
      <div className="flex w-full gap-1 items-center">
        <div className="flex items-center justify-center rounded-full border border-gray-200 p-2">
          <User2 className="flex icon-m" />
        </div>

        <div className="flex text-headline-24-bold items-center truncate">
          <span>도레미파솔라시도</span>
        </div>
      </div>

      <div className="flex">
        <button
          className="flex rounded-xl border border-gray-100 py-4 px-2 items-center justify-center text-title-18-semibold whitespace-nowrap"
          onClick={onOpen}
        >
          <span>닉네임 변경</span>
        </button>
      </div>
    </div>
  );
};
export default NickNameHeader;
