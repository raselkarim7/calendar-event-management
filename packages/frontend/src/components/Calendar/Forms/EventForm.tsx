import { TextField, styled } from '@mui/material';

const StyledFormContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
}));

const EventForm = () => {
  return (
    <StyledFormContainer>
      <TextField id='event-title' placeholder='Add Title' variant='standard' size='medium' sx={{}} />
      <TextField id='event-description' placeholder='Add Description' variant='standard' size='small' sx={{}} />
      <TextField id='event-note' placeholder='Add Note' variant='standard' multiline minRows={3} size='small' sx={{}} />
    </StyledFormContainer>
  );
};

export default EventForm;
