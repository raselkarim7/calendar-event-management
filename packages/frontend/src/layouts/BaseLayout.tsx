import { Navbar, Sidebar } from '@/components';
import { muiTheme } from '@/styles/themes';
import { LayoutInterface } from '@/types';
import { ThemeProvider } from '@emotion/react';
import { styled } from '@mui/material';
import { useState } from 'react';

const StyledMainDiv = styled('div')(() => ({
  display: 'flex',
  height: 'calc(100vh - var(--navbar-height))',
}));

const BaseLayout = ({ children }: LayoutInterface) => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <ThemeProvider theme={muiTheme}>
      <Navbar
        onClickMenu={() => {
          setShowSidebar(prev => !prev);
        }}
      />
      <StyledMainDiv>
        {showSidebar && <Sidebar />}
        <div>{children}</div>
      </StyledMainDiv>
    </ThemeProvider>
  );
};

export default BaseLayout;
