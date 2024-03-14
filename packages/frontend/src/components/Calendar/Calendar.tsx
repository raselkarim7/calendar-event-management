import { styled } from '@mui/material';
import EachDay from './EachDay';
import { SEVEN_DAYS } from '@/utils';
import DaysHeader from './DaysHeader';
import { useEffect, useRef, useState } from 'react';

const StyledDaysHeaderContainer = styled('div')(() => ({
  width: 'calc(100% - 70px)',
  marginLeft: '69px',
  overflowY: 'scroll',
  scrollbarWidth: 'thin',
}));

const StyledDaysContainer = styled('div')(() => ({
  width: '100%',
  padding: '0px 0px 2px 0px',
  height: '200px',
  overflowY: 'scroll',
  scrollbarWidth: 'thin',
}));

const StyledDays = styled('div')(() => ({
  display: 'flex',
  width: 'calc(100% - 70px)',
  marginLeft: '70px',
}));

const Calendar = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [previousSidebarWidth, setPreviousSidebarWidth] = useState(0);
  const [fullDayEventsContainerHeight, setFullDayEventsContainerHeight] = useState(0);

  // calculated the height of the DyasHeader container based on Calendear Date + full day events height after rending.
  // and that based on that height, we set the height of calenderRef
  useEffect(() => {
    if (!headerRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      // Do what you want to do when the size of the element changes
      if (headerRef.current && calendarRef.current) {
        const { offsetHeight, offsetTop } = headerRef.current;
        const calenderBottomPadding = 2;
        const upperPixel = offsetHeight + offsetTop + calenderBottomPadding;
        calendarRef.current.style.height = `calc(100vh - ${upperPixel}px)`;
        if (fullDayEventsContainerHeight === 0) {
          setFullDayEventsContainerHeight(Math.abs(offsetHeight - offsetTop + 16));
        }
      }
    });
    resizeObserver.observe(headerRef.current);
    return () => resizeObserver.disconnect(); // clean up
  }, [fullDayEventsContainerHeight]);

  // Detetc if the sidebar is visible or not. And based on that it resets the fullDayEventsContainerHeight
  useEffect(() => {
    const sidebar = document.getElementById('calendar-sidebar');
    if (!sidebar) return;
    const resizeObserver = new ResizeObserver(() => {
      if (previousSidebarWidth !== sidebar.clientWidth) {
        setPreviousSidebarWidth(sidebar.clientWidth);
        setFullDayEventsContainerHeight(0);
      }
    });
    resizeObserver.observe(sidebar);
    // eslint-disable-next-line
    return () => resizeObserver.disconnect(); // clean up
  }, [previousSidebarWidth]);

  return (
    <>
      <StyledDaysHeaderContainer ref={headerRef}>
        <DaysHeader fullDayEventsContainerHeight={fullDayEventsContainerHeight} />
      </StyledDaysHeaderContainer>

      <StyledDaysContainer ref={calendarRef}>
        <StyledDays>
          {SEVEN_DAYS.map((day, index) => (
            <EachDay key={day} columnIndex={index} dayName={day} />
          ))}
        </StyledDays>
      </StyledDaysContainer>
    </>
  );
};

export default Calendar;
