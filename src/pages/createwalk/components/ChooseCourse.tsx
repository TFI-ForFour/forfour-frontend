import { ChevronLeft, ChevronRight, LucideWandSparkles } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { fetchPathList, type PathListItem } from "../model/fetchPathList";

const DEFAULT_CONTAINER_HEIGHT = 340;

const formatDistance = (distance: number) => {
  if (!Number.isFinite(distance)) return "-";
  return Number(distance.toFixed(1)).toString();
};

type ChooseCourseProps = {
  pathId?: string;
  onChangePathId?: (pathId: string) => void;
};

const ChooseCourse = ({ pathId, onChangePathId }: ChooseCourseProps) => {
  const [courses, setCourses] = useState<PathListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState<number>(
    DEFAULT_CONTAINER_HEIGHT
  );
  const activeCardRef = useRef<HTMLDivElement | null>(null);

  const currentCourse = useMemo(
    () => courses[currentIndex],
    [courses, currentIndex]
  );

  const handleSelect = (nextIndex: number) => {
    if (courses.length === 0) return;

    const clampedIndex = Math.min(courses.length - 1, Math.max(0, nextIndex));
    setCurrentIndex(clampedIndex);
    onChangePathId?.(courses[clampedIndex].pathId.toString());
  };

  useEffect(() => {
    if (courses.length === 0) return;

    const matchedIndex = courses.findIndex(
      (course) => course.pathId.toString() === pathId
    );

    if (matchedIndex !== -1) {
      if (matchedIndex !== currentIndex) {
        setCurrentIndex(matchedIndex);
      }
      return;
    }

    // pathId가 아직 설정되지 않았다면 첫 번째 코스로 초기화
    if (!pathId) {
      const fallbackId = courses[0].pathId.toString();
      if (fallbackId !== pathId) {
        onChangePathId?.(fallbackId);
      }
      if (currentIndex !== 0) {
        setCurrentIndex(0);
      }
    }
  }, [courses, currentIndex, onChangePathId, pathId]);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPathList(5, 0);
        setCourses(data);
        if (data.length > 0 && !pathId) {
          onChangePathId?.(data[0].pathId.toString());
        }
      } catch (error) {
        console.error("경로 목록을 불러오지 못했습니다.", error);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [onChangePathId, pathId]);

  useLayoutEffect(() => {
    // Keep a stable container height to prevent vertical jitter between cards
    if (!activeCardRef.current) return;
    const measured = activeCardRef.current.offsetHeight;
    setContainerHeight((prev) => Math.max(prev, measured));
  }, [currentCourse, currentIndex]);

  return (
    <>
      <div className="flex w-full items-center justify-start gap-2">
        <LucideWandSparkles className="icon-m text-blue-400" />
        <span className="flex text-title-24-semibold text-start">
          산책 방 생성하기
        </span>
      </div>

      <div className="flex flex-col w-full gap-4">
        <div className="flex items-center justify-start">
          <span className="flex text-title-22-semibold text-start">
            1. 산책 코스를 선택해주세요
          </span>
        </div>

        <div className="flex w-full flex-col gap-4">
          {!isLoading && courses.length === 0 && (
            <div className="flex items-center justify-center py-8 text-gray-500">
              표시할 코스가 없습니다.
            </div>
          )}

          <div
            className="relative w-full overflow-hidden rounded-2xl"
            style={{ minHeight: containerHeight }}
          >
            {currentCourse && (
              <div className="w-full px-1 py-2" ref={activeCardRef}>
                <div className="flex w-full flex-col gap-3">
                  <div className="relative w-full h-[220px] overflow-hidden rounded-2xl aspect-16/10">
                    <img
                      src={currentCourse.pathImageUrl}
                      alt={`${currentCourse.pathName} 경로 사진`}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-col gap-2 px-1">
                    <p className="text-title-22-semibold text-gray-900">
                      {currentCourse.pathName}
                    </p>
                    {currentCourse.pathDescription && (
                      <p className="text-16-regular text-gray-600">
                        {currentCourse.pathDescription}
                      </p>
                    )}
                    <p className="text-title-16-semibold text-gray-800">
                      예상 거리 : {formatDistance(currentCourse.distance)}km
                    </p>
                    <p className="text-title-16-semibold text-gray-700">
                      출발지 : {currentCourse.startMarketName}
                    </p>
                    <p className="text-title-16-semibold text-gray-700">
                      목적지 : {currentCourse.endMarketName}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 text-gray-600">
                코스를 불러오는 중...
              </div>
            )}

            <button
              type="button"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow disabled:opacity-40"
              onClick={() => handleSelect(currentIndex - 1)}
              disabled={currentIndex === 0 || courses.length === 0}
              aria-label="이전 코스 보기"
            >
              <ChevronLeft className="icon-m" />
            </button>
            <button
              type="button"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow disabled:opacity-40"
              onClick={() => handleSelect(currentIndex + 1)}
              disabled={
                currentIndex === courses.length - 1 || courses.length === 0
              }
              aria-label="다음 코스 보기"
            >
              <ChevronRight className="icon-m" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2">
            {courses.map((course, index) => (
              <button
                key={course.pathId}
                type="button"
                onClick={() => handleSelect(index)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  currentIndex === index ? "bg-sky-500" : "bg-gray-300"
                }`}
                aria-label={`${course.pathName} 선택`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseCourse;
