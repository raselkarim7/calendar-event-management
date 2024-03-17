import type { TypedUseSelectorHook } from 'react-redux';
import { reduxStore } from '@/store';

export type AppStateType = ReturnType<typeof reduxStore.getState>;
export type AppDispatchType = typeof reduxStore.dispatch;

export type AppSelectorType = TypedUseSelectorHook<AppStateType>;

export interface AppInitialStateInterface {
  counter: number;
  selectedAppDate: Date;
}
