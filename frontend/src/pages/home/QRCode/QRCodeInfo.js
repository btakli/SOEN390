import { React, Fragment, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { getPatients } from "../../../redux/actions/patientActions";
import { getLatestStatus } from "../../../redux/actions/statusActions";

import PropTypes from "prop-types";

// MUI
import { Typography, Card, CardContent, Divider } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ErrorIcon from "@mui/icons-material/Error";

function QRCodeInfo(props) {
  let navigate = useNavigate();

  // TODO : Swap if statement after immigration push

  if (props.auth.userData.is_doctor) {
    // history.pushState();
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" align="left" gutterBottom component="div">
            You must be logged in as a Doctor to view patient information
          </Typography>
        </CardContent>
      </Card>
    );
  }

  // if (!props.auth.userData.is_doctor && !props.auth.userData.is_immigration) {
  //   navigate
  // }

  var patientId;

  useEffect(() => {
    props.getPatients();
    props.getLatestStatus(patientId);
  }, [patientId]);

  const { patient_uri } = useParams();
  try {
    var patientId = atob(atob(patient_uri));
    var patient = props.patients.find((patient) => patient.user == patientId);

    if (patient == undefined) {
      throw error;
    }
  } catch (error) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" align="left" gutterBottom component="div">
            Invalid Patient URI
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" align="left" gutterBottom component="div">
          {patient.first_name}'s Information
        </Typography>
        <Divider />
        <Typography
          m={3}
          pt={0}
          variant="h5"
          align="left"
          gutterBottom
          component="div"
        >
          Status: {props.status.status}
          {props.status.status === "Infected" && <ErrorIcon />}
        </Typography>
        <Typography m={3} pt={2} variant="h5" align="left">
          <Fragment>
            <TableContainer
              component={Paper}
              sx={{ width: 2 / 3, margin: "auto" }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>First</TableCell>
                    <TableCell>Last</TableCell>
                    <TableCell>DOB</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    key={patient.user}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{patient.first_name}</TableCell>
                    <TableCell>{patient.last_name}</TableCell>
                    <TableCell>{patient.date_of_birth}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Fragment>
        </Typography>
      </CardContent>
    </Card>
  );
}

QRCodeInfo.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  patients: state.patientReducer.patients,
  status: state.statusReducer.latestStatus,
});

export default connect(mapStateToProps, { getPatients, getLatestStatus })(
  QRCodeInfo
);
