import { customColors } from '@/configs';
import { SEVEN_DAYS, initialEventFormObj } from '@/utils';
import { Chip, Typography } from '@mui/material';

import {
  StyledDaysHeaderContainer,
  StyledDayLabelAndFullDayContainer,
  StyledDayLabel,
  StyledFullDayEventsContainer,
  StyledTypographyDate,
} from './Styled/StyledDaysHeader';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { StyledChips } from './Styled/StyledEachDay';
import { setEventForm } from '@/features/appSlice';

const getColor = (isToday: boolean) => (isToday ? customColors.brightBlue : customColors.paleSky);

const DaysHeader = () => {
  const { fullWeekObj } = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();

  return (
    <StyledDaysHeaderContainer>
      {SEVEN_DAYS.map((dayName, index) => (
        <StyledDayLabelAndFullDayContainer key={dayName}>
          <StyledDayLabel>
            <Typography variant='body1' color={getColor(fullWeekObj[dayName].isToday)}>
              {dayName}
            </Typography>
            <StyledTypographyDate ownerState={{ isToday: fullWeekObj[dayName].isToday }} variant='h4'>
              {fullWeekObj[dayName].date.getDate()}
            </StyledTypographyDate>
          </StyledDayLabel>
          <StyledFullDayEventsContainer
            onClick={() => {
              dispatch(
                setEventForm({
                  ...initialEventFormObj,
                  mode: 'CREATE',
                  data: {
                    ...initialEventFormObj.data,
                    isFullday: true,
                    startDate: fullWeekObj[dayName].date,
                  },
                }),
              );
            }}
          >
            {index % 3 === 0 && (
              <StyledChips
                ownerState={{ color: customColors.brightBlue }}
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                Full day Event Title
              </StyledChips>
            )}

            {index % 2 === 0 && (
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
          </StyledFullDayEventsContainer>
        </StyledDayLabelAndFullDayContainer>
      ))}
    </StyledDaysHeaderContainer>
  );
};

export default DaysHeader;
