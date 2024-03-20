import type { CalendarEventInterface, DayNameType, FullWeekObjInterface, WeeklyEventsByDateInterface } from '@/types';
import { AppInitialStateInterface } from './types/app';
import dayjs from 'dayjs';

export const SEVEN_DAYS: DayNameType[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

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

export const initialEventFormObj: AppInitialStateInterface['eventForm'] = {
  mode: 'INVISIBLE',
  data: {
    _id: '',
    title: '',
    startDate: new Date(),
    isFullday: false,
    isRepeat: false,
    repeatAfter: 0,
    startTime: '',
    endTime: '',
    description: '',
    note: '',
    endDate: undefined,
  },
};

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

export const getFullWeekObjByCurrentDate = (currentDateStr: string): FullWeekObjInterface => {
  const currentDate = new Date(currentDateStr);
  const today = new Date();

  const weekDayIndex = currentDate.getDay();
  const fullWeekObj: FullWeekObjInterface = {};
  for (let idx = 0; idx < 7; idx++) {
    const daysDifference = idx - weekDayIndex;
    let eachDate = null;
    if (daysDifference < 0) {
      eachDate = subDays(currentDate, Math.abs(daysDifference));
    } else {
      eachDate = addDays(currentDate, Math.abs(daysDifference));
    }

    fullWeekObj[SEVEN_DAYS[idx]] = {
      date: eachDate,
      onlyDateStr: getOnlyDateString(eachDate),
      isToday: eachDate.toLocaleDateString() === today.toLocaleDateString(),
    };
  }
  return fullWeekObj;
};

// toDateString was throwing error while adding time to date string (converted by toDateString)
export const getOnlyDateString = (date: Date, defaultFormatter = 'YYYY-MM-DD') => {
  return dayjs(date).format(defaultFormatter);
};

export const addHoursToDate = (date: Date, hours: number, minutes = 0) => {
  const dateStr = getOnlyDateString(date);
  const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  return dayjs(`${dateStr}T${timeStr}`).toISOString();
};

const isInBetween = (firstDay: string, lastDay: string, givenDate: string) => {
  let yes = false;
  if (givenDate >= firstDay && givenDate <= lastDay) {
    yes = true;
  }
  return yes;
};

export const getWeeklyEventsByDate = (
  fullWeekObj: FullWeekObjInterface,
  data: CalendarEventInterface[],
): WeeklyEventsByDateInterface => {
  const weeklyEventsByDate: WeeklyEventsByDateInterface = {};
  for (const key in fullWeekObj) {
    weeklyEventsByDate[fullWeekObj[key].onlyDateStr] = [];
  }
  for (const item of data) {
    const dayStr = getOnlyDateString(item.startDate);
    if (isInBetween(fullWeekObj.SUN.onlyDateStr, fullWeekObj.SAT.onlyDateStr, dayStr)) {
      weeklyEventsByDate[dayStr] = [...weeklyEventsByDate[dayStr], item];
      if (item.isRepeat) {
        const repeatAfter = item.repeatAfter ?? 0;
        for (let i = repeatAfter; i < 7; i = i + repeatAfter) {
          const newDayStr = getOnlyDateString(dayjs(dayStr).add(i, 'day').toDate());
          if (isInBetween(fullWeekObj.SUN.onlyDateStr, fullWeekObj.SAT.onlyDateStr, newDayStr)) {
            weeklyEventsByDate[newDayStr] = [...weeklyEventsByDate[newDayStr], item];
          }
        }
      }
    }
  }
  return weeklyEventsByDate;
};
