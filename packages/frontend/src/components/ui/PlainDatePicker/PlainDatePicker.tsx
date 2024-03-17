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
  value: string;
  onChange: (param: dayjs.Dayjs | null) => void;
}

const PlainDatePicker = ({ value, onChange }: PlainDatePickerInterface) => {
  return (
    <div>
      <StyledStaticDatePicker
        defaultValue={dayjs(new Date())}
        value={dayjs(value)}
        // eslint-disable-nex
        onChange={val => onChange(val as dayjs.Dayjs | null)}
      />
    </div>
  );
};

export default PlainDatePicker;
