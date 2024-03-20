import { styled } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { setAppDate } from '@/features/appSlice';
import { getOnlyDateString } from '@/utils';
import { PlainDatePicker } from '@/components/ui';

interface StyledDivOwnerStateInterface {
  showSidebar: boolean;
}
const StyledDiv = styled('div')<{ ownerState: StyledDivOwnerStateInterface }>(({ theme, ownerState }) => ({
  display: ownerState.showSidebar ? 'block' : 'none',
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
    <StyledDiv ownerState={{ showSidebar }}>
      <PlainDatePicker
        value={getOnlyDateString(selectedAppDate)}
        onChange={val => {
          if (val) {
            dispatch(setAppDate(val.toDate()));
          }
        }}
      />
    </StyledDiv>
  );
};

export default Sidebar;
