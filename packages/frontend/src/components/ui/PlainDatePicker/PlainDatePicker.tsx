import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { styled } from '@mui/material';
import dayjs from 'dayjs';

const StyledStaticDatePicker = styled(StaticDatePicker)(() => ({
  background: 'inherit',
  '& .MuiPickersToolbar-root': {
    display: 'none',
  },
  '& .MuiDialogActions-root': {
    display: 'none',
  },
}));

interface PlainDatePickerInterface {
  value: Date;
  onChange: (param: unknown) => void;
}

const PlainDatePicker = ({ value, onChange }: PlainDatePickerInterface) => {
  return (
    <div>
      <StyledStaticDatePicker
        defaultValue={dayjs(new Date())}
        value={dayjs(value)}
        onChange={val => {
          console.log('Plain datepicker: ', val);
          onChange(val);
        }}
      />
    </div>
  );
};

export default PlainDatePicker;
