import { customColors } from '@/configs';
import { SEVEN_DAYS, initialEventFormObj } from '@/utils';
import { Typography } from '@mui/material';

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

const fullDayEventsDesign = { bgColor: customColors.chipTealishBlue, color: customColors.white, fullWidth: true };

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
                ownerState={fullDayEventsDesign}
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                Full day Event Title One
              </StyledChips>
            )}

            {index % 2 === 0 && (
              <>
                <StyledChips
                  ownerState={fullDayEventsDesign}
                  onClick={e => {
                    e.stopPropagation();
                  }}
                >
                  Full day Event Title Two
                </StyledChips>
                <StyledChips
                  ownerState={fullDayEventsDesign}
                  onClick={e => {
                    e.stopPropagation();
                  }}
                >
                  Full day Event Title Three
                </StyledChips>
              </>
            )}
          </StyledFullDayEventsContainer>
        </StyledDayLabelAndFullDayContainer>
      ))}
    </StyledDaysHeaderContainer>
  );
};

export default DaysHeader;
