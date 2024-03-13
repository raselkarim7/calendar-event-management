import { styled } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';

const StyledDiv = styled('div')(({ theme }) => ({
  width: 'var(--sidebar-width)',
  background: theme.app.color.titanWhite,
  height: '100%',
  position: 'fixed',
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

interface PropsInterface {
  showSidebar: boolean;
}
const Sidebar = ({ showSidebar }: PropsInterface) => {
  return (
    <StyledDiv id='calendar-sidebar' style={{ display: showSidebar ? 'block' : 'none' }}>
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
