type CourseDetailProps = {
  pathImageUrl?: string;
  pathDescription?: string;
  startMarketName?: string;
  endMarketName?: string;
};

const CourseDetail = ({
  pathImageUrl,
  pathDescription,
  startMarketName,
  endMarketName,
}: CourseDetailProps) => {
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="relative w-full h-[220px] overflow-hidden rounded-2xl shadow-sm bg-gray-100 aspect-16/10">
        {pathImageUrl ? (
          <img
            src={pathImageUrl}
            alt="산책 코스 사진"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            코스 이미지가 없습니다
          </div>
        )}
      </div>

      {pathDescription && (
        <div className="rounded-xl bg-blue-50 px-3 py-2 text-15-semibold text-blue-700">
          {pathDescription}
        </div>
      )}

      <div className="flex flex-col gap-4 justify-center">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-full icon-l bg-gray-200">
            <span className="text-title-18-semibold">1</span>
          </div>

          <div className="flex gap-1 items-center">
            <span className="text-title-22-semibold">출발 :</span>
            <span className="text-title-22-semibold">
              {startMarketName ?? "-"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-full icon-l bg-gray-200">
            <span className="text-title-18-semibold">2</span>
          </div>

          <div className="flex gap-1 items-center">
            <span className="text-title-22-semibold">도착 :</span>
            <span className="text-title-22-semibold">
              {endMarketName ?? "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
