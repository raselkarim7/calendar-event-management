import { TextField, styled } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

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
interface PropsInterface {
  value: Dayjs | null;
  onChange: (newValue: Dayjs) => void;
  placeholder: string;
  minTime: Dayjs | null;
}

const CustomTimePicker = ({ value, onChange, placeholder, minTime }: PropsInterface) => {
  return (
    <StyledTimePicker
      minutesStep={15}
      value={value}
      onChange={newVal => onChange(newVal as Dayjs)}
      disableIgnoringDatePartForTimeValidation={true}
      minTime={minTime}
      slots={{
        textField: TextField,
        // Should not use like below. Instead should use slotProps, See details here. https://github.com/mui/mui-x/issues/9078
        // textField: textFieldProps => (
        //   <TextField
        //     {...textFieldProps}
        //     variant='standard'
        //     placeholder={placeholder}
        //     onKeyDown={e => {
        //       e.preventDefault();
        //     }}
        //   />
        // ),
      }}
      slotProps={{
        textField: {
          variant: 'standard',
          placeholder: placeholder,
          // error: true,
          // helperText: 'required',
          onKeyDown: e => {
            e.preventDefault();
          },
        },
      }}
    />
  );
};

export default CustomTimePicker;
