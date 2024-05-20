import React, { useEffect, useState } from 'react';
import { Button, Box, Container, Divider, Typography , Grid } from '@mui/material';
// import TitleAndSubtitle from './TitleAndSubtitle';
import PilotInfoSection from './PilotInfoSection';
// import LicenseInfoSection from './LicenseInfoSection';
// import CheckInfoSection from './CheckInfoSection';

function FillReport({ userinfo, reportType, onBackToChecks, onFormSubmit, formData, setFormData }) { // MARK: Accept formData and setFormData as props
  const [isDirty, setDirty] = useState(false);

  
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
      // Exclude specific fields from validation
      if (["reg", "routeLocal", "session", "simValidity"].includes(key)) {
        return true;
      }
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


// this handle the continue after the form is filled

const handleSubmit = (event) => {
  // setDirty(true) // <--------- only for test to be removed 
  event.preventDefault();
  // if (isDirty) {
    onFormSubmit(formData); 
    // setDirty(false);
  // }
};
  const handleBack = () => {
    if (isDirty && window.confirm("You have unsaved changes. Are you sure you want to leave?")) {
      onBackToChecks();
    } else if (!isDirty) {
      onBackToChecks();
    }
  };
  
  return (
    // Fix this when is on ipad cant scrool to see the button
    <Container component="main" maxWidth="" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
          <Typography component="h3" variant="h3" gutterBottom> {reportType} </Typography>
          </Grid>
        </Grid>

     
      <Box sx={{
        flexGrow: 1,
        width: '100%',
        borderRadius: 2,
      }}>
        <PilotInfoSection formData={formData} setFormData={setFormData} />
        <Box sx={{ mt: 'auto' }}>
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit} >
            Save and Continue
          </Button>
          <Button type="button" fullWidth variant="outlined" color="secondary" sx={{ mt: 1, mb: 2 }} onClick={handleBack}>
            Back to Checks
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default FillReport;