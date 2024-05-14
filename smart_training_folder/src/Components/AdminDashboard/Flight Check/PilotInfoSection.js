import React, { useEffect, useState } from 'react';
import { Typography, TextField, FormControlLabel, Checkbox, Box, Autocomplete, Grid, Divider , Switch } from '@mui/material';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const PilotInfoSection = ({reportType, formData, setFormData }) => {
  const [pilots, setPilots] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isSimulator, setIsSimulator] = useState(false); 
  const [dateVal, setDateVal] = useState({
    date: new Date(), // Ensure this is a Date object
    // other fields...
  });
  const [selectedAircraft, setSelectedAircraft] = useState(''); // For aircraft selection


  useEffect(() => {
    const fetchPilots = async () => {
      try {
        const response = await axios.get(`${apiUrl}/pilots`);
        setPilots(response.data.map(pilot => ({
          ...pilot,
          staff_numberStr: pilot.staff_number?.toString() || 'Unknown'
        })));
      } catch (error) {
        console.error('Failed to fetch pilots:', error);
      }
    };
    fetchPilots();
  }, [apiUrl]);

  // Handle the selection of a pilot from the autocomplete
  // Handle the selection of a pilot from the autocomplete
const handleOptionSelected = (event, newValue) => {
  if (newValue) {
    const license = newValue.licenses.find(l => l.license_type === 1 || l.license_type === 2); // search for atpl or cpl license
    const med = newValue.licenses.find(l => l.license_type === 3); // search for medical

    setFormData({
      ...formData,
      id: newValue.id || 0,
      AMU_no: newValue.staff_numberStr || "",
      name: newValue.name || "",
      surname: newValue.surname || "",
      captain: newValue.rank === "cpt",
      firstOfficer: newValue.rank === "fo",
      licenseNumber: license?.number || "",
      licenseValidity: formatDate(license?.expire_date) || "", // Assuming expire_date field exists
      instrumentValidity: formatDate(license?.ir_expire_date) || "", // Placeholder
      medicalValidity: formatDate(med?.expire_date), // Placeholder
      // Explicitly set captain and firstOfficer based on rank
      captain: newValue.rank === "cpt",
      firstOfficer: newValue.rank === "fo"
    });
    // Ensure that captain and firstOfficer are mutually exclusive
    if (newValue.rank === "cpt") {
      setFormData(prev => ({ ...prev, firstOfficer: false }));
    } else if (newValue.rank === "fo") {
      setFormData(prev => ({ ...prev, captain: false }));
    }
    console.log(formData);
  }
};



  const pad = (num) => num.toString().padStart(2, '0');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
  };

   // Update for checkboxes to ensure only one can be selected at a time
   const handleCheckChange = (event) => {
    const { name, checked } = event.target;
    setFormData(prevState => ({
      ...prevState,
      initialQualification: false,
      recurrent: false,
      requalification: false,
      specialQualification: false,
      postRelease: false,
      [name]: checked // Set the clicked checkbox to its new value
    }));
    console.log(formData);
  };
  const handleCheckChangeSecond = (event) => {
    const { name, checked } = event.target;
    setFormData(prevState => ({
      ...prevState,
      ftd: false, //
    sim: false, //
    aircraft: false, //
    line: false, //
    area_route_qual: false, //
      [name]: checked // Set the clicked checkbox to its new value
    }));
    
  };

  const handleAircraftChange = (event) => {
    const aircraft = event.target.value;
    setSelectedAircraft(aircraft); // Update local state
    setFormData({
      ...formData,
      ACFT_SIM_type: aircraft === 10 ? 'A320' : 'A321' // Update ACFT_SIM_type based on selection
    });
  };

  const handleDateChange = (newValue) => {
    setFormData({
      ...formData,
      date: newValue
    });
  };

  function formatLabel(label) {
    return label
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before capital letters
      .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize the first letter of each word
  }


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  return (
    <>
      <Typography variant="h6" gutterBottom>
        Pilot Information
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >
        <Autocomplete
          freeSolo
          options={pilots}
          getOptionLabel={(option) =>
            `${option?.staff_numberStr} - ${option?.name || ""} ${
              option?.surname || ""
            }, ${option?.rank || ""}, ${option?.id || "NIL"}`
          }
          onChange={handleOptionSelected}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search by AMU Number"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={formData.name || ""}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Surname"
              variant="outlined"
              fullWidth
              value={formData.surname || ""}
              disabled
            />
          </Grid>
        </Grid>

        {/* ADD HERE A ROW of 3 item equidistant  */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <FormControlLabel
              control={<Checkbox checked={formData.captain || false} disabled />}
              label="Captain"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControlLabel
              control={<Checkbox checked={formData.firstOfficer || false} disabled />}
              label="First Officer"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl variant="standard" sx={{ minWidth: 120 }}>
              <InputLabel id="aircraft-select-label">Aircraft</InputLabel>
              <Select
                labelId="aircraft-select-label"
                id="aircraft-select"
                value={selectedAircraft}
                onChange={handleAircraftChange}
                label="Aircraft"
                fullWidth
              >
                <MenuItem value={10}>A320</MenuItem>
                <MenuItem value={20}>A321</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <DatePicker
              label="Select Date"
              value={setDateVal.date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
        </Grid>

        <Divider></Divider>
        {/* License Section */}
        <Typography variant="h6" gutterBottom>
          Licenses
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="License Number"
              variant="outlined"
              fullWidth
              value={formData.licenseNumber || ""}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="License Validity"
              variant="outlined"
              fullWidth
              value={formData.licenseValidity || ""}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Instrument Validity"
              variant="outlined"
              fullWidth
              value={formData.instrumentValidity || ""}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Medical Validity"
              variant="outlined"
              fullWidth
              value={formData.medicalValidity || ""}
              disabled
            />
          </Grid>
        </Grid>

        {/* -- Operations section -- */}
        <Typography variant="h6" gutterBottom>
          Operations
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {[
            "initialQualification",
            "recurrent",
            "requalification",
            "specialQualification",
            "postRelease",
          ].map((item, index, array) => (
            <Grid
              item
              xs={12}
              sm={index === array.length - 1 ? "auto" : true}
              key={item}
              sx={{ flexGrow: index === array.length - 1 ? 1 : 0 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData[item] || false}
                    onChange={handleCheckChange}
                    name={item}
                  />
                }
                label={
                  item.charAt(0).toUpperCase() +
                  item.slice(1).replace(/[A-Z]/g, " $&")
                }
                sx={{
                  flexDirection: "column-reverse", // Flip the order so checkbox is on top
                  alignItems: "center", // Center-align the checkbox and label
                  width: "100%", // Take full width of the grid item
                  justifyContent:
                    index === array.length - 1 ? "flex-end" : "flex-start",
                }}
                labelPlacement="bottom"
              />
            </Grid>
          ))}
        </Grid>

        <Grid
      container
      spacing={2}
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      {[
        "ftd",
        "sim",
        "aircraft",
        "line",
        "area_route_qual",
      ].map((item, index, array) => (
        <Grid
          item
          xs={12}
          sm={index === array.length - 1 ? "auto" : true}
          key={item}
          sx={{ flexGrow: index === array.length - 1 ? 1 : 0 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={formData[item] || false}
                onChange={(event) => handleCheckChangeSecond(event, item)}
                name={item}
              />
            }
            label={formatLabel(item)}
            sx={{
              flexDirection: "column", // Checkbox above the label
              alignItems: "center", // Center-align the checkbox and label
              width: "100%", // Take full width of the grid item
              justifyContent:
                index === array.length - 1 ? "flex-end" : "flex-start",
            }}
            labelPlacement="bottom"
          />
        </Grid>
      ))}
    </Grid>

    <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Registration"
              fullWidth
              value={formData.reg || ""}
              onChange={handleInputChange}
              name="reg" // Ensure the name matches your formData structure
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Route/Local"
              fullWidth
              value={formData.routeLocal || ""}
              onChange={handleInputChange}
              name="routeLocal" // Ensure the name matches your formData structure
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Session"
              fullWidth
              value={formData.session || ""}
              onChange={handleInputChange}
              name="session" // Ensure the name matches your formData structure
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Sim Validity"
              fullWidth
              value={formData.simValidity || ""}
              onChange={handleInputChange}
              name="simValidity" // Ensure the name matches your formData structure
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PilotInfoSection;

