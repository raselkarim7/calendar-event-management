import { styled } from '@mui/material';

const StyledFormContainer = styled('div')(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  justifyContent: 'space-between',
}));

const StyledFormFieldsContainer = styled('div')(() => ({
  width: '100%',

  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

const StyledDateAndCheckboxContainer = styled('div')(() => ({
  display: 'flex',
  gap: '36px',
  alignItems: 'center',
  '& > div:nth-of-type(1)': {
    minWidth: '150px',
  },
}));

const StyledTimePickersContainer = styled('div')(() => ({
  marginBottom: '-5px',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
}));

const StyledRepeatContainer = styled('div')(() => ({
  display: 'flex',
  gap: '10px',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& > div:nth-of-type(1)': {
    minWidth: '100px',
  },
}));

const StyledFlexContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

const StyledSumitButtonsContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'end',
}));

export {
  StyledFormContainer,
  StyledFormFieldsContainer,
  StyledDateAndCheckboxContainer,
  StyledTimePickersContainer,
  StyledRepeatContainer,
  StyledFlexContainer,
  StyledSumitButtonsContainer,
};
