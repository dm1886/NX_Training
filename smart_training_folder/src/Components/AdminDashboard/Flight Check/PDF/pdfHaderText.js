import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Canvas,
  Image,
  Svg,
  Rect
} from "@react-pdf/renderer";

function pdfHaderText({formData}) {
  const cmToP = (cm) => (cm / 2.54) * 72;
  const styles = StyleSheet.create({
    div: {
      position: "absolute",
      top: 0, // Position from the top
      left: 0, // Position from the left
      margin: 0,
      padding: 0,
      border: 0,
      width: cmToP(21), // Width of the logo
      height: cmToP(3.9), // Height of the logo
    },

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
      headerTextValue: {
        position: "absolute",
        fontSize: 8,
        fontWeight: "bold"
      },
      mark: {
        position: "absolute",
        fontSize: 8,
        fontWeight: "bold", // Make the text bold
      },
  
  
      viewer: {
        width: "100vw", // Viewport width
        height: "100vh", // Viewport height
      },
      logo: {
        position: "absolute",
        top: cmToP(0.7), // Position from the top
        left: cmToP(3), // Position from the left
        width: cmToP(2.1), // Width of the logo
        height: cmToP(0.5), // Height of the logo
      },

      checkFormType: {
        position: "absolute",
        fontSize: 30,
      }

    });

    const formatDate = (date) => {
        return date instanceof Date ? date.toLocaleDateString() : 'Invalid date';
      };
  
    var y = 0.6 // cm
    var x = 1.9 //cm
    

    const renderMark = (condition) => {
      return condition ? (
        <Svg height="9" width="9">
          <Rect x="0" y="0" width="9" height="9" fill="black" />
        </Svg>
      ) : null;
    };
  return (
    <div style={{ ...styles.div }}>


    <Text style={{ ...styles.title, top: cmToP(y + 0.8), left: cmToP(x + 0.4) }}>
      PILOT PROFICIENCY REPORT
    </Text>

    <Text style={{ ...styles.headerText, top: cmToP(y + 1.25), left: cmToP(x + 0.6) }}>
      FTD
    </Text>
    <View style={{ top: cmToP(y + 1.25), left: cmToP(x + 0.05), position: 'absolute' }}>
      {renderMark(formData.ftd)}
    </View>

    <Text style={{ ...styles.headerText, top: cmToP(y + 1.25 + 0.4), left: cmToP(x + 0.6) }}>
      SIM
    </Text>
    <View style={{ top: cmToP(y + 1.25 + 0.4), left: cmToP(x + 0.05), position: 'absolute' }}>
      {renderMark(formData.sim)}
    </View>

    <Text style={{ ...styles.headerText, top: cmToP(y + 1.25 + 0.8), left: cmToP(x + 0.6) }}>
      ACFT
    </Text>
    <View style={{ top: cmToP(y + 1.25 + 0.8), left: cmToP(x + 0.05), position: 'absolute' }}>
      {renderMark(formData.aircraft)}
    </View>

    <Text style={{ ...styles.headerText, top: cmToP(y + 1.25 + 0.8 + 0.4), left: cmToP(x + 0.6) }}>
      LINE
    </Text>
    <View style={{ top: cmToP(y + 1.25 + 0.8 + 0.4), left: cmToP(x + 0.05), position: 'absolute' }}>
      {renderMark(formData.line)}
    </View>
    <Text style={{ ...styles.headerText, top: cmToP(y + 1.25 + 0.8 + 0.4 + 0.4), left: cmToP(x + 0.6) }}>
      AREA/ROUTE/AIRPORT QUAL
    </Text>
    <View style={{ top: cmToP(y + 1.25 + 0.8 + 0.4 + 0.4), left: cmToP(x + 0.05), position: 'absolute' }}>
      {renderMark(formData.area_route_qual)}
    </View>

    <Text style={{ ...styles.checkFormType, top: cmToP(y + 1.5), left: cmToP(x + 2.3) }}>
      {formData.checkFormType}
    </Text>

    <Text style={{ ...styles.headerText, top: cmToP(y + 0.1), left: cmToP(x + 4.4) }}>
      Name
    </Text>
    <Text style={{ ...styles.headerTextValue, top: cmToP(y + 0.4), left: cmToP(x + 4.4) }}>
      {formData.name} {formData.surname}
    </Text>

    <Text style={{ ...styles.headerText, top: cmToP(y + 0.9), left: cmToP(x + 4.4) }}>
      AMU No
    </Text>
    <Text style={{ ...styles.headerTextValue, top: cmToP(y + 1.3), left: cmToP(x + 4.4) }}>
      {formData.AMU_no}
    </Text>
    <Text style={{ ...styles.headerText, top: cmToP(y + 1.7), left: cmToP(x + 4.4) }}>
      ACFT /SIM Type
    </Text>
    <Text style={{ ...styles.headerTextValue, top: cmToP(y + 2.0), left: cmToP(x + 4.4) }}>
      {formData.ACFT_SIM_type}
    </Text>

    <Text style={{ ...styles.headerText, top: cmToP(y + 2.4), left: cmToP(x + 4.4) }}>
      Route/Local
    </Text>
    <Text style={{ ...styles.headerTextValue, top: cmToP(y + 2.8), left: cmToP(x + 4.4) }}>
      {formData.routeLocal}
    </Text>

    <Text style={{ ...styles.headerText, top: cmToP(y + 0.9), left: cmToP(x + 7) }}>
      Date
    </Text>
    <Text style={{ ...styles.headerTextValue, top: cmToP(y + 1.3), left: cmToP(x + 7) }}>
      {formatDate(new Date())}
    </Text>

    <Text style={{ ...styles.headerText, top: cmToP(y + 1.7), left: cmToP(x + 7) }}>
      Reg No
    </Text>
    <Text style={{ ...styles.headerTextValue, top: cmToP(y + 2), left: cmToP(x + 7) }}>
      {formData.reg}
    </Text>

    <Text style={{ ...styles.headerText, top: cmToP(y + 2.4), left: cmToP(x + 7) }}>
      Session
    </Text>
    <Text style={{ ...styles.headerTextValue, top: cmToP(y + 2.8), left: cmToP(x + 7) }}>
      {formData.session}
    </Text>

    <Text style={{ ...styles.headerText, top: cmToP(y + 0.1), left: cmToP(x + 10.2) }}>
      CAPTAIN
    </Text>
    <View style={{ top: cmToP(y + 0.1), left: cmToP(x + 9.65), position: 'absolute' }}>
      {renderMark(formData.captain)}
    </View>

    <Text style={{ ...styles.headerText, top: cmToP(y + 0.5), left: cmToP(x + 10.2) }}>
      FIRST OFFICER
    </Text>
    <View style={{ top: cmToP(y + 0.45), left: cmToP(x + 9.65), position: 'absolute' }}>
      {renderMark(formData.firstOfficer)}
    </View>

    <Text style={{ ...styles.headerText, top: cmToP(y + 0.9), left: cmToP(x + 10.2) }}>
      INITIAL QUALIFICATION
    </Text>
    <View style={{ top: cmToP(y + 0.85), left: cmToP(x + 9.65), position: 'absolute' }}>
      {renderMark(formData.initialQualification)}
    </View>

    <Text style={{ ...styles.headerText, top: cmToP(y + 1.3), left: cmToP(x + 10.2) }}>
      RECURRENT
    </Text>
    <View style={{ top: cmToP(y + 1.25), left: cmToP(x + 9.65), position: 'absolute' }}>
      {renderMark(formData.recurrent)}
    </View>

    <Text style={{ ...styles.headerText, top: cmToP(y + 1.7), left: cmToP(x + 10.2) }}>
      REQUALIFICATION
    </Text>
    <View style={{ top: cmToP(y + 1.65), left: cmToP(x + 9.65), position: 'absolute' }}>
      {renderMark(formData.requalification)}
    </View>

    <Text style={{ ...styles.headerText, top: cmToP(y + 2.1), left: cmToP(x + 10.2) }}>
      SPECIAL QUALIFICATION
    </Text>
    <View style={{ top: cmToP(y + 2.05), left: cmToP(x + 9.65), position: 'absolute' }}>
      {renderMark(formData.specialQualification)}
    </View>

    <Text style={{ ...styles.headerText, top: cmToP(y + 2.5), left: cmToP(x + 10.2) }}>
      POST RELEASE
    </Text>
    <View style={{ top: cmToP(y + 2.45), left: cmToP(x + 9.65), position: 'absolute' }}>
      {renderMark(formData.postRelease)}
    </View>

    <Text style={{ ...styles.headerText, top: cmToP(y + 2.9), left: cmToP(x + 9.8) }}>
      SIM Validity
    </Text>
    <Text style={{ ...styles.headerTextValue, top: cmToP(y + 2.9), left: cmToP(x + 11.8) }}>
      {formData.simValidity}
    </Text>
    {/*  */}

    <Text style={{ ...styles.headerText, top: cmToP(y + 0.1), left: cmToP(x + 13.8) }}>
      License No
    </Text>
    <Text style={{ ...styles.headerTextValue, top: cmToP(y + 0.45), left: cmToP(x + 13.8) }}>
      {formData.licenseNumber}
    </Text>

    <Text style={{ ...styles.headerText, top: cmToP(y + 0.9), left: cmToP(x + 13.8) }}>
      License Validity
    </Text>
    <Text style={{ ...styles.headerTextValue, top: cmToP(y + 1.25), left: cmToP(x + 13.8) }}>
      {formData.licenseValidity}
    </Text>
    <Text style={{ ...styles.headerText, top: cmToP(y + 1.7), left: cmToP(x + 13.8) }}>
      Instrument Validity
    </Text>
    <Text style={{ ...styles.headerTextValue, top: cmToP(y + 1.95), left: cmToP(x + 13.8) }}>
      {formData.instrumentValidity}
    </Text>

    <Text style={{ ...styles.headerText, top: cmToP(y + 2.4), left: cmToP(x + 13.8) }}>
      Medical Validity
    </Text>
    <Text style={{ ...styles.headerTextValue, top: cmToP(y + 2.8), left: cmToP(x + 13.8) }}>
      {formData.medicalValidity}
    </Text>
    </div>
  );
}

