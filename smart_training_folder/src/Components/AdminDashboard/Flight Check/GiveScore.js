import React, { useEffect } from 'react';
import { Button, Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper , Card} from '@mui/material';

function GiveScore({ formData = {}, onBackToFill, onGeneratePDF }) { // Set default value to avoid undefined
    const appBarHeight = 64; // Example height of the app bar

    const getDisplayValue = (value) => {
      if (value === "" || value === null) {
        return "***";
      }
      if (value instanceof Date) {
        return value.toLocaleDateString(); // Convert Date object to string
      }

      if (value === true) {
        return "true";
      } else {
        return "false";
      }

    //   return value;
    };

    useEffect(() => {
        console.log('Form Data received:', formData);
    }, [formData]);

    return (
        <Container component="main" maxWidth="xl" sx={{ height: `calc(100vh - ${appBarHeight}px)`, display: 'flex', flexDirection: 'column', paddingTop: `${appBarHeight}px` }}> {/* Adjust the paddingTop as per your AppBar height */}
            <Typography component="h3" variant="h3" gutterBottom>Give Score</Typography>
            <Box sx={{ flexGrow: 1, width: '100%', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>Form Data</Typography>
             
                <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="outlined" color="secondary" onClick={onBackToFill}>
                        Back to Fill Report
                    </Button>
                    <Button variant="contained" color="primary" onClick={onGeneratePDF}>
                        Generate PDF Report
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default GiveScore;

//  <Container component="main" maxWidth="xl" sx={{ height: `calc(100vh - ${appBarHeight}px)`, display: 'flex', flexDirection: 'column', paddingTop: `${appBarHeight}px` }}> {/* Adjust the paddingTop as per your AppBar height */}
//             <Typography component="h3" variant="h3" gutterBottom>Give Score</Typography>
//             <Box sx={{ flexGrow: 1, width: '100%', borderRadius: 2 }}>
//                 <Typography variant="h6" gutterBottom>Form Data</Typography>
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>Field</TableCell>
//                                 <TableCell>Value</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {Object.entries(formData).map(([key, value]) => (
//                                 <TableRow key={key}>
//                                     <TableCell>{key}</TableCell>
//                                     <TableCell>{getDisplayValue(value)}</TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//                 <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between' }}>
//                     <Button variant="outlined" color="secondary" onClick={onBackToFill}>
//                         Back to Fill Report
//                     </Button>
//                     <Button variant="contained" color="primary" onClick={onGeneratePDF}>
//                         Generate PDF Report
//                     </Button>
//                 </Box>
//             </Box>
//         </Container>