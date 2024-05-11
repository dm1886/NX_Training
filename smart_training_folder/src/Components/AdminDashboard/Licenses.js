import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

function Licenses({ userId }) {
  const [licenses, setLicenses] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/licensesforid`, { params: { userId } });
        setLicenses(response.data);
      } catch (error) {
        console.error('Failed to fetch licenses:', error);
      }
    };

    fetchLicenses();
  }, [userId, apiUrl]);

  const columns = [
    // { field: 'id', headerName: 'ID', width: 50 },
    { field: 'license_type', headerName: 'Type', width: 140, type: "singleSelect", 
    valueOptions: [
      { value: 1, label: 'CPL' },
      { value: 2, label: "ATPL" },
      { value: 3, label: "MEDICAL" },
      { value: 4, label: "ENGLISH" },
      { value: 5, label: "QUALIFICATION" },
    ] },
    
    { field: 'number', headerName: 'Number', width: 150 },

    {
        field: 'issue_date',
        headerName: 'Issue Date',
        width: 150,
        renderCell: (params) => formatDate(params.value),
      },
      {
        field: 'expire_date',
        headerName: 'Expire Date',
        width: 150,
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
  ];
const pad = (num) => num.toString().padStart(2, '0');

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
};
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={licenses}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        
      />
    </div>
  );
}

export default Licenses;