import { useEffect, useRef, useState } from "react";

type SelectDateProps = {
  selectedDate: Date | null;
  onChange: (date: Date) => void;
};

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

const SelectDate = ({ selectedDate, onChange }: SelectDateProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const handleSelectDate = (day: number) => {
    const picked = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth(),
      day
    );
    onChange(picked);
    setVisibleMonth(new Date(picked.getFullYear(), picked.getMonth(), 1));
    setIsCalendarOpen(false);
  };

  const daysInVisibleMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfWeek = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth(),
    1
  ).getDay();

  const goToPreviousMonth = () => {
    setVisibleMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setVisibleMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  useEffect(() => {
    if (!isCalendarOpen) return undefined;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        calendarRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }
      setIsCalendarOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCalendarOpen]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <span className="flex text-16-medium">날짜를 골라주세요</span>
        <button
          ref={triggerRef}
          className="flex text-16-semibold rounded-xl border border-gray-200 bg-gray-50 px-3 py-1 hover:border-blue-200"
          onClick={() => setIsCalendarOpen((prev) => !prev)}
        >
          날짜 선택
        </button>
      </div>
      {isCalendarOpen && (
        <div className="relative" ref={calendarRef}>
          <div className="absolute z-10 mt-2 w-full rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <button
                className="rounded-lg border border-gray-200 px-3 py-1 text-14-medium hover:border-blue-200"
                onClick={goToPreviousMonth}
                aria-label="이전 달"
              >
                이전
              </button>
              <div className="text-16-semibold">
                {visibleMonth.getFullYear()}년{" "}
                {new Intl.DateTimeFormat("ko-KR", {
                  month: "long",
                }).format(visibleMonth)}
              </div>
              <button
                className="rounded-lg border border-gray-200 px-3 py-1 text-14-medium hover:border-blue-200"
                onClick={goToNextMonth}
                aria-label="다음 달"
              >
                다음
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-14-medium text-gray-500">
              {WEEKDAYS.map((weekday) => (
                <span key={weekday}>{weekday}</span>
              ))}
              {Array.from({ length: firstDayOfWeek }).map((_, index) => (
                <span key={`empty-${index}`} />
              ))}
              {Array.from({ length: daysInVisibleMonth }).map((_, index) => {
                const day = index + 1;
                const isSelected =
                  selectedDate &&
                  selectedDate.getFullYear() === visibleMonth.getFullYear() &&
                  selectedDate.getMonth() === visibleMonth.getMonth() &&
                  selectedDate.getDate() === day;

                return (
                  <button
                    key={day}
                    className={[
                      "flex h-10 items-center justify-center rounded-lg text-14-medium transition",
                      isSelected
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-200 bg-white text-gray-700 hover:border-blue-200",
                    ].join(" ")}
                    onClick={() => handleSelectDate(day)}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectDate;
