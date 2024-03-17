import { Button, styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import CalenderLogo from '@/assets/calendar-logo.png';
import { RegularDatePicker } from '@/components/ui/RegularDatePicker';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setAppDate } from '@/features/appSlice';
import { addDays, getOnlyDateString, subDays } from '@/utils';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  borderBottom: `1px solid  ${theme.app.color.lightGrey}`,
  '& .MuiToolbar-root': {
    minHeight: 'var(--navbar-height)',
    background: theme.app.color.white,
  },
}));

const StyledLogo = styled('img')(() => ({
  width: '48px',
  height: '48px',
}));

const StyledNavigationContianer = styled('div')(() => ({
  margin: '0px 8px',
  display: 'flex',
  gap: '4px',
  alignItems: 'center',
}));

interface PropsInterface {
  sidebarOpen: boolean;
  onClickMenu: (e: React.SyntheticEvent) => void;
}

const Navbar = ({ sidebarOpen, onClickMenu }: PropsInterface) => {
  const selectedAppDate = useAppSelector(state => state.app.selectedAppDate);
  const dispatch = useAppDispatch();

  return (
    <StyledAppBar position='fixed'>
      <Toolbar>
        <IconButton size='large' edge='start' aria-label='menu' sx={{ mr: 2 }} onClick={onClickMenu}>
          <MenuIcon />
        </IconButton>

        <StyledLogo src={CalenderLogo} alt='Calender logo' />
        <Typography variant='subtitle1'>Calendar</Typography>

        <StyledNavigationContianer>
          <IconButton
            size='medium'
            aria-label='left arrow'
            onClick={() => {
              const beforeSeverDayDate = subDays(selectedAppDate, 7);
              dispatch(setAppDate(beforeSeverDayDate));
            }}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          <Button
            size='large'
            variant='outlined'
            color='secondary'
            onClick={() => {
              dispatch(setAppDate(new Date()));
            }}
          >
            <Typography variant='caption' fontWeight={'bold'}>
              {' '}
              Today{' '}
            </Typography>
          </Button>
          <IconButton
            size='medium'
            aria-label='right arrow'
            onClick={() => {
              const afterSeverDayDate = addDays(selectedAppDate, 7);
              dispatch(setAppDate(afterSeverDayDate));
            }}
          >
            <KeyboardArrowRight />
          </IconButton>
        </StyledNavigationContianer>

        <RegularDatePicker
          date={getOnlyDateString(selectedAppDate)}
          onChange={val => {
            if (val) {
              dispatch(setAppDate(val.toDate()));
            }
          }}
          disabled={sidebarOpen}
          isDisableFuture={false}
        />
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
