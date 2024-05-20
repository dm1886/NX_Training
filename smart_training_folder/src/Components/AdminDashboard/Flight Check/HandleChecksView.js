import React, { useState } from 'react';
import FillReport from './FillReport';
import ChecksView from './ChecksView';
import GenerateCKPdf from './PDF/GenerateCKPdf';
import GiveScore from './GiveScore'; // Import GiveScore component
import axios from 'axios';
import { CircularProgress, Box, Alert } from '@mui/material';

function HandleChecksView({userInfo}) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [currentView, setCurrentView] = useState('Checks'); // Default view
  const [reportType, setReportType] = useState('');
  const [loading, setLoading] = useState(false); // MARK: Add loading state
  const [error, setError] = useState(null); // MARK: Add error state
  const [finalFormData, setFinalFormData] = useState({ // MARK: Initialized with default form data to avoid losing data
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
    checkFormType: "CK", // or TN
    instructor_id:userInfo.id,
    user_id:0
  }); 


   // Function to handle navigation with report type
  const handleReportSelection = (type) => {
    setReportType(type);
    setCurrentView('FillReport');
  };
// Function to navigate back to ChecksView
const handleBackToChecks = () => {
  setCurrentView("Checks");
};

const handleBackToFill = () => {
  
  setCurrentView('FillReport');
}

const handleGeneratePDF = () => {
  setCurrentView('PDFView');
};


const saveReport = (formData) => {
  setLoading(true); // MARK: Set loading to true
  setError(null); // MARK: Reset error state
  axios.post(`${apiUrl}/saveReport`, formData)
    .then(response => {
      console.log("Report saved successfully:", response.data);
      setFinalFormData(formData);
      console.log("Form Data Ready for Scoring:", formData);
    })
    .then(() => {
      setLoading(false); // MARK: Set loading to false
      setCurrentView('GiveScore');
    })
    .catch(error => {
      console.error("Failed to save report or generate score:", error);
      setError("Failed to save report or generate score."); // MARK: Set error message
      setLoading(false); // MARK: Set loading to false
      setCurrentView('FillReport'); // MARK: Return to FillReport on error
    });
};

// handle the button continue after finish fill the form page 1
const handleFormSubmit = (formData) => {
  console.log("Form Data Ready for Scoring:", formData);
  saveReport(formData);
};

  return (
    
    <div>
      {loading && ( 
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      )}

      

      {currentView === 'Checks' && <ChecksView onReportSelect={handleReportSelection} />}
      {currentView === 'FillReport' && <FillReport userinfo={userInfo} reportType={reportType} onBackToChecks={handleBackToChecks} onFormSubmit={handleFormSubmit} formData={finalFormData} setFormData={setFinalFormData} />}
      {currentView === 'GiveScore' && <GiveScore formData={finalFormData} onBackToFill={handleBackToFill} onGeneratePDF={handleGeneratePDF} />}
      {currentView === 'PDFView' && <GenerateCKPdf formData={finalFormData} onBackToFill={handleBackToFill} />}

      {error && ( // MARK: Display error message
        <Box sx={{ position: 'fixed', bottom: 20, width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Alert severity="error" sx={{ maxWidth: '90%' }}>{error}</Alert>
        </Box>
      )}
    </div>
    
 
  );
}

export default HandleChecksView;
