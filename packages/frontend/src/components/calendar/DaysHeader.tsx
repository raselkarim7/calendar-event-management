import { Fragment } from 'react';
import { Typography } from '@mui/material';

import { customColors } from '@/configs';
import { SEVEN_DAYS, initialEventFormObj } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setEventForm, setEventPopOver } from '@/features/appSlice';
import { WeeklyEventsByDateInterface } from '@/types';

import {
  StyledDaysHeaderContainer,
  StyledDayLabelAndFullDayContainer,
  StyledDayLabel,
  StyledFullDayEventsContainer,
  StyledTypographyDate,
} from './Styled/StyledDaysHeader';
import { StyledChips } from './Styled/StyledEachDay';

const fullDayEventsDesign = { bgColor: customColors.chipTealishBlue, color: customColors.white, fullWidth: true };
const getColor = (isToday: boolean) => (isToday ? customColors.brightBlue : customColors.paleSky);

interface PropsInterface {
  weeklyEventsByDate: WeeklyEventsByDateInterface;
  handlePopOver: (event: React.MouseEvent<HTMLDivElement>) => void;
}
const DaysHeader = ({ weeklyEventsByDate, handlePopOver }: PropsInterface) => {
  const { fullWeekObj } = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();

  return (
    <StyledDaysHeaderContainer>
      {SEVEN_DAYS.map(dayName => (
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
            {weeklyEventsByDate[fullWeekObj[dayName].onlyDateStr].map(chipItem => {
              if (!chipItem.isFullday) {
                return <Fragment key={chipItem._id}></Fragment>;
              }
              return (
                <StyledChips
                  key={chipItem._id}
                  ownerState={fullDayEventsDesign}
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
                </StyledChips>
              );
            })}
          </StyledFullDayEventsContainer>
        </StyledDayLabelAndFullDayContainer>
      ))}
    </StyledDaysHeaderContainer>
  );
};

export default DaysHeader;
