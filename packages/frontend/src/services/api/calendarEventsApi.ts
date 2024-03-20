import api from './rootApi';

import { CalendarEventInterface, CalendarEventPayloadInterface, REDUX_API_TAGS } from '@/types';
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

    // POST a calender event
    postCalenderEvent: builder.mutation<CalendarEventInterface, CalendarEventPayloadInterface>({
      query: payload => {
        return {
          url: '/calendar-events',
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: [REDUX_API_TAGS.ALL_EVENTS],
    }),

    // POST a calender event
    updateCalenderEvent: builder.mutation<
      CalendarEventInterface,
      { id: string; payload: CalendarEventPayloadInterface }
    >({
      query: ({ id, payload }) => {
        return {
          url: `/calendar-events/${id}`,
          method: 'PATCH',
          body: payload,
        };
      },
      invalidatesTags: [REDUX_API_TAGS.ALL_EVENTS],
      // Wanted to set the optimistic update, but haveing some trouble. (Will work on later.)
      // async onQueryStarted({ id, payload }, { dispatch, queryFulfilled }) {
      //   const updateResult = dispatch(
      //     calendarEventsApi.util.updateQueryData('getCalenderEvents', {}, draftsEvents => {
      //       let found = draftsEvents.find(item => item._id !== id);
      //       if (found) {
      //         found.title = payload.title;
      //       }
      //     }),
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch (error) {
      //     updateResult.undo();
      //   }
      // },
    }),

    // DELETE a calender event
    removeCalenderEvent: builder.mutation<CalendarEventInterface, string>({
      query: id => ({
        url: '/calendar-events/' + id,
        method: 'DELETE',
      }),
      invalidatesTags: [REDUX_API_TAGS.ALL_EVENTS],
      //  Wanted to set the optimistic update, but haveing some trouble. (Will work on later.)
      // async onQueryStarted(id, { dispatch, queryFulfilled }) {
      //   const updateResult = dispatch(
      //     calendarEventsApi.util.updateQueryData('getCalenderEvents', {}, draftsEvents => {
      //       const filtered = draftsEvents.filter(item => item._id !== id)
      //       draftsEvents = filtered
      //     }),
      //   );
      //   try {
      //     await queryFulfilled
      //   } catch (error) {
      //     updateResult.undo()
      //   }
      // },
    }),
  }),
});

export const {
  useGetCalenderEventsQuery,
  usePostCalenderEventMutation,
  useUpdateCalenderEventMutation,
  useRemoveCalenderEventMutation,
} = calendarEventsApi;
