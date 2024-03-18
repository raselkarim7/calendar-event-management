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
              {Math.random() > 0.5 && (
                <StyledChips
                  ownerState={{}}
                  onClick={e => {
                    e.stopPropagation();
                  }}
                  // label='Saved Event Title Saved Event TitleSaved Event Title'
                  // size='small'
                >
                  Saved Event Title Saved Event TitleSaved Event Title
                </StyledChips>
              )}

              {Math.random() > 0.5 && (
                <>
                  <StyledChips
                    ownerState={{}}
                    onClick={e => {
                      e.stopPropagation();
                    }}
                    // label='Saved Event Title Saved Event TitleSaved Event Title'
                    // size='small'
                  >
                    Chip 1
                  </StyledChips>
                  <StyledChips
                    ownerState={{}}
                    onClick={e => {
                      e.stopPropagation();
                    }}
                    // label='Saved Event Title Saved Event TitleSaved Event Title'
                    // size='small'
                  >
                    Chip 2
                  </StyledChips>
                </>
              )}
            </StyledHourlyEventContainer>
          </div>
        ))}
      </StyledEachDayContainer>
    </>
  );
};

export default EachDay;
