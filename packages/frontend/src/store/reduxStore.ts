import { configureStore } from '@reduxjs/toolkit';

import { rootApi } from '@/services';
import appSlice from '@/features/appSlice';

const middlewares = [rootApi.middleware];
const reduxStore = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    [appSlice.reducerPath]: appSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(...middlewares),
});

export default reduxStore;
