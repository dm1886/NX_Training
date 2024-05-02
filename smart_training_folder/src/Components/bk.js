import React , {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import {createTheme, ThemeProvider} from '@mui/material/styles';

import { Typography, AppBar, Toolbar, Drawer, List, ListItem, ListItemText, Box , CssBaseline, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';

import HomeView from './HomeView';
import AdminView from './AdminView';

const drawerWidth = 240;


const AdminDashboard = ({ userinfo }) => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);  // State to store user info

    const [currentView, setCurrentView] = useState('Home'); // Default view

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3001/logout', {}, { withCredentials: true });
            localStorage.removeItem('userInfo'); // Clear user info from local storage
            setUserInfo(null);  // Update local state
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Logout failed:', error);
            alert('Failed to log out, please try again.');
        }
    };
    const [open, setOpen] = useState(false);  // This manages the drawer state

    const handleDrawerToggle = () => {
        console.log('Toggling drawer from', open, 'to', !open);
        setOpen(!open);  // This should toggle the state thus showing/hiding the drawer
      };


    const renderView = () => {
        switch(currentView) {
          case 'Home':
            return <HomeView />;
          case 'Admin':
            return <AdminView />;
          default:
            return <HomeView />;
        }
      };
      
      return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Smart Training Folder
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
             variant="temporary"
             open={open}
             onClose={handleDrawerToggle}
             ModalProps={{ keepMounted: true }}
             sx={{
               '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' }
             }}
          >
            <Toolbar />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                {userinfo && userinfo.name ? userinfo.name.charAt(0) : '?'}
              </Avatar>
              <Typography variant="h6" sx={{ margin: '8px 0' }}>
                Welcome {userinfo && userinfo.name ? userinfo.name : 'User'}
              </Typography>
            </Box>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => { setCurrentView('Home'); setOpen(false); }}>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => { setCurrentView('Admin'); setOpen(false); }}>
                  <ListItemText primary="Admin" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%' }}>
            <Toolbar />
            {renderView()}
          </Box>
        </Box>
      );
    };

export default AdminDashboard;



// return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       {/* top AppBar */}
//       <AppBar position="fixed">
//           <Toolbar>
            
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               sx={{ mr: 20 }}
//               onClick={handleDrawerToggle}
//             >
//              <MenuIcon/>
//             </IconButton>
            
//           </Toolbar>
//       </AppBar>
//       {/* End top AppBar */}
//       {/* contenuto drawer */}
//       <Drawer
//          variant="temporary"
//          open={open}
//          onClose={handleDrawerToggle}
//          sx={{
//            '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' }
//          }}
//         >
//           {/* Drawer top item */}
//         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
//           <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
//             {userinfo && userinfo.name ? userinfo.name.charAt(0) : '?'}
//           </Avatar>
//           <Typography variant="h6" sx={{ margin: '8px 0' }}>
//             Welcome {userinfo && userinfo.name ? userinfo.name : 'User'}
//           </Typography>
//           <Typography variant="p" sx={{color: "gray"}} >
//             Admin Level
//           </Typography> 
//         </Box>
//         <Divider />

//         <Typography>
//           Drawer
//         </Typography> 

//       </Drawer>
//       {/* end Drawer */}
        
//       {/*Right Main view  */}
//       <Box component="main" sx={{ backgroundColor:"green", flexGrow: 1, p: 3, width: '100%' }}>
//         Hello right cazz
//       </Box>
//       {/*END Right Main view  */}
//       </Box>
// )};