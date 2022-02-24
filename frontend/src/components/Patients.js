import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { getPatients } from '../redux/actions/personActions';
import { useEffect, Fragment } from 'react';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

//dummy data
const patients  = [{ 
  'id':2,
  'first_name': 'Andrei',
  'last_name': 'Gro',
  'email': 'a@gmail.com',
  'date_of_birth' : 20

}, { 
  'id':3,
  'first_name': 'Peter',
  'last_name': 'Dlis',
  'email': 'g@gmail.com',
  'date_of_birth' : 22

}];


function Patients(props) {
  /*useEffect(() => {
    props.getPatients();
  }, []);*/


  return (
    <Fragment>
        <TableContainer component={Paper}  sx={{ width: 2/3, margin: 'auto'}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                {/*<TableCell>ID</TableCell>*/}
                <TableCell>First</TableCell>
                <TableCell>Last</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>DOB</TableCell>
                <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {/*props.*/patients.map((row) => (
                <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    {/*<TableCell>{row.first_name}</TableCell>*/}
                    <TableCell>{row.first_name}</TableCell>
                    <TableCell>{row.last_name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.date_of_birth}</TableCell>
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
    </Fragment>
  );
}

Patients.propTypes = {
  patients: PropTypes.array.isRequired
}

// CHANGE THIS
const mapStateToProps = state => ({
  patients: {},
  getPatients: PropTypes.func.isRequired
});

export default /*connect(mapStateToProps, { getPatients })*/(Patients);
