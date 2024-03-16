import { styled } from '@mui/material';
const StyledDaysHeaderContainer = styled('div')(() => ({
  width: 'calc(100% - 70px)',
  marginLeft: '69px',
  overflowY: 'scroll',
  scrollbarWidth: 'thin',
}));

const StyledDaysContainer = styled('div')(() => ({
  width: '100%',
  padding: '0px 0px 2px 0px',
  height: '200px',
  overflowY: 'scroll',
  scrollbarWidth: 'thin',
}));

const StyledDays = styled('div')(() => ({
  display: 'flex',
  width: 'calc(100% - 70px)',
  marginLeft: '70px',
}));

export { StyledDaysHeaderContainer, StyledDaysContainer, StyledDays };
