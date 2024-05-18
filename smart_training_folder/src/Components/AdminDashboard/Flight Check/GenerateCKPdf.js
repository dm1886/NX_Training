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
  // const mmToPoints = (mm) => (mm / 25.4) * 72;
  // const dm = (cm) => (cm/21)* 595;

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

// return (
//   <div>
//     <Button
//       type="button"
//       fullWidth
//       variant="outlined"
//       color="secondary"
//       sx={{ mt: 1, mb: 2 }}
//       onClick={onBackToFill}
//     >
//       Back to Fill
//     </Button>
//     <PDFViewer style={styles.viewer}>
//       <Document>
//         <Page size="A4" style={styles.page}>
//           <Image
//             style={styles.logo}
//             src="/logo2.png" // Replace with your logo path
//           />
//           <Canvas style={styles.header} paint={drawLinesheader} />

//           {/* Text for each cell */}

//           <PdfHeaderText formData={formData} />
//         </Page>
//       </Document>
//     </PDFViewer>
//   </div>
// );
// }

     
// <Text style={{ ...styles.title, top: cmToP(1.4), left: cmToP(2.3) }}>
// PILOT PROFICIENCY REPORT
// </Text>

// <Text style={{ ...styles.headerText, top: cmToP(1.9), left: cmToP(2.5) }}>
// FTD
// </Text>
// <Text style={{ ...styles.mark, top: cmToP(1.9), left: cmToP(2.1) }}>
// { formData.ftd ?  "X" : ''}
// </Text>

// <Text style={{ ...styles.headerText, top: cmToP(2.5), left: cmToP(2.5) }}>
// SIM
// </Text>
// <Text style={{ ...styles.mark, top: cmToP(2.5), left: cmToP(2.1) }}>
// { formData.sim ?  "X" : ''}
// </Text>

// <Text style={{ ...styles.headerText, top: cmToP(3), left: cmToP(2.5) }}>
// ACFT
// </Text>
// <Text style={{ ...styles.mark, top: cmToP(3), left: cmToP(2.1) }}>
// { formData.aircraft ?  "X" : ''}
// </Text>



//   // Internal horizontal lines
//   ctx.moveTo(50, 80);
//   ctx.lineTo(550, 80);

//   ctx.moveTo(50, 120);
//   ctx.lineTo(550, 120);

//   ctx.moveTo(50, 160);
//   ctx.lineTo(550, 160);

//   ctx.moveTo(50, 200);
//   ctx.lineTo(550, 200);

//   ctx.moveTo(50, 240);
//   ctx.lineTo(550, 240);

//   ctx.moveTo(50, 280);
//   ctx.lineTo(550, 280);

//   // Internal vertical lines
//   ctx.moveTo(150, 40);
//   ctx.lineTo(150, 340);

//   ctx.moveTo(250, 40);
//   ctx.lineTo(250, 340);

//   ctx.moveTo(350, 40);
//   ctx.lineTo(350, 340);

//   ctx.moveTo(450, 40);
//   ctx.lineTo(450, 340);

//   ctx.stroke();

// 595 by 842 points

// import React from 'react';
// import { Document, Page, StyleSheet, Canvas, PDFViewer } from '@react-pdf/renderer';

// function PdfTest() {
//     const styles = StyleSheet.create({
//         page: {
//           flexDirection: 'column',
//           backgroundColor: '#fff'
//         },
//         canvas: {
//           flex: 1,
//         }
//       });

//       const drawTable = (ctx) => {
//         // Outer border
//         ctx.rect(0, 0, 595, 300);
//         ctx.stroke();

//       };

//       return (
//         <PDFViewer style={{ width: '100%', height: '100vh' }}>
//           <Document>
//             <Page size="A4" style={styles.page}>
//               <Canvas paint={drawTable} style={styles.canvas} />

//             </Page>
//           </Document>
//         </PDFViewer>
//       );
// }

// export default PdfTest;

// const cmToP = (cm) => (cm / 2.54) * 72;

// import React from 'react';
// import { Page, Text, View, Document, StyleSheet, PDFViewer, Canvas, Image } from '@react-pdf/renderer';

// function PdfTest() {

//     const formData = {
//         name: 'John Doe',
//         AMU_no: '12345',
//         date: '2024-05-14',
//         reg: 'ABC123',
//         captain: true,
//         firstOfficer: false,
//         initialQualification: true,
//         ACFT_SIM_type: 'Type A',
//         routeLocal: 'Local Route',
//         session: 'Session 1',
//       };

