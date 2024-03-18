import { styled } from '@mui/material';
interface TimeIndicatorOwerStateInterface {
  hour: number;
}

interface StyledChipsStateInterface {
  fullWidth?: boolean;

  color?: React.CSSProperties['color'];
  bgColor?: React.CSSProperties['color'];
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
  scrollbarWidth: 'none',
  '&:hover': {
    scrollbarWidth: 'thin',
  },
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
}));

const StyledChips = styled('div')<{ ownerState: StyledChipsStateInterface }>(({ theme, ownerState }) => ({
  borderRadius: '3px',
  color: ownerState.color ? ownerState.color : theme.app.color.blackEel,
  background: ownerState.bgColor ? ownerState.bgColor : theme.app.color.chipCyanBlue,
  padding: '2px 4px',
  fontSize: '13px',
  height: 'max-content',
  width: ownerState.fullWidth ? '100%' : 'calc(100% - 10px)',
  '& > div': {
    fontWeight: 'bold',
  },
}));

export { StyledTimeIndicator, StyledEachDayContainer, StyledChips, StyledHourlyEventContainer };
