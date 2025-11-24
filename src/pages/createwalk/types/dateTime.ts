export type Period = "am" | "pm";

export type TimeSlot = {
  hour: number;
  minute: number;
};

export type SelectedTime = TimeSlot & { period: Period };
