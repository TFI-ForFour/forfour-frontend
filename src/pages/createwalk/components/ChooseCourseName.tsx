type ChooseCourseNameProps = {
  courseName?: string;
  onChangeCourseName?: (name: string) => void;
  maxParticipants?: number;
  onChangeMaxParticipants?: (count: number) => void;
};

const ChooseCourseName = ({
  courseName,
  onChangeCourseName,
  maxParticipants,
  onChangeMaxParticipants,
}: ChooseCourseNameProps) => {
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex items-center justify-start">
        <span className="flex text-title-22-semibold text-start">
          2. 산책 방 이름과 최대 인원을 정해주세요
        </span>
      </div>

      <div className="flex w-full gap-2">
        <input
          id="courseName"
          type="text"
          placeholder="산책방의 이름을 입력해주세요"
          className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-body-16-regular placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
          value={courseName ?? ""}
          onChange={(e) => onChangeCourseName?.(e.target.value)}
        />
      </div>

      <div className="flex w-full items-center gap-4">
        <span className="text-title-16-semibold text-gray-700">최대 인원</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              const currentValue = maxParticipants ?? 1;
              if (currentValue > 1) {
                onChangeMaxParticipants?.(currentValue - 1);
              }
            }}
            disabled={(maxParticipants ?? 1) <= 1}
          >
            -
          </button>
          <span className="min-w-12 text-center text-body-16-semibold">
            {maxParticipants ?? 1}
          </span>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            onClick={() => {
              const currentValue = maxParticipants ?? 1;
              onChangeMaxParticipants?.(currentValue + 1);
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseCourseName;
