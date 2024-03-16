import { styled } from '@mui/material';
interface TimeIndicatorOwerStateInterface {
  hour: number;
}

const StyledTimeIndicator = styled('div')<{ ownerState: TimeIndicatorOwerStateInterface }>(({ theme, ownerState }) => ({
  marginTop: '-5px',
  '&::before': {
    color: theme.app.color.paleSky,
    content: `'${ownerState.hour.toString().padStart(2, '0')} ${ownerState.hour < 12 ? 'AM' : 'PM'}'`,
    marginLeft: '-50px',
    fontSize: '12px',
    display: 'inline-block',
  },
}));

const StyledEachDayContainer = styled('div')(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.app.color.moonMist,
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 0,
  height: '100%',
  margin: '-1px 0 0 -1px', // BorderCollapse
}));

const StyledHourlyEventContainer = styled('div')(({ theme }) => ({
  borderTop: '1px solid',
  borderColor: theme.app.color.moonMist,
  height: '80px',
  overflowY: 'auto',
  width: '100%',
  wordBreak: 'break-all',
  padding: '5px',
  scrollbarWidth: 'thin',
}));

export { StyledTimeIndicator, StyledEachDayContainer, StyledHourlyEventContainer };
