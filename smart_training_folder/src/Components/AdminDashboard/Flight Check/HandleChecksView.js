import React, { useState } from 'react';
import { Typography, Card, CardContent, CardActions, Button, Grid, Container, Breadcrumbs, Link , Divider } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import FillReport from './FillReport';
import ChecksView from './ChecksView';
import PDFViewComponent from './PDFViewComponent';
function HandleChecksView() {

  const [currentView, setCurrentView] = useState('Checks'); // Default view
  const [reportType, setReportType] = useState('');
  const [finalFormData, setFinalFormData] = useState(null); // Store formData for use in the PDF view


   // Function to handle navigation with report type
  const handleReportSelection = (type) => {
    setReportType(type);
    setCurrentView('FillReport');
  };
// Function to navigate back to ChecksView
const handleBackToChecks = () => {
  setCurrentView("Checks");
};

const handleFormSubmit = (formData) => {
  console.log("Form Data Ready for PDF:", formData);
  setFinalFormData(formData); 
  setCurrentView('PDFView');
  // Optionally process formData or set it for PDF generation
};

  return (

   
    <div>
      {currentView === 'Checks' && <ChecksView onReportSelect={handleReportSelection} />}
      {currentView === 'FillReport' && <FillReport reportType={reportType} onBackToChecks={handleBackToChecks} onFormSubmit={handleFormSubmit}/>}
      {currentView === 'PDFView' && <PDFViewComponent formData={finalFormData} />}
    </div>
 
  );
}

export default HandleChecksView;
