import EachDay from './EachDay';
import { SEVEN_DAYS, getFullWeekDatesByCurrentDate } from '@/utils';
import DaysHeader from './DaysHeader';
import { useRef, useState } from 'react';
import CustomModal from '../ui/CustomModal/CustomModal';
import EventForm from './Forms/EventForm';
import { useFullDayEventsContainerHeight } from '@/hooks';

import { StyledDaysHeaderContainer, StyledDaysContainer, StyledDays } from './Styled/StyledCalendar';
import { useGetCalenderEventsQuery } from '@/services';

const Calendar = () => {
  const weekDaysObj = getFullWeekDatesByCurrentDate(new Date().toDateString());

  console.log('weekDaysObj  ---------> ', weekDaysObj);

  // const { data, error } = useGetCalenderEventsQuery({
  //   startDay: new Date('2024-04-10'),
  //   endDay: new Date('2024-05-24'),
  // });

  const { data, error } = useGetCalenderEventsQuery({});

  console.log('data ----------->>> ', data);
  console.log('error ::::::::::::: ', error);

  const headerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const fullDayEventsContainerHeight = useFullDayEventsContainerHeight(headerRef, calendarRef);
  const [eventModal, setEventModal] = useState(true);

  const handleCalendarEvent = () => {
    setEventModal(true);
  };

  return (
    <>
      <StyledDaysHeaderContainer ref={headerRef}>
        <DaysHeader
          handleCalendarEvent={handleCalendarEvent}
          fullDayEventsContainerHeight={fullDayEventsContainerHeight}
        />
      </StyledDaysHeaderContainer>

      <StyledDaysContainer ref={calendarRef}>
        <StyledDays>
          {SEVEN_DAYS.map((day, index) => (
            <EachDay key={day} columnIndex={index} dayName={day} />
          ))}
        </StyledDays>
      </StyledDaysContainer>

      <CustomModal
        open={eventModal}
        onClose={() => {
          console.log('onClose called.');
          setEventModal(false);
        }}
      >
        <>
          <EventForm
            onClose={() => {
              console.log('onClose called.');
              setEventModal(false);
            }}
          />
        </>
      </CustomModal>
    </>
  );
};

export default Calendar;
