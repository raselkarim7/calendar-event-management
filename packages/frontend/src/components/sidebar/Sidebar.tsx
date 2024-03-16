import { styled } from '@mui/material';
import { PlainDatePicker } from '@/components/ui/PlainDatePicker';

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
  return (
    <StyledDiv id='calendar-sidebar' style={{ display: showSidebar ? 'block' : 'none' }}>
      <PlainDatePicker
        value={new Date('02-02-2002')}
        onChange={() => {
          console.log('indie sidebar plain date picker');
        }}
      />
    </StyledDiv>
  );
};

export default Sidebar;
