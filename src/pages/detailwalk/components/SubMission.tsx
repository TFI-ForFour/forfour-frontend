const SubMission = () => {
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex items-center">
        <span className="flex text-title-22-semibold">산책 미션</span>
      </div>

      {/* 미션 내용이 들어올 자리입니다. */}
      <div className="flex w-full rounded-xl border border-gray-200 bg-gray-100 shadow-sm items-center justify-center px-3 py-5">
        <span className="text-title-22-semibold">서브 미션 입니다.</span>
      </div>
    </div>
  );
};

export default SubMission;
