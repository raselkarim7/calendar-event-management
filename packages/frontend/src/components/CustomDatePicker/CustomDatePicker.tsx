import { styled } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';

const StyledDatePickerWrapper = styled(DatePicker)(() => ({
  width: '160px',
  '.MuiInputBase-input': {
    height: '24px',
    padding: '8px',
    fontSize: '16px',
  },
}));
interface PropsInterface {
  disabled: boolean;
  date: string;
  onChange: (value: dayjs.Dayjs | null) => void;
  isDisableFuture?: boolean;
  maxDate?: string;
}
const CustomDatePicker = ({ date, onChange, disabled = false, isDisableFuture = false, maxDate }: PropsInterface) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledDatePickerWrapper
        disabled={disabled}
        maxDate={maxDate ? dayjs(maxDate) : null}
        disableFuture={isDisableFuture}
        value={date ? dayjs(date) : null}
        // eslint-disable-next-line
        onChange={val => onChange(val as any)}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
