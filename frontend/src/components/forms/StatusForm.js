import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { addStatus, getAllStatus } from '../../redux/actions/statusActions';

// MUI
import Box from "@mui/material/Box";
import {
  Checkbox,
  Grid,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function getLatestStatus(statusArr) {
  let latestDate = new Date('2000');
  let latestStatus = {};

  statusArr.forEach( status => {
    const date = new Date(status.date);
    if(date > latestDate){
      latestDate = date;
      latestStatus = status;
    }
  });

  return latestStatus;
}

function isEmpty(obj) {
  for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
          return false;
  }
  return true;
}

function createData(name, value) {
  return { name, value };
}

const symptoms = [
  createData("Sore Throat", "soreThroat"),
  createData("Runny Nose", "runnyNose"),
  createData("Sneezing", "sneezing"),
  createData("Cough", "cough"),
  createData("Difficulty Breathing", "diffBreathing"),
  createData("High Temperature", "highTemp"),
  createData("Fever", "fever"),
  createData("Chills", "chills"),
  createData("Fatigue", "fatigue"),
  createData("Muscle Ache", "muscleAche"),
  createData("Smell Or Taste Loss", "smellOrTasteLoss"),
  createData("Headache", "headache"),
  createData("Stomach Pain", "stomachPain"),
];

function StatusForm(props) {
  const emptyForm = {
    status: "",
    soreThroat: false,
    runnyNose: false,
    sneezing: false,
    cough: false,
    diffBreathing: false,
    highTemp: false,
    fever: false,
    chills: false,
    fatigue: false,
    muscleAche: false,
    smellOrTasteLoss: false,
    headache: false,
    stomachPain: false,
  };

  // Store form data in state
  const [state, setState] = useState(emptyForm);

  // When page loads get all the Status from backend
  useEffect(() => {
    props.getAllStatus();
  }, []);

  // When latest status is loaded in, update the form to latest status
  useEffect(() => {
    if (props.allStatus.length != 0){
      const latestStatus = getLatestStatus(props.allStatus);
      setState((!isEmpty(latestStatus)) ? latestStatus : emptyForm);
    }
  }, [props.allStatus]);

  // Change form data in state at each change
  const handleChange = (e) => {
    //in order for the checkbox value to be recognized, this line is mandatory
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.addStatus(state);
    window.scrollTo(0, 0);
  };

  return (
    <Fragment>
      <h1>
          Update Status
      </h1>
      <Grid pt={5} container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4}>
          
          <Box component="form" onSubmit={onSubmit} sx={{ pb: 10 }}>
          
            <InputLabel id="status">Status</InputLabel>
            <Select
              fullWidth
              labelId="status"
              id="status"
              name="status"
              value={state.status}
              onChange={handleChange}
            >
              <MenuItem value={"Healthy"}>Healthy</MenuItem>
              <MenuItem value={"Infected"}>Infected</MenuItem>
              <MenuItem value={"Recovered"}>Recovered</MenuItem>
            </Select>
          </Box>
        </Grid>
      </Grid>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{ minWidth: 120, pb: 10 }}
      >
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead sx={{ bgcolor: "#101F33", color: "#fff" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>Symptoms</TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  Select If You Have
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {symptoms.map((symptoms) => (
                <TableRow
                  key={symptoms.value}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {symptoms.name}
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      labelid="checked"
                      id="checked"
                      name={symptoms.value}
                      checked={state[symptoms.value]}
                      onChange={handleChange}
                    ></Checkbox>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          SAVE
        </Button>
      </Box>
    </Fragment>
    
        
  );
}

StatusForm.propTypes = {
  addStatus: PropTypes.func.isRequired,
  allStatus: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  allStatus: state.statusReducer.allStatus
});

export default connect(mapStateToProps, { addStatus, getAllStatus })(StatusForm);
