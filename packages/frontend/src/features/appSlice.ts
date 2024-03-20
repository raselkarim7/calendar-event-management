import { AppInitialStateInterface } from '@/types/app';
import { getFullWeekObjByCurrentDate, initialEventFormObj, initialEventPopOverObj } from '@/utils';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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

export const { increment, decrement, setAppDate, setEventForm, setEventFormsVisibility, setEventPopOver } =
  appSlice.actions;

export default appSlice;
