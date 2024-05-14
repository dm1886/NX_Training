import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {  Box, TableRow, Typography,} from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EditToolbar from './EditToolbar';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import UserDetails from './UserDetails';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';


const AdminView = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [dialogContent, setDialogContent] = useState("");
  const [showDetails, setShowDetails] = useState(false); // State to show user details
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users
  const fetchUsers = () => {
    axios
      .get(`${apiUrl}/users`)
      .then((response) => {
        setRows(response.data); // Update state with fresh data from server
        console.log("Updated user data fetched successfully.");
      })
      .catch((error) => {
        console.error("Error fetching updated user data:", error);
      });
  };
  // Define columns for the DataGrid
  const columns = [
    { field: "id", width: 50, headerName: "ID"},
    { field: "staff_number", editable: true, headerName: "Staff Number"},
    { field: "name", editable: true, headerName: "First Name"},
    { field: "surname", editable: true, headerName: "Last Name"},
    { field: "email", editable: true,width: 200, headerName: "Email"},
    { field: "password", editable: true, headerName: "Password"},
    { field: "rank",width: 150, editable: true, headerName: "Rank", type: "singleSelect",valueOptions: [{ value: "cpt", label: "Captain" },{ value: "fo", label: "First Officer" },]},
    { field: "instructor_type",width: 200, editable: true, headerName: "Instructor", type: "singleSelect",valueOptions: [{ value: 0, label: "Null" },{ value: 1, label: "Ground Instructor" },{ value: 2, label: "LTC" },{ value: 3, label: "SIM Instructor" },{ value: 4, label: "Examiner" },]},
    {
      field: "access_level",
      headerName: "Access Level",
      editable: true,
      width: 150,
      type: "singleSelect", // Specifies the type of the editor
      valueOptions: [
        { value: 1, label: "Admin" },
        { value: 2, label: "Manager" },
        { value: 3, label: "Instructor" },
        { value: 4, label: "User" },
      ],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem icon={<SaveIcon />} label="Save" onClick={handleSaveClick(id)} />,
            <GridActionsCellItem icon={<CancelIcon />} label="Cancel" onClick={handleCancelClick(id)} />,
          ];
        }

        return [
          <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={() => handleEditClick(id)} />,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => handleOpenConfirmDialog(id)} />,
        ];
      },
    },
    {
      field: "details",
      type: "actions",
      headerName: "Details",
      width: 100,
      cellClassName: "details",
      getActions: ({ id }) => {
        return [
          <Button variant="contained" color="success" onClick={() => handleDetailsClick(id)}>Details</Button>
        ];
      },
    },
  ];

  // Function to handle the details click
  const handleDetailsClick = (id) => {
    const userDetails = rows.find(row => row.id === id);
    setCurrentUser(userDetails);
    setShowDetails(true);
  };
  const handleBackToList = () => {
    setShowDetails(false);
    setCurrentUser(null);
  };


  // Function to handle opening the confirmation dialog
  const handleOpenConfirmDialog = (id) => {
    setOpenDialog(true);
    setDeleteId(id);
  };
  // Function to handle closing the confirmation dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };

  // Function to handle confirming the deletion of a user if the user clicks on the confirm button in the dialog box 
  const handleConfirmDelete = () => {
    if (deleteId) {
      axios
        .delete(`${apiUrl}/users/${deleteId}`)
        .then((response) => {
          console.log("User deleted successfully:", response.data);
          fetchUsers();
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
    handleCloseDialog();
  };

//MARK: TODO
// Function to handle the edit click not working
 const handleEditClick = (id) => () => {
  setRowModesModel(prevModel => ({
    ...prevModel,
    [id]: {
      mode: GridRowModes.Edit,
      fieldToFocus: 'staff_number'  // Specify the field to focus
    }
  }));
  };

  // Function to handle the save click when in edit mode
  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };
 
  // Function to handle the cancel click when in edit mode
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  // DataGrid row mode change handler
  const handleModeRowsChange = (newRowModesModel) => {
    console.log("newRowModesModel change to:", newRowModesModel);
    setRowModesModel(newRowModesModel);
  };
  // DataGrid row edit stop handler
  const handleRowEditStop = (params, event) => {
    console.log("handleRowEditStop params:", params);
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  // DataGrid row update handler
  const processRowUpdate = (newRow) => {
    console.log("processRowUpdate newRow:", newRow);
    const updatedRow = { ...newRow, isNew: false }; // Assuming isNew flag helps to distinguish new entries

    if (newRow.staff_number === '' || newRow.name === '' || newRow.surname === '' || newRow.email === '' || newRow.password === '' || newRow.access_level === '' || newRow.rank === '' || newRow.instructor_type === '') {
      setDialogContent("Please fill all fields before saving."); // Modified: Set dialog content for empty fields
      setOpenDialog(true);
      return;
    } else {

    axios
      .post(`${apiUrl}/users`, newRow)
      .then((response) => {
        console.log("New user added:", response.data);
        setRows(
          rows.map((row) => (row.id === newRow.id ? response.data : row))
        ); // Update row data with returned data from server
      })
      .catch((error) => {
        console.error("Failed to add new user:", error);
        // Optionally, revert the row in case of error or show an error message
      });
    }
    return updatedRow;
  };



  return (
    <div>
      {showDetails && currentUser ? (
        <div>
          <UserDetails user={currentUser} />
          <Button onClick={handleBackToList}>Back to List</Button>
        </div>
      ) : (
        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            editMode="row" // allow all row edit
            checkboxSelection
            rowModesModel={rowModesModel} // control modes of rows
            onRowModesModelChange={handleModeRowsChange} // set the variable to control the row modes rowModesModel edit, view, add
            onRowEditStop={handleRowEditStop} // stop the edit mode
            processRowUpdate={processRowUpdate}
            slots={{
              toolbar: EditToolbar,
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
          />
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirm Deletion"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>{dialogContent}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}

     
       
     

    </div>

 
  );
};

export default AdminView;




