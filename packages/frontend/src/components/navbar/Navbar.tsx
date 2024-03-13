import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import React from 'react';
import { styled } from '@mui/material';

const StyledAppBar = styled(AppBar)(() => ({
  '& .MuiToolbar-root': {
    minHeight: 'var(--navbar-height)',
  },
}));

interface PropsInterface {
  onClickMenu: (e: React.SyntheticEvent) => void;
}

const Navbar = ({ onClickMenu }: PropsInterface) => {
  return (
    <StyledAppBar position='static'>
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }} onClick={onClickMenu}>
          <MenuIcon />
        </IconButton>
        <Typography variant='body1' component='div' sx={{ flexGrow: 1 }}>
          Photos
        </Typography>

        <div>
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={() => {}}
            color='inherit'
          >
            <AccountCircle />
          </IconButton>
        </div>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
