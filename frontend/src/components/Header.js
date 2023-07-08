import React, { useState } from 'react';
import { AppBar, Toolbar, Tabs, Tab, IconButton, Menu, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userName = localStorage.getItem('name');
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(userActions.logout());
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'black', height: '100px', justifyContent: 'center' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h3" noWrap component="div">
          MovieTime
        </Typography>

        <Box display={{ xs: 'none', lg: 'block' }}>
          <Tabs
            textColor="white"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            value={value}
            onChange={(e, val) => setValue(val)}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Tab
              component={Link}
              to="/"
              label="Home"
              sx={{ fontSize: '20px', '&:hover': { color: 'yellow' }, margin: '10px' }}
            />
            <Tab
              component={Link}
              to="/movies"
              label="Movies"
              sx={{ fontSize: '20px', '&:hover': { color: 'yellow' }, margin: '10px' }}
            />
             <Tab
              component={Link}
              to="/theaters"
              label="Theaters"
              sx={{ fontSize: '20px', '&:hover': { color: 'yellow' }, margin: '10px' }}
            />
            <Tab
              component={Link}
              to="/bookings"
              label="Bookings"
              sx={{ fontSize: '20px', '&:hover': { color: 'yellow' }, margin: '10px' }}
            />
            {isUserLoggedIn && (
              <Tab
                component={Link}
                to="/profile"
                label="Profile"
                sx={{ fontSize: '20px', '&:hover': { color: 'yellow' }, margin: '10px' }}
              />
            )}
            {isUserLoggedIn && (
          
             
              <Tab
              component={Link}
         
              label={userName}
              sx={{ fontSize: '20px',  margin: '10px' ,border:"2px solid blue" }}
            />
              
            
          )}
             {isUserLoggedIn && (
              <Tab onClick={() => logOut()} component={Link} to="/" label="Logout" sx={{ fontSize: '20px', '&:hover': { color: 'yellow' }, margin: '10px' }} />
            )}
            {!isUserLoggedIn && (
           
           <Tab component={Link} to="/login" label="Login" sx={{ fontSize: '20px', '&:hover': { color: 'yellow' }, margin: '10px' }} />
        
       )}
          </Tabs>
          
        </Box>

        <Box display={{ xs: 'block', lg: 'none' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                bgcolor: 'black',
                color: 'white',
                animation: 'fade-in 0.3s ease-in',
                '@keyframes fade-in': {
                  from: { opacity: 0 },
                  to: { opacity: 1 },
                },
              },
            }}
          >
            <Typography variant="h3" noWrap component="div" sx={{ color: 'white', padding: '10px', border: '2px solid white' }}>
              {userName}
            </Typography>
            <Box
              sx={{
                '& .menu-item': {
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  },
                },
              }}
            >
              <MenuItem component={Link} to="/" onClick={handleMenuClose} className="menu-item" sx={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                Home
              </MenuItem>
              <MenuItem component={Link} to="/movies" onClick={handleMenuClose} className="menu-item" sx={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                Movies
              </MenuItem>
              <MenuItem component={Link} to="/bookings" onClick={handleMenuClose} className="menu-item" sx={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                Bookings
              </MenuItem>
              {isUserLoggedIn && (
                <MenuItem
                  component={Link}
                  to="/profile"
                  onClick={handleMenuClose}
                  className="menu-item"
                  sx={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}
                >
                  Profile
                </MenuItem>
              )}
                {isUserLoggedIn && (
                <MenuItem
                  component={Link}
                  to="/"
                  label="Logout"
                  onClick={() => logOut()}
                  className="menu-item"
                  sx={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}
                >
                  Logout
                </MenuItem>
              )}
               {!isUserLoggedIn && (
                <MenuItem
                  component={Link}
                  to="/login"
                  label="Login"
                  onClick={() => logOut()}
                  className="menu-item"
                  sx={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}
                >
                  Login
                </MenuItem>
              )}
            

            </Box>
          </Menu>
        </Box>

        <Box display={{ xs: 'none', lg: 'block' }} alignItems="center" marginRight={"200px"}>
        
          
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