export default pdfHaderText;


// import React from "react";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   PDFViewer,
//   Canvas,
//   Image,
//   Svg,
//   Rect
// } from "@react-pdf/renderer";

// function pdfHaderText({formData}) {
//   const cmToP = (cm) => (cm / 2.54) * 72;
//   const styles = StyleSheet.create({
//     div: {
//       position: "absolute",
//       top: 0, // Position from the top
//       left: 0, // Position from the left
//       margin: 0,
//       padding: 0,
//       border: 0,
//       width: cmToP(21), // Width of the logo
//       height: cmToP(3.9), // Height of the logo
//     },

//     page: {
//         backgroundColor: "#fff",
//         padding: 10,
//       },
//       header: {
//         position: "absolute",
//         top: 0,
//         left: 0,
//       },
//       body1: {
//         position: "absolute",
//         top: 100,
//         left: 0,
//       },
//       title: {
//         position: "absolute",
//         fontSize: 7,
//       },
//       headerText: {
//         position: "absolute",
//         fontSize: 7,
//       },
//       headerTextValue: {
//         position: "absolute",
//         fontSize: 8,
//         fontWeight: "bold"
//       },
//       mark: {
//         position: "absolute",
//         fontSize: 8,
//         fontWeight: "bold", // Make the text bold
//       },
  
  
//       viewer: {
//         width: "100vw", // Viewport width
//         height: "100vh", // Viewport height
//       },
//       logo: {
//         position: "absolute",
//         top: cmToP(0.7), // Position from the top
//         left: cmToP(3), // Position from the left
//         width: cmToP(2.1), // Width of the logo
//         height: cmToP(0.5), // Height of the logo
//       },

