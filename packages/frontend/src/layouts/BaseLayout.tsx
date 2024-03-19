import { ThemeProvider } from '@emotion/react';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { reduxStore } from '@/store';

import { styled } from '@mui/material';
import { useState } from 'react';

import { Navbar, Sidebar } from '@/components';
import { muiTheme } from '@/styles/themes';
import { LayoutInterface } from '@/types';

const StyledMainDiv = styled('div')(() => ({
  display: 'flex',
  height: 'calc(100vh - var(--navbar-height) - 1px)',
  marginTop: 'calc(var(--navbar-height) + 1px)',
}));
interface ChildrenContainerOwnerStateInterface {
  sidebarOpen: boolean;
}
const StyledChildrenContainer = styled('div')<{ ownerState: ChildrenContainerOwnerStateInterface }>(
  ({ ownerState }) => ({
    width: '100%',
    marginLeft: ownerState.sidebarOpen ? 'var(--sidebar-width)' : '0px',
  }),
);

const BaseLayout = ({ children }: LayoutInterface) => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <ThemeProvider theme={muiTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Provider store={reduxStore}>
          <Navbar
            sidebarOpen={showSidebar}
            onClickMenu={() => {
              setShowSidebar(prev => !prev);
            }}
          />
          <StyledMainDiv>
            {<Sidebar showSidebar={showSidebar} />}
            <StyledChildrenContainer ownerState={{ sidebarOpen: showSidebar }}>{children}</StyledChildrenContainer>
          </StyledMainDiv>
          <ToastContainer autoClose={2000} />
        </Provider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default BaseLayout;
