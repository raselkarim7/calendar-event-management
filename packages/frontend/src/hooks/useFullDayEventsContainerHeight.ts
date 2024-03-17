import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

const useFullDayEventsContainerHeight = (
  headerRef: RefObject<HTMLDivElement>,
  calendarRef: RefObject<HTMLDivElement>,
) => {
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

  return fullDayEventsContainerHeight;
};

export default useFullDayEventsContainerHeight;