//       checkFormType: {
//         position: "absolute",
//         fontSize: 30,
//       }

//     });

//     const formatDate = (date) => {
//         return date instanceof Date ? date.toLocaleDateString() : 'Invalid date';
//       };
  
//     var y = 0.6 // cm
//     var x = 1.9 //cm
    

//     const renderMark = (condition) => {
//       return condition ? (
//         <Svg height="8" width="8">
//           <Rect x="0" y="0" width="8" height="8" fill="black" />
//         </Svg>
//       ) : null;
//     };
//   return (
//     <div style={{ ...styles.div }}>
      

//       <Text style={{ ...styles.title, top: cmToP(y+0.8), left: cmToP(x+0.4) }}>
//         PILOT PROFICIENCY REPORT
//       </Text>

//       <Text style={{ ...styles.headerText, top: cmToP(y+1.25), left: cmToP(x+0.6) }}>
//         FTD
//       </Text>
//       <Text style={{ ...styles.mark, top: cmToP(y+1.25), left: cmToP(x+0.1) }}>
//         {formData.ftd ? "X" : ""}
//       </Text>

//       <Text style={{ ...styles.headerText, top: cmToP(y+1.25 + 0.4), left: cmToP(x+0.6) }}>
//         SIM
//       </Text>
//       <Text style={{ ...styles.mark, top: cmToP(y+1.25 + 0.4), left: cmToP(x+0.1) }}>
//         {formData.sim ? "X" : ""}
//       </Text>

