import { customColors } from '@/configs';
import { SEVEN_DAYS } from '@/utils';
import { Typography, styled } from '@mui/material';

interface StyledFullDayEventsContainerOwnerStateInterface {
  minHeight: number;
}

const StyledDaysHeaderContainer = styled('div')(() => ({
  display: 'flex',
}));

const StyledDayLabelAndFullDayContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 0,
}));

const StyledDayLabel = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledFullDayEventsContainer = styled('div')<{ ownerState: StyledFullDayEventsContainerOwnerStateInterface }>(
  ({ ownerState, theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: ownerState.minHeight ? `${ownerState.minHeight}px` : '20px',
    borderLeft: `1px solid ${theme.app.color.moonMist}`,
    borderBottom: `1px solid ${theme.app.color.moonMist}`,
    marginLeft: '-1px',
  }),
);
interface PropsInterface {
  fullDayEventsContainerHeight: number;
}
const DaysHeader = ({ fullDayEventsContainerHeight }: PropsInterface) => {
  return (
    <StyledDaysHeaderContainer>
      {SEVEN_DAYS.map((dayName, index) => (
        <StyledDayLabelAndFullDayContainer key={dayName}>
          <StyledDayLabel>
            <Typography variant='body1' color={customColors.paleSky}>
              {' '}
              {dayName}{' '}
            </Typography>
            <Typography variant='h3'> 12 </Typography>
          </StyledDayLabel>
          <StyledFullDayEventsContainer ownerState={{ minHeight: fullDayEventsContainerHeight }}>
            {dayName === 'TUE' && (
              <Typography variant='body1' padding={'5px'} style={{ wordBreak: 'break-all' }}>
                {index % 2 === 0
                  ? 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
                  : 'eeeeeeeeeeeeeeeeeeeaaaaaaaaaaaaaaaaaaaaaaaaeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'}
              </Typography>
            )}
          </StyledFullDayEventsContainer>
        </StyledDayLabelAndFullDayContainer>
      ))}
    </StyledDaysHeaderContainer>
  );
};

export default DaysHeader;
