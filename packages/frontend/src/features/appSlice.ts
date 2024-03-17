import { AppInitialStateInterface } from '@/types/app';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: AppInitialStateInterface = {
  counter: 0,
  selectedAppDate: new Date(),
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
    },
  },
});

export const { increment, decrement, setAppDate } = appSlice.actions;

export default appSlice;
