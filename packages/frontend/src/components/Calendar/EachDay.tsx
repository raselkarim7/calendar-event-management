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
import { Chip } from '@mui/material';

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
              {hour % 3 === 0 && (
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

              {hour % 2 === 0 && (
                <>
                  <Chip
                    onClick={e => {
                      e.stopPropagation();
                    }}
                    label='Chip1'
                    size='small'
                    color='info'
                  />
                  <Chip
                    onClick={e => {
                      e.stopPropagation();
                    }}
                    label='Chip2'
                    size='small'
                    color='secondary'
                  />
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
