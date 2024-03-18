import { DayNameType } from '@/types';

import {
  StyledEachDayContainer,
  StyledTimeIndicator,
  StyledChips,
  StyledHourlyEventContainer,
} from './Styled/StyledEachDay';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setEventForm } from '@/features/appSlice';
import { addHoursToDate, initialEventFormObj } from '@/utils';

interface PropsInterface {
  dayName: DayNameType;
}

const twentyFourHours = Array.from(Array(24)).map((_, i) => i);

const EachDay = ({ dayName }: PropsInterface) => {
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
              {Math.random() > 0.7 && (
                <StyledChips
                  ownerState={{}}
                  onClick={e => {
                    e.stopPropagation();
                  }}
                >
                  Hell is empty and all the devils are here.
                  <div>{getMockHourRange(hour)}</div>
                </StyledChips>
              )}

              {Math.random() > 0.6 && (
                <StyledChips
                  ownerState={{}}
                  onClick={e => {
                    e.stopPropagation();
                  }}
                >
                  All theory is gray my friend, but the golden tree of life springs ever green.
                  <div>{getMockHourRange(hour)}</div>
                </StyledChips>
              )}
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
