export interface CalendarEventApiResponseInterface {
  _id: string;
  __v: number;
  title: string;
  startDate: Date;
  isFullday: boolean;
  isRepeat: boolean;
  repeatAfter?: number;
  startTime?: string;
  endTime?: string;
  description?: string;
  note?: string;
  endDate?: Date;
}
