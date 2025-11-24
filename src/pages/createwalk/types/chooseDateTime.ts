export type { Period, TimeSlot, SelectedTime } from "./dateTime";

export type ChooseDateTimeProps = {
  walkDateTime?: string;
  onChangeWalkDateTime?: (value?: string) => void;
};
