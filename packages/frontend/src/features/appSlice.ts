import { calendarEventsApi } from '@/services';
import { WeeklyEventsByDateInterface } from '@/types';
import { AppInitialStateInterface, AppStateType } from '@/types/app';
import {
  getFullWeekObjByCurrentDate,
  getOnlyDateString,
  initialEventFormObj,
  initialEventPopOverObj,
  isInBetween,
} from '@/utils';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState: AppInitialStateInterface = {
  counter: 0,
  selectedAppDate: new Date(),
  fullWeekObj: getFullWeekObjByCurrentDate(new Date().toString()),
  eventForm: initialEventFormObj,
  eventPopOver: initialEventPopOverObj,
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    increment: state => {
      state.counter++;
    },
    decrement: state => {
      state.counter--;
    },
    setAppDate: (state, action: PayloadAction<Date>) => {
      state.selectedAppDate = action.payload;
      state.fullWeekObj = getFullWeekObjByCurrentDate(action.payload.toString());
    },
    setEventForm: (state, action: PayloadAction<AppInitialStateInterface['eventForm']>) => {
      state.eventForm = action.payload;
    },
    setEventFormsVisibility: (state, action: PayloadAction<AppInitialStateInterface['eventForm']['mode']>) => {
      state.eventForm.mode = action.payload;
    },
    setEventPopOver: (state, action: PayloadAction<AppInitialStateInterface['eventPopOver']>) => {
      state.eventPopOver = action.payload;
    },
  },
});

export const getWeeklyEventsByDate = createSelector(
  calendarEventsApi.endpoints.getCalenderEvents.select({}),
  (state: AppStateType) => state.app.fullWeekObj,
  ({ data = [] }, fullWeekObj) => {
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
      } else {
        // Calculating The Future repeating dates here.
        if (item.isRepeat) {
          let repeatStartDate = getOnlyDateString(item.startDate);
          while (
            repeatStartDate < fullWeekObj.SUN.onlyDateStr ||
            (repeatStartDate >= fullWeekObj.SUN.onlyDateStr && repeatStartDate <= fullWeekObj.SAT.onlyDateStr)
          ) {
            const dayStr = repeatStartDate; // dayStr
            if (repeatStartDate >= fullWeekObj.SUN.onlyDateStr && repeatStartDate <= fullWeekObj.SAT.onlyDateStr) {
              if (!weeklyEventsByDate[dayStr].map(i => i._id).includes(item._id)) {
                weeklyEventsByDate[dayStr] = [...weeklyEventsByDate[dayStr], item];
              }

              repeatStartDate = getOnlyDateString(
                dayjs(dayStr)
                  .add(item.repeatAfter ?? 0, 'day')
                  .toDate(),
              );
            } else {
              repeatStartDate = getOnlyDateString(
                dayjs(dayStr)
                  .add(item.repeatAfter ?? 0, 'day')
                  .toDate(),
              );
            }
          }
        }
      }
    }
    return weeklyEventsByDate;
  },
);

export const { increment, decrement, setAppDate, setEventForm, setEventFormsVisibility, setEventPopOver } =
  appSlice.actions;

export default appSlice;
