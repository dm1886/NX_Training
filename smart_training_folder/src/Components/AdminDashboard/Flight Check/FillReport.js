import React, { useEffect, useState } from 'react';
import { Button, Box, Container, Divider, Typography } from '@mui/material';
// import TitleAndSubtitle from './TitleAndSubtitle';
import PilotInfoSection from './PilotInfoSection';
// import LicenseInfoSection from './LicenseInfoSection';
// import CheckInfoSection from './CheckInfoSection';

function FillReport({ reportType, onBackToChecks, onFormSubmit }) {
  const [isDirty, setDirty] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    AMU_no: '',
    date: new Date(),
    ACFT_SIM_type: "",
    reg: '',
    routeLocal: '',
    session: '',
    licenseNumber: '',
    licenseValidity: '',
    instrumentValidity: '',
    medicalValidity: '',
    simValidity: '',
    captain: false,
    firstOfficer: false,
    initialQualification: false,
    recurrent: false,
    requalification: false,
    specialQualification: false,
    postRelease: false,
    ftd: false,
    sim: false,
    aircraft: false,
    line: false,
    area_route_qual: false,
  });



  // useEffect to log formData changes
 useEffect(() => {
  console.log("FormData updated:", formData);
  const isFieldFilled = (key, value) => {
    if (typeof value === 'string') return value.trim() !== '';
    if (typeof value === 'boolean') {
      // Assuming all boolean fields can be true or false without affecting form validity
      return true; 
    }
    if (value instanceof Date) return value && !isNaN(value.valueOf());
    return value != null;
  };

  // Specify which checkboxes must be true to consider the form valid
  const requiredCheckboxes = ["initialQualification", "recurrent", "requalification", "specialQualification", "postRelease", "ftd", "sim", "aircraft", "line", "area_route_qual"];
  const atLeastOneCheckboxSelected = requiredCheckboxes.some(key => formData[key] === true);

  const unfilledFields = [];
  const allFieldsFilled = Object.entries(formData).every(([key, value]) => {
    const filled = isFieldFilled(key, value);
    if (!filled) unfilledFields.push(key);
    return filled;
  });

  const formIsValid = allFieldsFilled && atLeastOneCheckboxSelected;

  if (!formIsValid) {
    console.log("Unfilled fields or no checkboxes selected:", unfilledFields.join(", "));
  }

  setDirty(formIsValid);
}, [formData]);

const handleSubmit = (event) => {
  event.preventDefault();
  if (isDirty) {
    onFormSubmit(formData);  // Assuming this prop function will handle view switching
    setDirty(false);
  }
};
  const handleBack = () => {
    if (isDirty && window.confirm("You have unsaved changes. Are you sure you want to leave?")) {
      onBackToChecks();
    } else if (!isDirty) {
      onBackToChecks();
    }
  };
  return (
    <Container component="main" maxWidth="lg" >
      <Box sx={{
        marginTop: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        border: '1px solid #ccc',
        padding: 2,
        borderRadius: 2,
        overflowY: 'auto',
        height: '100vh',
      }}>

        <Typography component="h3" variant="h3" gutterBottom> {reportType} </Typography>
        <PilotInfoSection formData={formData} setFormData={setFormData} />
        
   



        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit} disabled={!isDirty}>
          Continue
        </Button>
        <Button type="button" fullWidth variant="outlined" color="secondary" sx={{ mt: 1, mb: 2 }} onClick={handleBack}>
          Back to Checks
        </Button>
      </Box>
    </Container>
  );
}

export default FillReport;