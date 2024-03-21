import { Typography, styled } from '@mui/material';

interface StyledTypographyDateOwnerStateInterface {
  isToday: boolean;
}

const StyledDaysHeaderContainer = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
}));

const StyledDayLabelAndFullDayContainer = styled('div')(() => ({
  display: 'grid',
  gridTemplateRows: '64px auto',
}));

const StyledDayLabel = styled('div')(() => ({
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
  },
}));

const StyledFullDayEventsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column-reverse',
  gap: '4px',
  maxHeight: '150px',
  overflowY: 'auto',
  scrollbarWidth: 'thin',
  borderLeft: `1px solid ${theme.app.color.moonMist}`,
  borderBottom: `1px solid ${theme.app.color.moonMist}`,
  padding: '5px',
  boxSizing: 'content-box',
  paddingTop: '15px', // Empty space for opening add event modal while too many notes
}));

const StyledTypographyDate = styled(Typography)<{ ownerState: StyledTypographyDateOwnerStateInterface }>(
  ({ ownerState, theme }) => ({
    background: ownerState.isToday ? theme.app.color.brightBlue : 'inherit',
    border: ownerState.isToday ? `1px solid ${theme.app.color.brightBlue}` : 'none',
    borderRadius: ownerState.isToday ? '100%' : '0%',
    color: ownerState.isToday ? theme.app.color.white : theme.app.color.paleSky,
    '&:hover': {
      background: ownerState.isToday ? theme.app.color.brightBlue : theme.app.color.alabaster,
      borderRadius: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  }),
);

export {
  StyledDaysHeaderContainer,
  StyledDayLabelAndFullDayContainer,
  StyledDayLabel,
  StyledFullDayEventsContainer,
  StyledTypographyDate,
};
