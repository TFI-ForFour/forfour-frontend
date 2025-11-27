import { X } from "lucide-react";

type CourseImageModalProps = {
  imageUrl: string;
  title: string;
  onClose: () => void;
};

const CourseImageModal = ({ imageUrl, title, onClose }: CourseImageModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        <button
          type="button"
          className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 text-gray-800 shadow hover:bg-white"
          onClick={onClose}
          aria-label="닫기"
        >
          <X className="icon-s" />
        </button>
        <img
          src={imageUrl}
          alt={`${title} 크게 보기`}
          className="h-full w-full max-h-[80vh] object-contain bg-black"
        />
      </div>
    </div>
  );
};

export default CourseImageModal;
