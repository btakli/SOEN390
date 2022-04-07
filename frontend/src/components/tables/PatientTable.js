import { React, Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPatients } from '../../redux/actions/patientActions';
import StatusViewRequest from '../StatusViewRequest';

import PriorityToggle from '../PriorityToggle';

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
  const [open, setOpen] = useState(false);
  const [patientId, setPatientId] = useState(0);

  const handleDialogOpen = (id) => {
    setPatientId(id);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    props.getPatients();
  }, []);

  return (
    <Fragment>
      <StatusViewRequest open={open} onClose={handleDialogClose} patientId={patientId} />
      <TableContainer component={Paper}  sx={{ width: 2/3, margin: 'auto'}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First</TableCell>
              <TableCell>Last</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>View Status</TableCell>
              <TableCell>Priority</TableCell>
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
                  <Button variant="contained" color="success" onClick={() => handleDialogOpen(patient.user)}>
                      See Status
                  </Button>
                </TableCell>
                <TableCell> <PriorityToggle value={patient.is_priority} id={patient.user} is_immigrant={false}/> </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}

PatientTable.propTypes = {
  patients: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  patients: state.patientReducer.patients
});

export default connect(mapStateToProps, { getPatients })(PatientTable);
