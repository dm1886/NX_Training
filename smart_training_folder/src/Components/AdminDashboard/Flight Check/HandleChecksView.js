import React, { useState } from 'react';
import FillReport from './FillReport';
import ChecksView from './ChecksView';
import GenerateCKPdf from './GenerateCKPdf';

function HandleChecksView() {

  const [currentView, setCurrentView] = useState('Checks'); // Default view
  const [reportType, setReportType] = useState('');
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
    checkFormType: "CK" // or TN
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

const handleFormSubmit = (formData) => {
  console.log("Form Data Ready for PDF:", formData);
  setFinalFormData(formData); 
  setCurrentView('PDFView');
  // Optionally process formData or set it for PDF generation
};

  return (

   
    <div>
      {currentView === 'Checks' && <ChecksView onReportSelect={handleReportSelection} />}
      {currentView === 'FillReport' && <FillReport reportType={reportType} onBackToChecks={handleBackToChecks} onFormSubmit={handleFormSubmit} formData={finalFormData} setFormData={setFinalFormData} />} {/* MARK: Pass formData and setFormData as props */}
      {currentView === 'PDFView' && <GenerateCKPdf formData={finalFormData} onBackToFill={handleBackToFill}  />}
    </div>
 
  );
}

export default HandleChecksView;