//     const styles = StyleSheet.create({
//         page: {
//             backgroundColor: '#fff',
//             padding: 10,
//           },
//           canvas: {
//             position: 'absolute',
//             top: 0,
//             left: 0,
//           },
//           text: {
//             position: 'absolute',
//             fontSize: 12,
//           },
//           viewer: {
//             width: '100vw', // Viewport width
//             height: '100vh', // Viewport height
//           },
//           logo: {
//             position: 'absolute',
//             top: 10, // Position from the top
//             left: 200, // Position from the left
//             width: 50, // Width of the logo
//             height: 50, // Height of the logo
//           },
//         });

//       const drawLines = (ctx) => {
//         // Outer Rectangle
//         ctx.moveTo(10, 10);
//         ctx.lineTo(580, 10);
//         ctx.lineTo(580, 140);
//         ctx.lineTo(10, 140);
//         ctx.lineTo(10, 10);

//         // Horizontal Lines
//         ctx.moveTo(100, 10);
//         ctx.lineTo(100, 140);

//         ctx.moveTo(10, 30);
//         ctx.lineTo(580, 30);

//         ctx.moveTo(10, 50);
//         ctx.lineTo(580, 50);

//         ctx.moveTo(10, 70);
//         ctx.lineTo(580, 70);

//         ctx.moveTo(10, 90);
//         ctx.lineTo(580, 90);

//         ctx.moveTo(10, 110);
//         ctx.lineTo(580, 110);

//         ctx.moveTo(10, 130);
//         ctx.lineTo(580, 130);

//         // Vertical Lines
//         ctx.moveTo(250, 10);
//         ctx.lineTo(250, 70);

//         ctx.moveTo(400, 10);
//         ctx.lineTo(400, 70);

//         ctx.moveTo(250, 90);
//         ctx.lineTo(250, 140);

//         ctx.moveTo(400, 90);
//         ctx.lineTo(400, 140);

//         ctx.stroke();
//       };

//       return (
//         <PDFViewer style={styles.viewer}>
//         <Document>
//           <Page size="A4" style={styles.page}>
//           <Image
//             style={styles.logo}
//             src="/amu_logo.png" // Replace with your logo path
//           />
//             <Canvas style={styles.canvas} paint={drawLines} />

//             {/* Text for each cell */}
//             <Text style={{ ...styles.text, top: 12, left: 20 }}>PILOT PROFICIENCY REPORT</Text>
//             <Text style={{ ...styles.text, top: 12, left: 260 }}>Name:</Text>
//             <Text style={{ ...styles.text, top: 12, left: 410 }}>{formData.name}</Text>
//             <Text style={{ ...styles.text, top: 32, left: 20 }}>FTD</Text>
//             <Text style={{ ...styles.text, top: 32, left: 260 }}>AMU No.</Text>
//             <Text style={{ ...styles.text, top: 32, left: 410 }}>{formData.AMU_no}</Text>
//             <Text style={{ ...styles.text, top: 52, left: 20 }}>SIM</Text>
//             <Text style={{ ...styles.text, top: 52, left: 260 }}>Date:</Text>
//             <Text style={{ ...styles.text, top: 52, left: 410 }}>{new Date(formData.date).toLocaleDateString()}</Text>
//             <Text style={{ ...styles.text, top: 72, left: 20 }}>ACFT</Text>
//             <Text style={{ ...styles.text, top: 72, left: 260 }}>ACFT / SIM Type:</Text>
//             <Text style={{ ...styles.text, top: 72, left: 410 }}>{formData.ACFT_SIM_type}</Text>
//             <Text style={{ ...styles.text, top: 92, left: 20 }}>LINE</Text>
//             <Text style={{ ...styles.text, top: 92, left: 260 }}>Reg. No.</Text>
//             <Text style={{ ...styles.text, top: 92, left: 410 }}>{formData.reg}</Text>
//             <Text style={{ ...styles.text, top: 112, left: 20 }}>AREA/ROUTE/AIRPORT QUAL</Text>
//             <Text style={{ ...styles.text, top: 112, left: 260 }}>Route / Local:</Text>
//             <Text style={{ ...styles.text, top: 112, left: 410 }}>{formData.routeLocal}</Text>
//             <Text style={{ ...styles.text, top: 132, left: 260 }}>Session:</Text>
//             <Text style={{ ...styles.text, top: 132, left: 410 }}>{formData.session}</Text>
//           </Page>
//         </Document>
//       </PDFViewer>
//       );
// }

// export default PdfTest;


// var add = 0
// var yLast = 2.4

// for (let i=0; i<3; i++){
// console.log("DRAWING----", i, add, yLast) // 0, 2.4
// ctx.moveTo(cmToP(2), cmToP(yLast + add))
// ctx.lineTo(cmToP(3.6), cmToP(yLast+ add ));
// ctx.stroke();
// add = add + 0.5;
// yLast = yLast + add; 
// console.log('after add ', i ,yLast)