//       <Text style={{ ...styles.headerText, top: cmToP(y+1.25 + 0.8), left: cmToP(x+0.6) }}>
//         ACFT
//       </Text>
//       <Text style={{ ...styles.mark, top: cmToP(y+1.25 + 0.8), left: cmToP(x+0.1) }}>
//         {formData.aircraft ? "X" : ""}
//       </Text>

//       <Text style={{ ...styles.headerText, top: cmToP(y+1.25 + 0.8 +0.4), left: cmToP(x+0.6) }}>
//         LINE
//       </Text>
//       <Text style={{ ...styles.mark, top: cmToP(y+1.25 + 0.8 +0.4), left: cmToP(x+0.1) }}>
//         {formData.line ? "X" : ""}
//       </Text>
//       <Text style={{ ...styles.headerText, top: cmToP(y+1.25 + 0.8 +0.4 + 0.4) , left: cmToP(x+0.6) }}>
//         AREA/ROUTE/AIRPORT QUAL
//       </Text>
//       <Text style={{ ...styles.mark, top: cmToP(y+1.25 + 0.8 +0.4 + 0.4), left: cmToP(x+0.1) }}>
//         {formData.area_route_qual ? "X" : ""}
//       </Text>

//       <Text style={{ ...styles.checkFormType, top: cmToP(y+1.5), left: cmToP(x+2.3) }}>
//         {formData.checkFormType}
//       </Text>

//       <Text style={{ ...styles.headerText, top: cmToP(y+0.1), left: cmToP(x+4.4) }}>
//         Name
//       </Text>
//       <Text style={{ ...styles.headerTextValue, top: cmToP(y + 0.4), left: cmToP(x + 4.4) }}>
//         {formData.name} {formData.surname}
//       </Text>

//       <Text style={{ ...styles.headerText, top: cmToP(y+0.9), left: cmToP(x + 4.4) }}>
//         AMU No
//       </Text>
//       <Text style={{ ...styles.headerTextValue, top: cmToP(y+1.3), left: cmToP(x + 4.4) }}>
//         {formData.AMU_no}
//       </Text>
//       <Text style={{ ...styles.headerText, top: cmToP(y+1.7), left: cmToP(x + 4.4) }}>
//         ACFT /SIM Type
//       </Text>
//       <Text style={{ ...styles.headerTextValue, top: cmToP(y+2.0), left: cmToP(x + 4.4) }}>
//         {formData.ACFT_SIM_type}
//       </Text>

//       <Text style={{ ...styles.headerText, top: cmToP(y+2.4), left: cmToP(x + 4.4) }}>
//         Route/Local
//       </Text>
//       <Text style={{ ...styles.headerTextValue, top: cmToP(y+2.8), left: cmToP(x + 4.4) }}>
//         {formData.routeLocal}
//       </Text>

//       <Text style={{ ...styles.headerText, top: cmToP(y+0.9), left: cmToP(x + 7) }}>
//         Date
//       </Text>
//       <Text style={{ ...styles.headerTextValue, top: cmToP(y+1.3), left: cmToP(x + 7) }}>
//       {formatDate(new Date())}
       
//       </Text>

//       <Text style={{ ...styles.headerText, top: cmToP(y+1.7), left: cmToP(x + 7) }}>
//         Reg No
//       </Text>
//       <Text style={{ ...styles.headerTextValue, top: cmToP(y+2), left: cmToP(x + 7) }}>
//       {formData.reg}
       
//       </Text>

//       <Text style={{ ...styles.headerText, top: cmToP(y+2.4), left: cmToP(x + 7) }}>
//         Session
//       </Text>
//       <Text style={{ ...styles.headerTextValue, top: cmToP(y+2.8), left: cmToP(x + 7) }}>
//         {formData.session}
//       </Text>

