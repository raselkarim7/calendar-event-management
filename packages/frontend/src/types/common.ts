export type DayNameType = 'SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT';

export interface CalendarEventInterface {
  _id: string;
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

export interface CalendarEventPayloadInterface {
  title: string;
  startDate: string;
  isFullday: boolean;
  isRepeat: boolean;
  repeatAfter: number;
  startTime: string;
  endTime: string;
  description: string;
  note: string;
  endDate: string;
}

interface EachDayInterface {
  date: Date;
  isToday: boolean;
}
export interface FullWeekObjInterface {
  [key: string]: EachDayInterface;
}
