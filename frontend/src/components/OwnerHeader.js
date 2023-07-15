import * as React from 'react';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import { Link, useNavigate } from 'react-router-dom';
import { ownerActions } from '../store';
import { useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import {  Tab,Tabs } from '@mui/material';

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const OwnerHeader = () => {
  const navigate = useNavigate();
  const menuItems = [
    { text: 'Dashboard', route: '/owner/home' },
   
 
    { text: 'Theater', route: '/owner/owner_theater' },
    { text: 'Movie', route: '/owner/owner_movies' },
   
    { text: 'Bookings', route: '/owner/bookings' },
    { text: 'Revenue Report', route: '/owner/revenue_report' },
  ];
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  let ownername =localStorage.getItem("ownername");
  let ownerimage =localStorage.getItem("ownerimage");
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logOut = () => {
    dispatch(ownerActions.logout());
    navigate('/owner/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <MuiAppBar position="fixed" open={open} sx={{ backgroundColor: 'black', width: '100%', height: '100px', justifyContent: 'center' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h3" noWrap component="div">
            MovieTime
          </Typography>
          {
            ownername && <Button variant="outlined"sx={{marginLeft:"1100px" ,color:"white"}} >
            <Typography variant="h5" noWrap component="div">
              {ownername} 
            </Typography>
          </Button>
          }
          
          <Tabs
  textColor="white"
  indicatorColor="secondary"
  aria-label="secondary tabs example"
  sx={{
    marginLeft: 'auto', 
  }}
>
  <Tab
    LinkComponent={Link}
    to="/owner/ownerprofile"
    label="profile"
    sx={{
      fontSize: '20px',
      '&:hover': {},
    }}
  />
</Tabs>

        </Toolbar>
      </MuiAppBar>
      <Drawer
  sx={{
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      overflow: 'hidden', // Hide scrollbars
    },
  }}
  variant="persistent"
  anchor="left"
  open={open}
>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} >
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
         {/* Profile Picture */}
         <ListItem disablePadding sx={{ marginBottom: '50px', marginLeft: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
  <Avatar alt="Profile Picture" src={ownerimage} sx={{ width: '80px', height: '80px', marginBottom: '10px' }} />
  <ListItemText primary={ownername} primaryTypographyProps={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'black' }} />
</ListItem>

        <List
          sx={{
            width: '100%',
            marginTop: '20px',
            backgroundColor: 'black',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
         


          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ marginBottom: '30px', marginLeft: '60px' }}>
              <ListItemButton
                component={Link}
                to={item.route}
                sx={{
                  width: '100%',
                  height: 'auto',
                  backgroundColor: 'black',
                  borderRadius: '10px',
                  '&:hover': {
                    backgroundColor: '#b5860e',
                  },
                }}
              >
                <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }} />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem disablePadding>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                width: '100%',
                height: '3rem',
                borderRadius: '10px',
              }}
              onClick={logOut}
            >
              <b style={{ fontSize: '20px' }}>Logout</b>
            </Button>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
};

export default OwnerHeader;
