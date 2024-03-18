import type { RefObject } from 'react';
import { useEffect } from 'react';

const useFullDayEventsContainerHeight = (
  headerRef: RefObject<HTMLDivElement>,
  calendarRef: RefObject<HTMLDivElement>,
): void => {
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
      }
    });
    resizeObserver.observe(headerRef.current);
    return () => resizeObserver.disconnect(); // clean up
  }, []);
};

export default useFullDayEventsContainerHeight;