//       <Text style={{ ...styles.headerText, top: cmToP(y+0.1), left: cmToP(x + 10.2) }}>
//         CAPTAIN
//       </Text>
//       <Text style={{ ...styles.headerTextValue, top: cmToP(y+0.1), left: cmToP(x+9.7) }}>
//       {formData.captain ? "X" : ""}
//       </Text>

//       <Text style={{ ...styles.headerText, top: cmToP(y+0.5), left: cmToP(x + 10.2) }}>
//         FIRST OFFICER
//       </Text>
//       <Text style={{ ...styles.headerTextValue, top: cmToP(y+0.45), left: cmToP(x+9.7) }}>
//       {formData.firstOfficer ? "X" : ""}
//       </Text>

//       <Text style={{ ...styles.headerText, top: cmToP(y+0.9), left: cmToP(x + 10.2) }}>
//         INITIAL QUALIFICATION
//       </Text>
//       <Text style={{ ...styles.headerTextValue, top: cmToP(y+0.85), left: cmToP(x+9.7) }}>
//       {formData.initialQualification ? "X" : ""}
//       </Text>

//       <Text style={{ ...styles.headerText, top: cmToP(y+1.3), left: cmToP(x + 10.2) }}>
//         RECURRENT
//       </Text>
//       <Text style={{ ...styles.headerTextValue, top: cmToP(y+1.25), left: cmToP(x+9.7) }}>
//       {formData.recurrent ? "X" : ""}
//       </Text>

//       <Text style={{ ...styles.headerText, top: cmToP(y+1.7), left: cmToP(x + 10.2) }}>
//         REQUALIFICATION
//       </Text>
//       <Text style={{ ...styles.headerTextValue, top: cmToP(y+1.65), left: cmToP(x+9.7) }}>
//       {formData.requalification ? "X" : ""}
//       </Text>

//       <Text style={{ ...styles.headerText, top: cmToP(y+2.1), left: cmToP(x + 10.2) }}>
//         SPECIAL QUALIFICATION
//       </Text>
//       <Text style={{ ...styles.headerTextValue, top: cmToP(y+1.95), left: cmToP(x+9.7) }}>
//       {formData.specialQualification ? "X" : ""}
//       </Text>

//       <Text style={{ ...styles.headerText, top: cmToP(y+2.5), left: cmToP(x + 10.2) }}>
//         POST RELEASE
//       </Text>
//       <Text style={{ ...styles.headerTextValue, top: cmToP(y+2.45), left: cmToP(x+9.7) }}>
//       {formData.postRelease ? "X" : ""}
//       </Text>

//       <Text style={{ ...styles.headerText, top: cmToP(y+2.9), left: cmToP(x + 9.8) }}>
//         SIM Validity
//       </Text>
//       <Text style={{ ...styles.headerTextValue, top: cmToP(y+2.9), left: cmToP(x + 11.8) }}>
//       {formData.simValidity}
//       </Text>
//     {/*  */}

//     <Text style={{ ...styles.headerText, top: cmToP(y+0.1), left: cmToP(x+13.8) }}>
//         License No
//       </Text>
//       <Text style={{ ...styles.headerTextValue, top: cmToP(y+0.45), left: cmToP(x+13.8) }}>
//         {formData.licenseNumber}
//       </Text>

//       <Text style={{ ...styles.headerText, top: cmToP(y+0.9), left: cmToP(x+13.8) }}>
//         License Validity
//       </Text>
//       <Text style={{ ...styles.headerTextValue, top: cmToP(y+1.25), left: cmToP(x+13.8) }}>
//         {formData.licenseValidity}
//       </Text>
//       <Text style={{ ...styles.headerText, top: cmToP(y+1.7), left: cmToP(x+13.8) }}>
//         Instrument Validity
//       </Text>
//       <Text style={{ ...styles.headerTextValue, top: cmToP(y+1.95), left: cmToP(x+13.8) }}>
//         {formData.instrumentValidity}
//       </Text>

//       <Text style={{ ...styles.headerText, top: cmToP(y+2.4), left: cmToP(x+13.8) }}>
//         Medical Validity
//       </Text>
//       <Text style={{ ...styles.headerTextValue, top: cmToP(y+2.8), left: cmToP(x+13.8) }}>
//         {formData.medicalValidity}
//       </Text>

//     </div>
//   );
// }

// export default pdfHaderText;
