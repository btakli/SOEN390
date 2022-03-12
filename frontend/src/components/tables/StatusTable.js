import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
  
const zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]); 

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

    const [statusData, setStatusData] = useState(extractStatus(props.latestStatus));

    useEffect(() => {
        setStatusData(extractStatus(props.latestStatus));
    }, [props.latestStatus]);

    console.log(zip(statusFields, statusData));

    if(!props.latestStatus.patient){
        return (
            <Typography variant="h3" component="div" align="center" sx={{ my: 3}}>
                No Status Available!
            </Typography>
        );
    } else {
        return (
            <Fragment>
                <Typography variant="h3" component="div" align="center" sx={{ my: 3}}>
                    Latest Status
                </Typography>
                <TableContainer component={Paper}  sx={{ width: "100%", margin: 'auto', my: 6}}>
                    <Table sx={{ minWidth: "sm" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Fields</TableCell>
                            <TableCell>Data</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {zip(statusFields, statusData).map((item, i) => (
                            <TableRow
                                key={i+"0"}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell key={i+"1"}>{item[0]}</TableCell>
                                <TableCell key={i+"2"}>{
                                    (item[1]) ?
                                        ((typeof item[1].val === 'string') ?
                                            item[1].val 
                                            : ((item[1].val) ? <CheckCircleOutlineIcon color='success'/>
                                                : <HighlightOffIcon color='error'/> ))
                                        : ""
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
            </Fragment>
        );
    }

    
}

StatusTable.propTypes = {
    latestStatus: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    latestStatus: state.statusReducer.latestStatus
});

export default connect(mapStateToProps)(StatusTable);
