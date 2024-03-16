import { TextField, styled } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';

const StyledTimePicker = styled(TimePicker)(() => ({
  '& .MuiInputBase-root': {
    '& .MuiInputBase-input': {
      fontSize: '16px',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '20px',
    },
  },
}));
const CustomTimePicker = () => {
  return (
    <StyledTimePicker
      minutesStep={15}
      slots={{
        textField: textFieldProps => (
          <TextField
            {...textFieldProps}
            variant='standard'
            placeholder='Start Time'
            onKeyDown={e => {
              e.preventDefault();
            }}
          />
        ),
      }}
    />
  );
};

export default CustomTimePicker;
