import { React, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPatients } from '../../redux/actions/patientActions';

// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


function PatientTable(props) {
  useEffect(() => {
    props.getPatients();
  }, []);

  return (
    <TableContainer component={Paper}  sx={{ width: 2/3, margin: 'auto'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First</TableCell>
            <TableCell>Last</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>DOB</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.patients.map((patient) => (
          <TableRow
              key={patient.user}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
              <TableCell>{patient.first_name}</TableCell>
              <TableCell>{patient.last_name}</TableCell>
              <TableCell>{patient.email}</TableCell>
              <TableCell>{patient.date_of_birth}</TableCell>
              <TableCell>                  
              <Button variant="contained" color="success" /* CHANGE THIS   onClick={() => props.showStatusPerson(row.id)}   */>
                  See Status
              </Button>
              </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

PatientTable.propTypes = {
  patients: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  patients: state.patientReducer.patients
});

export default connect(mapStateToProps, { getPatients })(PatientTable);
