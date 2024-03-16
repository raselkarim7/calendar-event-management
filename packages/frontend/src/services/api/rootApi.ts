import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_API_URL } from '@/configs';
import { REDUX_API_TAGS } from '@/types';

console.log('BASE_API_URL: ', BASE_API_URL);

export default createApi({
  reducerPath: 'rootApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: headers => {
      headers.set('Content-Type', 'application/json; charset=utf-8');

      return headers;
    },
  }),
  tagTypes: [REDUX_API_TAGS.ALL_EVENTS, REDUX_API_TAGS.SINGLE_EVENT],
  endpoints: () => ({}),
});
