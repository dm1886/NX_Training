import React,  { useState, useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Canvas,
  Image,
} from "@react-pdf/renderer";
import PdfHeaderText from './pdfHaderText'; // Ensure correct import
import { Button, Box, CircularProgress } from '@mui/material';

function GenerateCKPdf({formData, onBackToFill }) { // original
  // function GenerateCKPdf({ }) {

  // const [finalFormData, setFinalFormData] = useState({ // MARK: Initialized with default form data to avoid losing data
  //   id: null,
  //   name: 'Damiano',
  //   surname: 'Miazzi',
  //   AMU_no: '04033',
  //   date: new Date(),
  //   ACFT_SIM_type: "A320",
  //   reg: 'B-MCD',
  //   routeLocal: 'MFM-FFF',
  //   session: 'Session',
  //   licenseNumber: 'ATPLA-456',
  //   licenseValidity: '22/20/2025',
  //   instrumentValidity: '23/20/2030',
  //   medicalValidity: '24/5/22',
  //   simValidity: '20/12/2025',
  //   captain: true,
  //   firstOfficer: true,
  //   initialQualification: true,
  //   recurrent: true,
  //   requalification: true,
  //   specialQualification: true,
  //   postRelease: true,
  //   ftd: true,
  //   sim: true,
  //   aircraft: true,
  //   line: true,
  //   area_route_qual: true,
  //   checkFormType: "CK" // or TN
  // }); 


  const [loading, setLoading] = useState(true); // Loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Set an appropriate timeout duration for PDF rendering
    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  const cmToP = (cm) => (cm / 2.54) * 72;
  
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#fff",
      padding: 10,
    },
    header: {
      position: "absolute",
      top: 0,
      left: 0,
    },
    body1: {
      position: "absolute",
      top: 100,
      left: 0,
    },
    title: {
      position: "absolute",
      fontSize: 7,
    },
    headerText: {
      position: "absolute",
      fontSize: 7,
    },
    mark: {
      position: "absolute",
      fontSize: 8,
    },

    viewer: {
      width: "100%", // Viewport width
      height: "100vh", // Viewport height
    },
    logo: {
      position: "absolute",
      top: cmToP(0.7), // Position from the top
      left: cmToP(3), // Position from the left
      width: cmToP(2.1), // Width of the logo
      height: cmToP(0.5), // Height of the logo
    },
  });
  var y = 0.6 // cm
  var x = 1.9 //cm
  
  const drawLinesheader = (ctx) => {
    // Outer Rectangle
    ctx.rect(cmToP(x), cmToP(y), cmToP(17.6), cmToP(3.2));
    ctx.strokeColor('black');
    ctx.stroke();


    // // Vertical Lines
    ctx.moveTo(cmToP(x+4.3), cmToP(y));
    ctx.lineTo(cmToP(x+4.3), cmToP(y+3.2));
    ctx.stroke();

    ctx.moveTo(cmToP(x+9.6), cmToP(y));
    ctx.lineTo(cmToP(x+9.6), cmToP(y+3.2));
    ctx.stroke();

    ctx.moveTo(cmToP(x+10), cmToP(y));
    ctx.lineTo(cmToP(x+10), cmToP(y+2.8));
    ctx.stroke();

    ctx.moveTo(cmToP(x+13.6), cmToP(y));
    ctx.lineTo(cmToP(x+13.6), cmToP(y+3.2));
    ctx.stroke();

    ctx.moveTo(cmToP(x), cmToP(y+1.2));
    ctx.lineTo(cmToP(x+4.3), cmToP(y+1.2));
    ctx.stroke();

    ctx.moveTo(cmToP(x+0.4), cmToP(y+1.2));
    ctx.lineTo(cmToP(x+0.4), cmToP(y+3.2));
    ctx.stroke();

    // // Horizontal line FTD SIM etch
    var add = 0;
    for (let i = 0; i < 3; i++) {
      ctx.moveTo(cmToP(x), cmToP(y+1.6+ add));
      ctx.lineTo(cmToP(x+1.7), cmToP(y+1.6 + add));
      ctx.stroke();
      add = add + 0.4;
    }
    ctx.moveTo(cmToP(x), cmToP(y+2.8));
    ctx.lineTo(cmToP(x+4.3), cmToP(y+2.8));
    ctx.stroke();

    ctx.moveTo(cmToP(x+1.7), cmToP(y+1.2));
    ctx.lineTo(cmToP(x+1.7), cmToP(y+2.8));
    ctx.stroke();

    ctx.moveTo(cmToP(x+6.9), cmToP(y+0.8));
    ctx.lineTo(cmToP(x+6.9), cmToP(y+3.2));
    ctx.stroke();

    var a = 0;
    for (let i = 0; i < 3; i++) {
      ctx.moveTo(cmToP(x+4.3), cmToP(y+0.8 + a));
      ctx.lineTo(cmToP(x+9.6), cmToP(y+0.8 + a));
      ctx.stroke();
      a = a + 0.8;
    }

    var a = 0;
    for (let i = 0; i < 3; i++) {
      ctx.moveTo(cmToP(x+13.6), cmToP(y+0.8 + a));
      ctx.lineTo(cmToP(x+17.6), cmToP(y+0.8 + a));
      ctx.stroke();
      a = a + 0.8;
    }

    var b = 0;
    for (let i = 0; i < 6; i++) {
      ctx.moveTo(cmToP(x+9.6), cmToP(y+0.4 + b));
      ctx.lineTo(cmToP(x+10), cmToP(y+0.4 + b));
      ctx.stroke();
      b = b + 0.4;
    }

    

    ctx.moveTo(cmToP(x+10), cmToP(y+0.8));
    ctx.lineTo(cmToP(x+13.6), cmToP(y+0.8));
    ctx.stroke();

    ctx.moveTo(cmToP(x+9.6), cmToP(y+2.8));
    ctx.lineTo(cmToP(x+13.6), cmToP(y+2.8));
    ctx.stroke();
  };

  return (
    <div>
      {loading ? (
        <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          zIndex: 10,
        }}
      >
        <CircularProgress />
      </Box>
      ) : (
        <div>
          <Button
            type="button"
            fullWidth
            variant="outlined"
            color="secondary"
            sx={{ mt: 1, mb: 2 }}
            onClick={onBackToFill}
          >
            Back to Fill
          </Button>
          <PDFViewer style={styles.viewer}>
            <Document>
              <Page size="A4" style={styles.page}>
                <Image
                  style={styles.logo}
                  src="/logo2.png" // Replace with your logo path
                />
                <Canvas style={styles.header} paint={drawLinesheader} />

                {/* Text for each cell */}

                <PdfHeaderText formData={formData} />
              </Page>
            </Document>
          </PDFViewer>
        </div>
      )}
    </div>
  );
}

export default GenerateCKPdf;
