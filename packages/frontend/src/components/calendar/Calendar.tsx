import EachDay from './EachDay';
import { SEVEN_DAYS, getWeeklyEventsByDate } from '@/utils';
import DaysHeader from './DaysHeader';
import { useMemo, useRef } from 'react';
import CustomModal from '../ui/CustomModal/CustomModal';
import EventForm from './Forms/EventForm';
import { useAppDispatch, useAppSelector, useFullDayEventsContainerHeight } from '@/hooks';

import { StyledDaysHeaderContainer, StyledDaysContainer, StyledDays } from './Styled/StyledCalendar';
import { setEventFormsVisibility } from '@/features/appSlice';
import { useGetCalenderEventsQuery } from '@/services';

const Calendar = () => {
  // const { data, error } = useGetCalenderEventsQuery({
  //   startDay: new Date('2024-04-10'),
  //   endDay: new Date('2024-05-24'),
  // });

  const { data } = useGetCalenderEventsQuery({});

  console.log('Calendar data ---->>> ', data);
  // console.log('Calendar error ::::>> ', error);

  const headerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  useFullDayEventsContainerHeight(headerRef, calendarRef);

  const eventForm = useAppSelector(state => state.app.eventForm);
  const fullWeekObj = useAppSelector(state => state.app.fullWeekObj);

  const dispatch = useAppDispatch();

  const weeklyEventsByDate = useMemo(() => getWeeklyEventsByDate(fullWeekObj, data ?? []), [fullWeekObj, data]);
  console.log('Calendar.tsx weeklyEventsByDate========: ', weeklyEventsByDate);

  return (
    <>
      <StyledDaysHeaderContainer ref={headerRef}>
        <DaysHeader weeklyEventsByDate={weeklyEventsByDate} />
      </StyledDaysHeaderContainer>

      <StyledDaysContainer ref={calendarRef}>
        <StyledDays>
          {SEVEN_DAYS.map(day => (
            <EachDay weeklyEventsByDate={weeklyEventsByDate} key={day} dayName={day} />
          ))}
        </StyledDays>
      </StyledDaysContainer>

      <CustomModal
        open={eventForm.mode === 'CREATE' || eventForm.mode === 'EDIT'}
        onClose={() => {
          dispatch(setEventFormsVisibility('INVISIBLE'));
        }}
      >
        <>
          <EventForm
            onClose={() => {
              dispatch(setEventFormsVisibility('INVISIBLE'));
            }}
          />
        </>
      </CustomModal>
    </>
  );
};

export default Calendar;
