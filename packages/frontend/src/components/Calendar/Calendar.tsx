import EachDay from './EachDay';
import { SEVEN_DAYS } from '@/utils';
import DaysHeader from './DaysHeader';
import { useRef } from 'react';
import CustomModal from '../ui/CustomModal/CustomModal';
import EventForm from './Forms/EventForm';
import { useAppDispatch, useAppSelector, useFullDayEventsContainerHeight } from '@/hooks';

import { StyledDaysHeaderContainer, StyledDaysContainer, StyledDays } from './Styled/StyledCalendar';
import { setEventFormsVisibility } from '@/features/appSlice';

const Calendar = () => {
  // const { data, error } = useGetCalenderEventsQuery({
  //   startDay: new Date('2024-04-10'),
  //   endDay: new Date('2024-05-24'),
  // });

  // const { data, error } = useGetCalenderEventsQuery({});

  // console.log('Calendar data ---->>> ', data);
  // console.log('Calendar error ::::>> ', error);

  const headerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const fullDayEventsContainerHeight = useFullDayEventsContainerHeight(headerRef, calendarRef);

  const eventForm = useAppSelector(state => state.app.eventForm);
  const dispatch = useAppDispatch();

  return (
    <>
      <StyledDaysHeaderContainer ref={headerRef}>
        <DaysHeader fullDayEventsContainerHeight={fullDayEventsContainerHeight} />
      </StyledDaysHeaderContainer>

      <StyledDaysContainer ref={calendarRef}>
        <StyledDays>
          {SEVEN_DAYS.map(day => (
            <EachDay key={day} dayName={day} />
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
              console.log('onClose called.');
              dispatch(setEventFormsVisibility('INVISIBLE'));
            }}
          />
        </>
      </CustomModal>
    </>
  );
};

export default Calendar;
