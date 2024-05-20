import React , {useState, useMemo} from "react";
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Typography, AppBar, Toolbar, Drawer, List, ListItem, ListItemText, Box , CssBaseline, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import HomeView from './Home/HomeView';
import AdminView from './Admin/AdminView';
import Brightness4Icon from '@mui/icons-material/Brightness4';  // Icon for dark mode toggle
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import GradingIcon from '@mui/icons-material/Grading';
import HandleChecksView from './Flight Check/HandleChecksView';
// import GenerateCKPdf from './Flight Check/GenerateCKPdf'

const drawerWidth = 240;







const AdminDashboard = ({ userinfo }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // This manages the drawer state
  const [currentView, setCurrentView] = useState('Home'); // Default view
  const [mode, setMode] = useState('light'); // Manage theme mode
  const gridClassName = mode === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz';

  const theme = useMemo(() => createTheme({
    palette: {
      mode: mode,
    },
  }), [mode]);

  // This function handle when user toggle outside the drawer
  const handleDrawerToggle = () => {
    console.log("Toggling drawer from", open, "to", !open);
    setOpen(!open); // This should toggle the state thus showing/hiding the drawer
  };

  // This function handles the logout process
  const handleLogout = async () => {
    try {
        await axios.post(`${apiUrl}/logout`, {}, { withCredentials: true });
        localStorage.removeItem('userInfo'); // Clear user info from local storage
       
        navigate('/login'); // Redirect to login page
    } catch (error) {
        console.error('Logout failed:', error);
        alert('Failed to log out, please try again.');
    }
};
  // Inside the drawer, this function renders the view based on the current view state
  const renderView = () => {
    switch(currentView) {
      case 'Home':
        return <HomeView />;
      case 'Admin':
        return <AdminView  />;
      case 'Checks':
        return <HandleChecksView  userInfo={userinfo} />;
      default:
        return <HomeView />;
    }
  };


  // This function renders the user's access level on the navigation drawer
  const renderAdminLevel = () => {
    if (userinfo && userinfo.access_level === 1) {
      return <Typography variant="p" sx={{color: "gray"}}>Admin</Typography>;
    } else if (userinfo && userinfo.access_level === 2) {
      return <Typography variant="p" sx={{color: "gray"}}>Secretary</Typography>;
    } else {
      return <Typography variant="p" sx={{color: "gray"}}>User</Typography>;
    }
  };

  // This function toggles the theme mode
  const toggleDarkMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", width: "100vw", overflowX: "hidden" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            width: open ? `calc(100vw - ${drawerWidth}px)` : "100vw",
          }}
        >
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
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>

            <Button color="inherit" onClick={toggleDarkMode}>
              <Brightness4Icon />
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
            display: open ? "block" : "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 56,
                height: 56,
                mt: "16px",
              }}
            >
              {userinfo && userinfo.name ? userinfo.name.charAt(0) : "?"}
            </Avatar>
            <Typography variant="h6" sx={{ margin: "8px 0" }}>
              Welcome {userinfo && userinfo.name ? userinfo.name : "User"}
            </Typography>
            {renderAdminLevel()}

            <Divider />

            {/* Button list navigation */}
            <Box sx={{ width: "100%", textAlign: "left", paddingLeft: "0" }}>
              <List sx={{ width: "100%", margin: "0" }}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setCurrentView("Home");
                    }}
                  >
                    <HomeIcon sx={{ marginRight: 2 }} />
                    <ListItemText primary="Home" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setCurrentView("Checks");
                    }}
                  >
                    <GradingIcon sx={{ marginRight: 2 }} />
                    <ListItemText primary="Flight Checks" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setCurrentView("PdfTest");
                    }}
                  >
                    <GradingIcon sx={{ marginRight: 2 }} />
                    <ListItemText primary="PdfTest" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setCurrentView("Admin");
                    }}
                  >
                    <AdminPanelSettingsIcon sx={{ marginRight: 2 }} />
                    <ListItemText primary="Admin" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout}>
                    <LogoutIcon sx={{ marginRight: 2 }} />
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1, 
            pl:2,
            pr:2,
            width: `calc(100vw - ${open ? drawerWidth : 0}px)`, 
            transition: 'margin 0.3s, width 0.3s',
            marginTop: '10px',  // Ensure top margin equals AppBar height
            height: 'calc(100vh - 64px)'  // Adjust height to be viewport height minus AppBar height
          }}
        >
          <Toolbar />{" "}
          {/* This is necessary to offset the content below the AppBar */}
          {renderView()}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default AdminDashboard;