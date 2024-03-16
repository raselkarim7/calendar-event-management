import type { CalendarEventApiResponseInterface, CalendarEventInterface } from '@/types';

const transformCalenderAllEventsResponse = (res: CalendarEventApiResponseInterface[] = []): CalendarEventInterface[] =>
  res.map(item => {
    return {
      _id: item._id,
      title: item.title,
      startDate: item.startDate,
      isFullday: item.isFullday,
      isRepeat: item.isRepeat,
      repeatAfter: item?.repeatAfter ?? 0,
      startTime: item?.startTime ?? '',
      endTime: item?.endTime ?? '',
      description: item?.description ?? '',
      note: item?.note ?? '',
      endDate: item?.endDate,
    };
  });

export default transformCalenderAllEventsResponse;
