import { styled } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';

const StyledDiv = styled('div')(({ theme }) => ({
  width: '320px',
  background: theme.app.color.titanWhite,
  height: '100%',
}));

const StyledStaticDatePicker = styled(StaticDatePicker)(() => ({
  background: 'inherit',
  '& .MuiPickersToolbar-root': {
    display: 'none',
  },
  '& .MuiDialogActions-root': {
    display: 'none',
  },
}));

const Sidebar = () => {
  return (
    <StyledDiv>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StyledStaticDatePicker
          defaultValue={dayjs('2022-04-17')}
          onChange={val => {
            console.log('Sidebar datepicker: ', val);
          }}
        />
      </LocalizationProvider>
    </StyledDiv>
  );
};

export default Sidebar;
