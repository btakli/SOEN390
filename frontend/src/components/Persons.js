import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPersons, deletePerson } from '../redux/actions/personActions';
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

function Persons(props) {
  useEffect(() => {
    props.getPersons();
  }, []);

  return (
    <Fragment>
        <h1>
            Persons
        </h1>
        <TableContainer component={Paper}  sx={{ width: 2/3, margin: 'auto'}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>First</TableCell>
                <TableCell>Last</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>DOB</TableCell>
                <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.persons.map((row) => (
                <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.first_name}</TableCell>
                    <TableCell>{row.last_name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.date_of_birth}</TableCell>
                    <TableCell>
                    <Button variant="contained" color="error" onClick={() => props.deletePerson(row.id)}>
                        Delete
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

Persons.propTypes = {
  persons: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  persons: state.personReducer.persons,
  getPersons: PropTypes.func.isRequired,
  deletePerson: PropTypes.func.isRequired
});

export default connect(mapStateToProps, { getPersons, deletePerson })(Persons);
