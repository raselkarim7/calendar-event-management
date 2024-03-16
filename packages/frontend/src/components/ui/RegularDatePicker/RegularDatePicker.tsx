import { TextField, styled } from '@mui/material';

import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const StyledDatePickerWrapper = styled(DatePicker)(() => ({
  width: '170px',
  '& .MuiInputBase-input': {
    padding: '4px',
    fontSize: '16px',
    borderBottom: 'none',
  },
  '& .MuiInput-underline': {
    border: 'none',
  },
  '& .Mui-disabled': {
    border: 'none',
  },
}));
interface PropsInterface {
  date: string;
  onChange: (value: dayjs.Dayjs | null) => void;
  disabled?: boolean;
  isDisableFuture?: boolean;
  maxDate?: string;
}
const RegularDatePicker = ({ date, onChange, disabled = false, isDisableFuture = false, maxDate }: PropsInterface) => {
  return (
    <StyledDatePickerWrapper
      disabled={disabled}
      maxDate={maxDate ? dayjs(maxDate) : null}
      disableFuture={isDisableFuture}
      value={date ? dayjs(date) : null}
      // eslint-disable-next-line
      onChange={val => onChange(val as any)}
      slots={{
        openPickerIcon: ArrowDropDownIcon,
        textField: textFieldProps => (
          <TextField
            {...textFieldProps}
            variant='standard'
            onKeyDown={e => {
              e.preventDefault();
            }}
          />
        ),
      }}
    />
  );
};

export default RegularDatePicker;
