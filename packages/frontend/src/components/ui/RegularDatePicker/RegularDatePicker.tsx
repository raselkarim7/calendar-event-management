import { TextField, styled } from '@mui/material';

import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { monthNames } from '@/utils';

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
  showMonthYearInsideDatePickerInput?: boolean;
}
const RegularDatePicker = ({
  date,
  onChange,
  disabled = false,
  isDisableFuture = false,
  maxDate,
  showMonthYearInsideDatePickerInput = false,
}: PropsInterface) => {
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
        textField: textFieldProps => {
          return (
            <TextField
              {...textFieldProps}
              value={
                textFieldProps.value && showMonthYearInsideDatePickerInput
                  ? `${monthNames[dayjs(textFieldProps.value as string).month()]} ${dayjs(textFieldProps.value as string).year()}`
                  : textFieldProps.value
              }
              variant='standard'
              onKeyDown={e => {
                e.preventDefault();
              }}
            />
          );
        },
      }}
    />
  );
};

export default RegularDatePicker;
