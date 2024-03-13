import { styled } from '@mui/material';

const StyledDiv = styled('div')(({ theme }) => ({
  width: '256px',
  background: theme.app.color.alabaster,
}));

const Sidebar = () => {
  return (
    <StyledDiv>
      <h2>Sidebar component</h2>
    </StyledDiv>
  );
};

export default Sidebar;
