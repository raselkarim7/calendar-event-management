import { Typography, styled } from '@mui/material';

interface StyledFullDayEventsContainerOwnerStateInterface {
  minHeight: number;
}

interface StyledTypographyDateOwnerStateInterface {
  isToday: boolean;
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
  '& h4': {
    cursor: 'pointer',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const StyledFullDayEventsContainer = styled('div')<{ ownerState: StyledFullDayEventsContainerOwnerStateInterface }>(
  ({ ownerState, theme }) => ({
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: ownerState.minHeight ? `${ownerState.minHeight}px` : '20px',
    borderLeft: `1px solid ${theme.app.color.moonMist}`,
    borderBottom: `1px solid ${theme.app.color.moonMist}`,
    padding: '5px',
    boxSizing: 'content-box',
  }),
);

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
  }),
);

export type { StyledFullDayEventsContainerOwnerStateInterface };
export {
  StyledDaysHeaderContainer,
  StyledDayLabelAndFullDayContainer,
  StyledDayLabel,
  StyledFullDayEventsContainer,
  StyledTypographyDate,
};
