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

import HomeView from './AdminDashboard/HomeView';
import AdminView from './AdminDashboard/AdminView';

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





{/* <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Acess Level</TableCell>
              <TableCell>Acess Rank</TableCell>
              {/* Add more table headers as needed */}
          //   </TableRow>
          // </TableHead>
          // <TableBody>
          //   {users.map(user => (
          //     <TableRow key={user.id}>
          //       <TableCell>{user.name}</TableCell>
          //       <TableCell>{user.email}</TableCell>
          //       <TableCell>{user.access_level}</TableCell>
          //       <TableCell>{user.rank}</TableCell>
          //     </TableRow>
          //   ))}
          // </TableBody>
        // </Table> */}
      // </TableContainer>







// const AdminView = () => {
//   const [users, setUsers] = useState([]);
//   const [rowId, setRowId] = useState(null);

//   useEffect(() => {
//     // Fetch user data from the database using Axios
//     axios.get('http://localhost:3001/users')
//       .then(response => {
//         setUsers(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching user data:', error);
//       });
//   }, []);

  
//   function handleRowUpdate(update) {
//     console.log('Row updated:', update);
//     setRowId(update.id);
//   }

//   function renderUserActionsCell(params, rowId, setRowId) {
//     return (
//       <TableUserAction 
//         params={params} 
//         rowId={rowId} 
//         setRowId={setRowId}
//       />
//     );
//   }

//   const columns = useMemo(
//     () => [
//       // {avatar: 'Avatar', field: 'avatar', headerName: 'Avatar', width: 150, renderCell: (params) => {}
//       { field: "id", headerName: "ID", width: 90 },
//       { field: "staff_number", headerName: "Staff Number", width: 150 },
//       { field: "name", headerName: "Name", width: 150 },
//       { field: "surname", headerName: "Surname", width: 150 },
//       { field: "email", headerName: "Email", width: 200 },
//       { field: "password", headerName: "Password", width: 150 },
//       { field: "rank", headerName: "Rank", width: 150 },
//       {
//         field: "access_level",
//         headerName: "Access Level",
//         width: 150,
//         type: "singleSelect",
//         valueOptions: [
//           { value: 1, label: "Admin" },
//           { value: 2, label: "User" },
//           { value: 3, label: "Instructor" },
//         ],
//         editable: true,
//       },

//       {
//         field: "actions",
//         headerName: "Actions",
//         type: "actions",
//         width: 150,
//         renderCell: (params) => renderUserActionsCell(params, rowId, setRowId)
//       },
//     ],
//     [rowId]
//   );

//   return (
//     <div>

//       <Box
//         sx={{
//           height:'auto',
//           width:'auto'
//         }}
//       >
//         <Typography 
//           variant='h3'
//           component='h3'
//           sx={{
//             textAlign:'center',
//             mt:3,
//             mb:3
//           }}
//         >
//           Manage Users
//         </Typography>

//         <DataGrid 
//           columns={columns}
//           rows={users}
//           getRowId={row=>row.id}
//           processRowUpdate={(updatedRow, originalRow) =>
//             {handleRowUpdate(updatedRow);}
//           }
//         >
          
//         </DataGrid>

//       </Box>
      
//     </div>
//   );
// };

// export default AdminView;


//=------

// import React, { useEffect, useMemo, useState } from 'react';
// import axios from 'axios';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Toolbar, Grid } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import EditToolbar from './EditToolbar'
// import DeleteActionItem from './DeleteActionItem';
// import { GridRowModes } from '@mui/x-data-grid';
// import { v4 as uuid4 } from 'uuid';
// import {
//   GridToolbarContainer,
//   GridActionsCellItem,
//   GridRowEditStopReasons,
// } from '@mui/x-data-grid';
// import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
// import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
// import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

// const AdminView = () => {
//   const [users, setUsers] = useState([]);
//   const [rowModesModel, setRowModesModel] = useState({});

//   useEffect(() => {
//     // Fetch user data from the database using Axios
//     axios.get('http://localhost:3001/users')
//       .then(response => {
//         setUsers(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching user data:', error);
//       });
//   }, []);

