import { useEffect, useState } from "react";
import type { Period, SelectedTime, TimeSlot } from "../types/dateTime";
import { to12Hour } from "../utils/dateTime";

type SelectTimeProps = {
  selectedTime: SelectedTime | null;
  onChange: (time: SelectedTime) => void;
  selectedDate: Date | null;
  now: Date;
};

const generateTimeSlots = (
  startHour: number,
  startMinute: number,
  endHour: number,
  endMinute: number
) => {
  const slots: TimeSlot[] = [];
  let currentMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  while (currentMinutes <= endMinutes) {
    const hour = Math.floor(currentMinutes / 60);
    const minute = currentMinutes % 60;
    slots.push({ hour, minute });
    currentMinutes += 30;
  }

  return slots;
};

const TIME_SLOTS: Record<Period, TimeSlot[]> = {
  am: generateTimeSlots(9, 0, 12, 30),
  pm: generateTimeSlots(13, 0, 20, 0),
};

const formatButtonLabel = (slot: TimeSlot) => {
  const hourLabel = to12Hour(slot.hour);
  const minuteLabel = slot.minute.toString().padStart(2, "0");
  return `${hourLabel}:${minuteLabel}`;
};

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const SelectTime = ({ selectedTime, onChange, selectedDate, now }: SelectTimeProps) => {
  const [activePeriod, setActivePeriod] = useState<Period>(
    selectedTime?.period ?? "am"
  );

  useEffect(() => {
    if (selectedTime?.period) {
      setActivePeriod(selectedTime.period);
    }
  }, [selectedTime]);

  const handleSelectTime = (slot: TimeSlot) => {
    onChange({ ...slot, period: activePeriod });
  };

  const isPastSlot = (slot: TimeSlot) => {
    if (!selectedDate) return false;
    const slotDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      slot.hour,
      slot.minute,
      0,
      0
    );
    return isSameDay(selectedDate, now) && slotDate.getTime() < now.getTime();
  };

  const periodButtonClass = (isActive: boolean) =>
    [
      "flex items-center justify-center rounded-lg border px-4 py-2 text-16-semibold transition",
      isActive
        ? "border-blue-500 bg-blue-50 text-blue-600"
        : "border-gray-200 bg-white text-gray-700 hover:border-blue-200",
    ].join(" ");

  const timeButtonClass = (isActive: boolean) =>
    [
      "flex items-center justify-center rounded-lg border px-3 py-2 text-16-semibold transition",
      isActive
        ? "border-blue-500 bg-blue-50 text-blue-600"
        : "border-gray-200 bg-white text-gray-700 hover:border-blue-200",
    ].join(" ");

  return (
    <div className="flex flex-col gap-4">
      <span className="flex text-16-medium">시간을 골라주세요</span>
      <div className="flex gap-2">
        <button
          className={periodButtonClass(activePeriod === "am")}
          onClick={() => setActivePeriod("am")}
        >
          오전
        </button>
        <button
          className={periodButtonClass(activePeriod === "pm")}
          onClick={() => setActivePeriod("pm")}
        >
          오후
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {TIME_SLOTS[activePeriod].map((slot) => {
          const isActive =
            selectedTime?.period === activePeriod &&
            selectedTime.hour === slot.hour &&
            selectedTime.minute === slot.minute;
          const disabled = isPastSlot(slot);

          return (
            <button
              key={`${slot.hour}-${slot.minute}`}
              className={`${timeButtonClass(isActive)} ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => !disabled && handleSelectTime(slot)}
              disabled={disabled}
            >
              {formatButtonLabel(slot)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SelectTime;
