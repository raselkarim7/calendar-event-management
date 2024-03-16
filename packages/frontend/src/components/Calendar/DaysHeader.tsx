import { customColors } from '@/configs';
import { SEVEN_DAYS } from '@/utils';
import { Typography } from '@mui/material';

import {
  StyledDaysHeaderContainer,
  StyledDayLabelAndFullDayContainer,
  StyledDayLabel,
  StyledFullDayEventsContainer,
} from './Styled/StyledDaysHeader';

interface PropsInterface {
  fullDayEventsContainerHeight: number;
  handleCalendarEvent: () => void;
}
const DaysHeader = ({ fullDayEventsContainerHeight, handleCalendarEvent }: PropsInterface) => {
  return (
    <StyledDaysHeaderContainer>
      {SEVEN_DAYS.map((dayName, index) => (
        <StyledDayLabelAndFullDayContainer key={dayName}>
          <StyledDayLabel>
            <Typography variant='body1' color={customColors.paleSky}>
              {' '}
              {dayName}{' '}
            </Typography>
            <Typography variant='h4' color={customColors.paleSky}>
              {' '}
              {index + 8}
            </Typography>
          </StyledDayLabel>
          <StyledFullDayEventsContainer
            ownerState={{ minHeight: fullDayEventsContainerHeight }}
            onClick={() => handleCalendarEvent()}
          >
            {dayName === 'TUE' && (
              <Typography style={{ wordBreak: 'break-all' }}>
                {index % 2 === 0
                  ? 'Lorem ipsum dolor sit met there is no such thing psum dolor sit met there is no such thing as pain itself'
                  : 'xyzxyzxyzxyzxyzxyzxyzxyzxyzxyzxyz'}
              </Typography>
            )}
          </StyledFullDayEventsContainer>
        </StyledDayLabelAndFullDayContainer>
      ))}
    </StyledDaysHeaderContainer>
  );
};

export default DaysHeader;
