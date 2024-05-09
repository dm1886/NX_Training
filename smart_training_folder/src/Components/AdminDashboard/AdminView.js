import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {  Box, Typography,} from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EditToolbar from './EditToolbar';

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';


const AdminView = ()=> {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  useEffect(() => {
    // Fetch user data from the database using Axios
    axios.get(`${apiUrl}/users`)
    
      .then(response => {
        setRows(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const columns = [
    { field: "id"},
    { field: "staff_number", editable: true },
    { field: "name", editable: true },
    { field: "surname", editable: true },
    { field: "email", editable: true  },
    { field: "password", editable: true },
    {
      field: "access_level",
      headerName: "Access Level",
      editable: true,
      width: 150,
      type: 'singleSelect',  // Specifies the type of the editor
      valueOptions: [
        { value: 1, label: 'Admin' },
        { value: 2, label: 'Instructor' },
        { value: 3, label: 'User' },
        { value: 4, label: 'Secretary' }
      ]
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    }
  ]; 

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  const handleSaveClick = (id) => () => {
    console.log('handleSaveClick:', id);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    
  };
  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

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



  const handleModeRowsChange = (newRowModesModel ) => {
    console.log('newRowModesModel change to:', newRowModesModel);
    setRowModesModel(newRowModesModel);
  }
  const handleRowEditStop = (params, event) => {
    console.log('handleRowEditStop params:', params);
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow) => {
    console.log('processRowUpdate newRow:', newRow);
    const updatedRow = { ...newRow, isNew: false }; // Assuming isNew flag helps to distinguish new entries

    axios.post(`${apiUrl}/users`, newRow)
    .then(response => {
        console.log('New user added:', response.data);
        setRows(rows.map((row) => row.id === newRow.id ? response.data : row)); // Update row data with returned data from server
    })
    .catch(error => {
        console.error('Failed to add new user:', error);
        // Optionally, revert the row in case of error or show an error message
    });

    return updatedRow;
};

  return (

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
        </div>

  );
};

export default AdminView;