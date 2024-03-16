import { styled } from '@mui/material';

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

export type { StyledFullDayEventsContainerOwnerStateInterface };
export { StyledDaysHeaderContainer, StyledDayLabelAndFullDayContainer, StyledDayLabel, StyledFullDayEventsContainer };
