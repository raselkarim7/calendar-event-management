import type { DayNameType, FullWeekDaysObjInterface } from '@/types';

export const SEVEN_DAYS: DayNameType[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export function addDays(date: Date, days: number) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function subDays(date: Date, days: number) {
  var result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}

export const getFullWeekDatesByCurrentDate = (currentDateStr: string): FullWeekDaysObjInterface => {
  const currentDate = new Date(currentDateStr);
  const today = new Date();

  const weekDayIndex = currentDate.getDay();
  const weekDaysObj: FullWeekDaysObjInterface = {};
  for (let idx = 0; idx < 7; idx++) {
    const daysDifference = idx - weekDayIndex;
    let eachDate = null;
    if (daysDifference < 0) {
      eachDate = subDays(currentDate, Math.abs(daysDifference));
    } else {
      eachDate = addDays(currentDate, Math.abs(daysDifference));
    }

    weekDaysObj[SEVEN_DAYS[idx]] = {
      date: eachDate,
      isToday: eachDate.toLocaleDateString() === today.toLocaleDateString(),
    };
  }
  return weekDaysObj;
};

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
