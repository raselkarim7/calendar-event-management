import { styled } from '@mui/material';
import { PlainDatePicker } from '@/components/ui/PlainDatePicker';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setAppDate } from '@/features/appSlice';
import { getOnlyDateString } from '@/utils';

const StyledDiv = styled('div')(({ theme }) => ({
  width: 'var(--sidebar-width)',
  background: theme.app.color.titanWhite,
  height: '100%',
  position: 'fixed',
}));

interface PropsInterface {
  showSidebar: boolean;
}
const Sidebar = ({ showSidebar }: PropsInterface) => {
  const selectedAppDate = useAppSelector(state => state.app.selectedAppDate);
  const dispatch = useAppDispatch();
  return (
    <StyledDiv id='calendar-sidebar' style={{ display: showSidebar ? 'block' : 'none' }}>
      <PlainDatePicker
        value={getOnlyDateString(selectedAppDate)}
        onChange={val => {
          console.log('indie sidebar plain date picker', val);
          if (val) {
            dispatch(setAppDate(val.toDate()));
          }
        }}
      />
    </StyledDiv>
  );
};

export default Sidebar;
