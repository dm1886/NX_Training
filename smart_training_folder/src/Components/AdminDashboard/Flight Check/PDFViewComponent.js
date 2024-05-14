import React from 'react';
import { Typography, Box } from '@mui/material';

const PDFViewComponent = ({ formData }) => {
  // You can structure this component to render the PDF based on formData
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        PDF Preview
      </Typography>
      <Typography variant="subtitle1">
        Name: {formData.name}
      </Typography>
      {/* More fields displayed here */}
    </Box>
  );
};

export default PDFViewComponent;