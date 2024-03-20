import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector, useFullDayEventsContainerHeight } from '@/hooks';
// import { useGetCalenderEventsQuery } from '@/services';
import { getWeeklyEventsByDate, setEventFormsVisibility } from '@/features/appSlice';
import { EventPopover, CustomModal } from '@/components/ui';
import { SEVEN_DAYS } from '@/utils';

import { StyledDaysHeaderContainer, StyledDaysContainer, StyledDays } from './Styled/StyledCalendar';
import EachDay from './EachDay';
import DaysHeader from './DaysHeader';
import EventForm from './Forms/EventForm';

const Calendar = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  useFullDayEventsContainerHeight(headerRef, calendarRef);
  const [popOverAnchorEl, setPopOverAnchorEl] = useState<HTMLDivElement | null>(null);

  // const { data } = useGetCalenderEventsQuery({});
  // console.log('Calendar data ---->>> ', data);

  // const { fullWeekObj } = useAppSelector(state => state.app.fullWeekObj);
  // console.log('Full week obj: ', fullWeekObj);

  const weeklyEventsByDate = useAppSelector(state => getWeeklyEventsByDate(state));
  const eventForm = useAppSelector(state => state.app.eventForm);
  const dispatch = useAppDispatch();

  const handlePopOver = (event: React.MouseEvent<HTMLDivElement>) => {
    setPopOverAnchorEl(event.currentTarget);
  };

  const onClosePopOver = () => {
    setPopOverAnchorEl(null);
  };

  return (
    <>
      <StyledDaysHeaderContainer ref={headerRef}>
        <DaysHeader weeklyEventsByDate={weeklyEventsByDate} handlePopOver={handlePopOver} />
      </StyledDaysHeaderContainer>

      <StyledDaysContainer ref={calendarRef}>
        <StyledDays>
          {SEVEN_DAYS.map(day => (
            <EachDay weeklyEventsByDate={weeklyEventsByDate} key={day} dayName={day} handlePopOver={handlePopOver} />
          ))}
        </StyledDays>
      </StyledDaysContainer>

      <CustomModal
        open={eventForm.mode === 'CREATE' || eventForm.mode === 'EDIT'}
        onClose={() => {
          dispatch(setEventFormsVisibility('INVISIBLE'));
        }}
      >
        <EventForm
          onClose={() => {
            dispatch(setEventFormsVisibility('INVISIBLE'));
          }}
        />
      </CustomModal>
      <EventPopover anchorEl={popOverAnchorEl} onClosePopOver={onClosePopOver} />
    </>
  );
};

export default Calendar;
