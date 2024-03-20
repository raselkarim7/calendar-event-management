import { Fragment } from 'react';

import { DayNameType, WeeklyEventsByDateInterface } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setEventForm, setEventPopOver } from '@/features/appSlice';
import { addHoursToDate, initialEventFormObj } from '@/utils';

import {
  StyledEachDayContainer,
  StyledTimeIndicator,
  StyledChips,
  StyledHourlyEventContainer,
} from './Styled/StyledEachDay';

interface PropsInterface {
  dayName: DayNameType;
  weeklyEventsByDate: WeeklyEventsByDateInterface;
  handlePopOver: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const twentyFourHours = Array.from(Array(24)).map((_, i) => i);

const EachDay = ({ dayName, weeklyEventsByDate, handlePopOver }: PropsInterface) => {
  const dispatch = useAppDispatch();
  const { fullWeekObj } = useAppSelector(state => state.app);

  const getMockHourRange = (hour: number) => {
    const firstPart = `${hour.toString().padStart(2, '0')}:00`;
    const copyHour = hour + 1;
    const secondPart = `${copyHour.toString().padStart(2, '0')}:00`;
    return `${firstPart} - ${secondPart}`;
  };

  return (
    <>
      <StyledEachDayContainer>
        {twentyFourHours.map(hour => (
          <div style={{ display: 'flex', width: '100%' }} key={hour}>
            {dayName === 'SUN' && <StyledTimeIndicator ownerState={{ hour: hour }}></StyledTimeIndicator>}
            <StyledHourlyEventContainer
              id='hourly-event'
              onClick={() => {
                dispatch(
                  setEventForm({
                    ...initialEventFormObj,
                    mode: 'CREATE',
                    data: {
                      ...initialEventFormObj.data,
                      isFullday: false,
                      startDate: fullWeekObj[dayName].date,
                      startTime: addHoursToDate(fullWeekObj[dayName].date, hour),
                    },
                  }),
                );
              }}
            >
              {weeklyEventsByDate[fullWeekObj[dayName].onlyDateStr].map(chipItem => {
                if (chipItem.isFullday || (chipItem.startTime && new Date(chipItem.startTime).getHours() !== hour)) {
                  return <Fragment key={chipItem._id}></Fragment>;
                }

                return (
                  <StyledChips
                    key={chipItem._id}
                    ownerState={{}}
                    onClick={e => {
                      e.stopPropagation();
                      handlePopOver(e);
                      dispatch(
                        setEventPopOver({
                          mode: 'SHOW',
                          data: chipItem,
                        }),
                      );
                    }}
                  >
                    {chipItem.title}
                    <div>{getMockHourRange(hour)}</div>
                  </StyledChips>
                );
              })}
              <div style={{ width: '100%', height: '15px' }}>
                {/* Empty space for opening add event modal while too many notes  */}
              </div>
            </StyledHourlyEventContainer>
          </div>
        ))}
      </StyledEachDayContainer>
    </>
  );
};

export default EachDay;
