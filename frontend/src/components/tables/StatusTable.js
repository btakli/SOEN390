import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLatestStatus } from '../../redux/actions/statusActions';
import { useEffect, Fragment } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function StatusTable(props) {
  useEffect(() => {
    console.log("HEEEREREEE");
    props.getLatestStatus();
    
  }, []);

  return (
    <Fragment>
        <h1>
            Latest Status
        </h1>
        <TableContainer component={Paper}  sx={{ width: 2/3, margin: 'auto'}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>First</TableCell>
                <TableCell>Last</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>DOB</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.status.latest.map((row) => (
                <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.first_name}</TableCell>
                    <TableCell>{row.last_name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.date_of_birth}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    </Fragment>
  );
}

StatusTable.propTypes = {
    status: PropTypes.object.isRequired,
    getLatestStatus: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    status: state.statusReducer
  });

export default connect(mapStateToProps, { getLatestStatus })(StatusTable);
