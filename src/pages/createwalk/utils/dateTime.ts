import type { Period, SelectedTime } from "../types/dateTime";

export const formatKoreanDate = (date: Date) =>
  `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

export const to12Hour = (hour: number) => {
  const normalized = hour % 12;
  return normalized === 0 ? 12 : normalized;
};

export const formatSelectedTime = (slot: SelectedTime) => {
  const periodLabel = slot.period === "am" ? "오전" : "오후";
  const hourLabel = to12Hour(slot.hour);
  const minuteLabel = slot.minute.toString().padStart(2, "0");

  return `${periodLabel} ${hourLabel}시 ${minuteLabel}분`;
};

export const buildWalkDateTimeISO = (date: Date, time: SelectedTime) =>
  new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.hour,
      time.minute,
      0,
      0
    )
  ).toISOString();

export const parseWalkDateTimeISO = (iso: string) => {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return null;

  const year = parsed.getUTCFullYear();
  const month = parsed.getUTCMonth();
  const day = parsed.getUTCDate();
  const hour = parsed.getUTCHours();
  const minute = parsed.getUTCMinutes();
  const period: Period = hour < 12 ? "am" : "pm";

  return {
    date: new Date(year, month, day),
    time: { hour, minute, period } as SelectedTime,
  };
};
