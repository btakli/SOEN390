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
  
const statusFields = [
    "Status",
    "Sore Throat",
    "Runny Nose",
    "Sneezing",
    "Cough",
    "Difficulty Breathing",
    "High Temperature",
    "Fever",
    "Chills",
    "Fatigue",
    "Muscle Ache",
    "Smell Or Taste Loss",
    "Headache",
    "Stomach Pain"
];

function extractStatus(latestStatus){
    let arr = [];
    for(const key in latestStatus){
        if(!(key === "id" || key === "date" || key === "patient")){
            const val = latestStatus[key];
            arr.push({key, val});
        }
    }
    return arr;
}

function StatusTable(props) {
    useEffect(() => {
        props.getLatestStatus();
    }, []);

    const statusResults = extractStatus(props.latestStatus);

    return (
        <Fragment>
            <h1>
                Latest Status
            </h1>
            <TableContainer component={Paper}  sx={{ width: 2/3, margin: 'auto', my: 6}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {statusFields.map((field) => (
                            <TableCell key={field}>{field}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                        key={props.latestStatus.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        {statusResults.map(({key,val}) => (
                            <TableCell key={key}>{val}</TableCell>
                        ))}
                    </TableRow>
                </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    );
}

StatusTable.propTypes = {
    latestStatus: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    latestStatus: state.statusReducer.latestStatus
  });

export default connect(mapStateToProps, { getLatestStatus })(StatusTable);
