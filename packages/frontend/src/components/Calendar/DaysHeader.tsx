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

const StyledDayLabel = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '& h4': {
    cursor: 'pointer',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      background: theme.app.color.alabaster,
      borderRadius: '100%',
    },
  },
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
    padding: '5px',
    boxSizing: 'content-box',
    cursor: 'pointer',
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
            <Typography variant='h4' color={customColors.paleSky}>
              {' '}
              {index + 8}
            </Typography>
          </StyledDayLabel>
          <StyledFullDayEventsContainer ownerState={{ minHeight: fullDayEventsContainerHeight }}>
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
