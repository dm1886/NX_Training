import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import {
  GridRowModes,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import EditLicenseToolBar from './EditLicenseToolBar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

function Licenses({ userId }) {

  const [rows, setRows] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [dialogContent, setDialogContent] = useState(""); 
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/licensesforid`, { params: { userId } });
        setRows(response.data);
      } catch (error) {
        console.error('Failed to fetch licenses:', error);
      }
    };

    fetchLicenses();
  }, [userId, apiUrl]);

  const columns = [
    { field: "id", width: 50, headerName: "ID"},
    { field: 'license_type', headerName: 'Type', width: 140, type: "singleSelect", 
    valueOptions: [
      { value: 1, label: 'CPL' },
      { value: 2, label: "ATPL" },
      { value: 3, label: "MEDICAL" },
      { value: 4, label: "ENGLISH" },
      { value: 5, label: "QUALIFICATION" },
    ], editable: true },
    
    { field: 'number', headerName: 'Number', width: 150,  editable: true },

    {
        field: 'issue_date',
        headerName: 'Issue Date',
        editable: true,
        width: 150,
        renderCell: (params) => formatDate(params.value),
      },
      {
        field: 'expire_date',
        headerName: 'Expire Date',
        width: 150,
        editable: true,
        renderCell: (params) => {
          const now = new Date();
          const expireDate = new Date(params.value);
          const isExpired = expireDate < now;
          return (
            <span style={{ color: isExpired ? 'red' : 'green' }}>
              {formatDate(params.value)}
            </span>
          );
        },
      },
      { field: 'type', headerName: 'Qual', width: 100, type: "singleSelect", valueOptions: [
        { value: 1, label: 'SIM-INS' },
        { value: 2, label: "EXAMINER" },
    ]},
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
  ];
const pad = (num) => num.toString().padStart(2, '0');

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
};
const handleSaveClick = (id) => () => {
  setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
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
const handleEditClick = (id) => () => {
  setRowModesModel(prevModel => ({
    ...prevModel,
    [id]: {
      mode: GridRowModes.Edit,
      fieldToFocus: 'license_type'  // Specify the field to focus
    }
  }));
  };
  const handleOpenConfirmDialog = (id) => {
    setOpenDialog(true);
    setDeleteId(id);
  };
const handleModeRowsChange = (newRowModesModel) => {
  console.log("newRowModesModel change to:", newRowModesModel);
  setRowModesModel(newRowModesModel);
};

const handleRowEditStop = (params, event) => {
  console.log("handleRowEditStop params:", params);
  if (params.reason === GridRowEditStopReasons.rowFocusOut) {
    event.defaultMuiPrevented = true;
    
  }
  
};

const processRowUpdate = (newRow) => {
  console.log("processRowUpdate newRow:", newRow);

  const updatedRow = { ...newRow, isNew: false }; 

  if (newRow.license_type === null || newRow.number === ''){
    setDialogContent("Please fill all fields before saving."); // Modified: Set dialog content for empty fields
    setOpenDialog(true);
    return;
  } else {
    axios
    .post(`${apiUrl}/license`, newRow)
    .then((response) => {
      console.log("New Licenses added:", response.data);
      setRows(
        rows.map((row) => (row.id === newRow.id ? response.data : row  ) )
      )
    })
    .catch((error) => {
      console.error("Failed to add new user:", error);
      // Optionally, revert the row in case of error or show an error message
    });
  }
  return updatedRow
}
  
  return (
    <div sx={{ with: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row" // allow all row edit
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleModeRowsChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditLicenseToolBar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}

export default Licenses;