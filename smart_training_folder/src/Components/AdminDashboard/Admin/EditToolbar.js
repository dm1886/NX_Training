import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';



function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  const handleClick = () => {
    setRows((oldRows) => {
      console.log("oldRows:", oldRows);
      // Calculate the new ID by finding the maximum ID present and adding one
      const maxId = oldRows.reduce((max, row) => Math.max(max, row.id), 0);
      const newId = maxId + 1;

      const newRow = {
        id: newId, // New ID calculated from the maximum existing ID
        name: '',
        surname: '',
        email: '',
        password: '',
        access_level: '',
        staff_number: '',
        isNew: true // Flag to indicate this is a new row
      };
      console.log("newRow:", newRow);

      // Set the new row to be in edit mode, focusing on the 'staff_number' field
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'staff_number' }
      }));

      return [...oldRows, newRow]; // Append the new row to the existing rows
    });
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default EditToolbar;