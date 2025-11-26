import { useEffect, useRef, useState } from "react";
import SelectDate from "./SelectDate";
import SelectTime from "./SelectTime";
import type {
  ChooseDateTimeProps,
  SelectedTime,
} from "../types/chooseDateTime";
import {
  buildWalkDateTimeISO,
  formatKoreanDate,
  formatSelectedTime,
  parseWalkDateTimeISO,
} from "../utils/dateTime";

const ChooseDateTime = ({
  walkDateTime,
  onChangeWalkDateTime,
}: ChooseDateTimeProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<SelectedTime | null>(null);
  const lastSyncedWalkDateTime = useRef<string | null>(walkDateTime ?? null);
  const onChangeWalkDateTimeRef =
    useRef<ChooseDateTimeProps["onChangeWalkDateTime"]>(undefined);

  useEffect(() => {
    onChangeWalkDateTimeRef.current = onChangeWalkDateTime;
  }, [onChangeWalkDateTime]);

  useEffect(() => {
    if (!walkDateTime) {
      setSelectedDate(null);
      setSelectedTime(null);
      lastSyncedWalkDateTime.current = null;
      return;
    }
    const parsed = parseWalkDateTimeISO(walkDateTime);
    if (!parsed) return;

    setSelectedDate(parsed.date);
    setSelectedTime(parsed.time);
    lastSyncedWalkDateTime.current = walkDateTime;
  }, [walkDateTime]);

  useEffect(() => {
    if (selectedDate && selectedTime) {
      const iso = buildWalkDateTimeISO(selectedDate, selectedTime);
      if (lastSyncedWalkDateTime.current !== iso) {
        lastSyncedWalkDateTime.current = iso;
        onChangeWalkDateTimeRef.current?.(iso);
      }
    } else {
      if (lastSyncedWalkDateTime.current !== null) {
        lastSyncedWalkDateTime.current = null;
        onChangeWalkDateTimeRef.current?.(undefined);
      }
    }
  }, [selectedDate, selectedTime]);

  return (
    <div className="flex flex-col w-full h-full gap-6 overflow-y-auto">
      <div className="flex items-center justify-start">
        <span className="flex text-title-22-semibold text-start">
          3. 산책 날짜와 시간을 정해주세요
        </span>
      </div>

      <div className="flex flex-col gap-4 rounded-xl px-4 py-3 border border-gray-200 bg-white">
        <span className="text-title-20-bold text-black">선택한 일정</span>
        <div className="flex flex-col gap-2 text-title-18-semibold text-black">
          <span>
            산책 날짜 :{" "}
            <span className="text-blue-400 text-title-18-semibold">
              {selectedDate
                ? formatKoreanDate(selectedDate)
                : "날짜를 골라주세요"}
            </span>
          </span>
          <span>
            산책 시간 :{" "}
            <span className="text-blue-400 text-title-18-semibold">
              {selectedTime
                ? formatSelectedTime(selectedTime)
                : "시간을 골라주세요"}
            </span>
          </span>
        </div>
      </div>

      <div className="flex flex-col w-full h-full gap-6 rounded-xl border border-gray-200 p-4 bg-white">
        <div className="flex flex-col gap-6">
          <SelectDate selectedDate={selectedDate} onChange={setSelectedDate} />
          <SelectTime selectedTime={selectedTime} onChange={setSelectedTime} />
        </div>
      </div>
    </div>
  );
};

export default ChooseDateTime;
