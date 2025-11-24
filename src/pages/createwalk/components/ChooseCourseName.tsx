type ChooseCourseNameProps = {
  courseName?: string;
  onChangeCourseName?: (name: string) => void;
};

const ChooseCourseName = ({
  courseName,
  onChangeCourseName,
}: ChooseCourseNameProps) => {
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex items-center justify-start">
        <span className="flex text-title-22-semibold text-start">
          2. 산책 방 이름을 정해주세요
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
    </div>
  );
};

export default ChooseCourseName;
