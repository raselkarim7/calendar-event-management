import { configureStore } from '@reduxjs/toolkit';

import { rootApi } from '@/services';

const middlewares = [rootApi.middleware];

const reduxStore = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(...middlewares),
});

export default reduxStore;