// // handle the delate of the user and update the datagrid after user has been deleted  from the db
//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:3001/users/${id}`)
//       .then(response => {
//         console.log('User deleted:', response.data);
//         setUsers(users.filter(user => user.id !== id));
//       })
//       .catch(error => {
//         console.error('Error deleting user:', error);
//       });
//   }

//   // handle the OnAdd button click in the datagrid
//   const handleClick = () => {
//     console.log("Calling the handle Add");
//     var newID = uuid4();
//     const newUser = {
//       id: newID,  // temporary ID for the new row
//       staff_number: '',
//       name: '',
//       surname: '',
//       email: '',
//       password: '',
//       rank: '',
//       access_level: 1,
//       isNew : true
//     };
//     setUsers([...users, newUser]);
//     setRowModesModel((oldModel) => ({
//       ...oldModel,
//       [newID]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
//     }));
//     console.log("log of user:", users);
//     console.log("print of rowModesModel:", rowModesModel);
//   }

//   // handle the OnSave button click in the datagrid
//   const handleSave = () => {
//     // Only attempt to save new users
//     const newUsers = users.filter(user => user.isNew);
//     console.log(" Attempt to Saving new users:", newUsers); // Log or process new users
   
//   }

//   // handle the cell edit commit in the datagrid
//   const handleCellEditCommit = (params) => {
//     // Extract the necessary details from params
//     const id = params.id;       // The unique identifier of the row being edited
//     const field = params.field; // The name of the column (or field) being edited
//     const value = params.value; // The new value entered into the cell
  
//     // Update the users array with the new value for the specified field
//     setUsers((prevUsers) => {
//       // Map over the previous list of users
//       return prevUsers.map((user) => {
//         // Find the user that matches the id of the row being edited
//         if (user.id === id) {
//           // If this is the user, update the field with the new value
//           return {
//             ...user,      // Spread all existing user properties
//             [field]: value // Update the specific field with the new value
//           };
//         }
//         // For all other users, return them unchanged
//         return user;
//       });
//     });
//   };

//   const handleRowModesModelChange = (newRowModesModel) => {
//     setRowModesModel(newRowModesModel);
//   };
//   const handleRowEditStop = (params, event) => {
//     if (params.reason === GridRowEditStopReasons.rowFocusOut) {
//       event.defaultMuiPrevented = true;
//     }
//   };
 
  
//   const columns = useMemo(
//     () => [
//       // {avatar: 'Avatar', field: 'avatar', headerName: 'Avatar', width: 150, renderCell: (params) => {}
//       { field: "id", headerName: "ID", width: 90, editable: false },
//       { field: "staff_number", headerName: "Staff Number", width: 150, editable: true},
//       { field: "name", headerName: "Name", width: 150 , editable: true},
//       { field: "surname", headerName: "Surname", width: 150 , editable: true },
//       { field: "email", headerName: "Email", width: 200  , editable: true},
//       { field: "password", headerName: "Password", width: 150 , editable: true },
//       { field: "rank", headerName: "Rank", width: 150,
//         type: "singleSelect",
//         valueOptions: [
//           { value: 1, label: "CPT" },
//           { value: 2, label: "FO" },
//         ]  
//       , editable: true },
//       {
//         field: "access_level",
//         headerName: "Access Level",
//         width: 150,
//         type: "singleSelect",
//         valueOptions: [
//           { value: 1, label: "Admin" },
//           { value: 2, label: "User" },
//           { value: 3, label: "Instructor" },
//         ],
//         editable: true,
//       },

//       // add a delete button
//       // {
//       //   field: "delete",
//       //   headerName: "Delete",
//       //   width: 150,
//       //   renderCell : (params) => [
//       //     <DeleteActionItem onDelete={() => handleDelete(params.row.id)} />
//       //   ],
//       // },

//       // check using hook in render cell
      

      
//     ],
    
//   );

//   return (
//     <div>
//       <Box
//         sx={{
//           height: "auto",
//           width: "auto",
//         }}
//       >
//         <Typography
//           variant="h3"
//           component="h3"
//           sx={{
//             textAlign: "center",
//             mt: 3,
//             mb: 3,
//           }}
//         >
//           Manage Users
//         </Typography>

