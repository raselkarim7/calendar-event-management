import { styled } from '@mui/material';

const StyledModalContainer = styled('div')(({ theme }) => ({
  background: theme.app.color.white,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'min(70vw, 450px)',
}));

const StyledDialogHeader = styled('div')(({ theme }) => ({
  width: 'inherit',
  height: '36px',
  background: theme.app.color.bluishCyan,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  '& svg': {
    width: '28px',
    height: '28px',
    paddingRight: '8px',
    cursor: 'pointer',
    color: theme.app.color.blackEel,
    padding: '2px',

    '&:hover': {
      background: theme.app.color.moonMist,
      borderRadius: '50%',
    },
  },
}));

const StyledChildrenContainer = styled('div')(() => ({
  width: '100%',
  padding: '16px',
  height: 'min( calc(100vh - 100px), 700px)',
  overflow: 'auto',
  scrollbarWidth: 'thin',
}));

export { StyledModalContainer, StyledDialogHeader, StyledChildrenContainer };
