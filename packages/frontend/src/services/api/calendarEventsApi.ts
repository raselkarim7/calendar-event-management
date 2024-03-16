import api from './rootApi';

import { CalendarEventInterface, REDUX_API_TAGS } from '@/types';
import { FetchArgs } from '@reduxjs/toolkit/query';
import { transformCalenderAllEventsResponse, transformErrorResponse } from '../apiTransform';

export const calendarEventsApi = api.injectEndpoints({
  endpoints: builder => ({
    // GET all calender events
    getCalenderEvents: builder.query<CalendarEventInterface[], { startDay?: Date; endDay?: Date }>({
      query: ({ startDay, endDay }): FetchArgs => ({
        url: startDay && endDay ? `/calendar-events?startDay=${startDay}&endDay=${endDay}` : '/calendar-events',
      }),
      transformResponse: transformCalenderAllEventsResponse,
      transformErrorResponse,
      providesTags: [REDUX_API_TAGS.ALL_EVENTS],
    }),
  }),
});

export const { useGetCalenderEventsQuery } = calendarEventsApi;