//         <DataGrid
//           title="Users"
//           columns={columns}
//           rows={users}
//           editMode='row'
//           rowModesModel={rowModesModel} //Controls the modes of the rows. 
//           onRowModesModelChange={handleRowModesModelChange} //Callback fired when the rowModesModel prop changes.
//           onRowEditStop={handleRowEditStop} //Callback fired when the row turns to view mode. 
//           processRowUpdate={handleCellEditCommit}
//           onProcessRowUpdateError={(params) => {console.log("Error updating row: ", params);}}
//           slots={{
//             toolbar: EditToolbar,
//           }}
//           slotProps={
//             {toolbar: {handleClick: handleClick , onSave: handleSave }}
//           }
         
//         />
//       </Box>
//     </div>
//   );
// };

// export default AdminView;



// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Toolbar, Grid } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import EditToolbar from './EditToolbar'
// import DeleteActionItem from './DeleteActionItem';
// import { GridRowModes } from '@mui/x-data-grid';
// import { v4 as uuid4 } from 'uuid';
// import {GridToolbarContainer,GridActionsCellItem,GridRowEditStopReasons,} from '@mui/x-data-grid';

// import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
// import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
// import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid



//----------

// useEffect(() => {
//   // Fetch user data from the database using Axios
//   axios.get('http://localhost:3001/users')
//     .then(response => {
//       setUsers(response.data);
//       console.log("setting users from db " + users.length);
//     })
//     .catch(error => {
//       console.error('Error fetching user data:', error);
//     });

//     console.log(users);
// }, []);


//-----
// import React, { useEffect, useMemo, useState } from 'react';
// import axios from 'axios';
// import {  Box, Typography,} from '@mui/material';

// import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
// import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
// import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

// const AdminView = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Fetch user data from the database using Axios
//     axios.get('http://localhost:3001/users')
//       .then(response => {
//         setUsers(response.data);
//         console.log("setting users from db " + users.length);
//       })
//       .catch(error => {
//         console.error('Error fetching user data:', error);
//       });

//       console.log(users);
//   }, []);


//   return (
//     <div>
//       <Box
//         sx={{
//           height: "auto",
//           width: "auto",
//         }}
//       >
//         <Typography
//           variant="h3"
//           component="h3"
//           sx={{
//             textAlign: "center",
//             mt: 3,
//             mb: 3,
//           }}
//         >
//           Manage Users
//         </Typography>

//       </Box>
//     </div>
//   );
// };

// export default AdminView;


//Using Data Grid to display the users

// import React, { useEffect, useMemo, useState } from 'react';
// import axios from 'axios';
// import {  Box, Typography,} from '@mui/material';

// import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
// import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
// import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

// const AdminView = ({ gridClassName })=> {
//   const [rowData, setRowData] = useState([
//     { id: 1, staff_number: 4033 , name: "DAMIANO", surname: "MIAZZI", email: "damianomiazzi@gmail.com", password: "qwerty", access_level: 1 },

//   ]);
//   const [colDefs, setColDefs] = useState([
//     { field: "id" , checkboxSelection: true},
//     { field: "staff_number" , headerName: "Staff Number"},
//     { field: "name", editable: true},
//     { field: "surname"},
//     { field: "email" , flex:3 },
//     { field: "password"},
//     { field: "access_level" , headerName: "Access Level",editable: true,

//         cellEditor: 'agSelectCellEditor',
//         cellEditorParams: {
//             values: [ 1,2],
//         }

//     }
//   ]);



//   useEffect(() => {
//     // Fetch user data from the database using Axios
//     axios.get('http://localhost:3001/users')
    
//       .then(response => {
//         setRowData(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching user data:', error);
//       });
//   }, []);


//   return (

//         <div
//           className={gridClassName} // applying the grid theme
//           style={{ height: 500 }} // the grid will fill the size of the parent container
//         >
//           <AgGridReact 
//           rowData={rowData}
//           columnDefs={colDefs}
//           rowSelection={'multiple'}
//           paginationPageSize={10}
//           paginationPageSizeSelector={[10,20]}
//           />
//         </div>

//   );
// };

// export default AdminView;