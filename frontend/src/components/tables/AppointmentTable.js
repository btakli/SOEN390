import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAppointments, deleteAppointment } from '../../redux/actions/appointmentActions';
import { getPatients } from '../../redux/actions/patientActions';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';

function generateAppointmentList(appointments, patients) {
    let aList = [];

    for (const a of appointments){
        
        const p = patients.find(({ user }) => user === a["patient"]);

        const adata = {
            "name": p["first_name"].concat(" ", p["last_name"]),
            "date": new Date(a["date"]).toLocaleDateString(),
            "id": a["id"]
        }

        aList.push(adata);
    }
    return aList;
}

function AppointmentsTable(props) {

    const [appointmentData, setAppointmentData] = useState([]);

    useEffect(() => {
        props.getPatients();
    }, []);

    useEffect(() => {
        props.getAppointments();
    }, []);

    useEffect(() => {
        setAppointmentData(generateAppointmentList(props.appointments, props.patients));
    }, [props.appointments, props.patients]);

    if(props.appointments.length == 0){
        return (
            <Typography variant="h3" component="div" align="center" sx={{ my: 3}}>
                No Appointments!
            </Typography>
        );
    } else {
        return (
            <Fragment>
                <Typography variant="h3" component="div" align="center" sx={{ my: 3}}>
                    Appointments
                </Typography>
                <TableContainer component={Paper}  sx={{ width: "100%", margin: 'auto', my: 6}}>
                    <Table sx={{ minWidth: "sm" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Patients</TableCell>
                            <TableCell>Appointment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointmentData.map((item, i) => (
                            <TableRow
                                key={i+"0"}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell key={i+"1"}>{item["name"]}</TableCell>
                                <TableCell key={i+"2"}>{item["date"]}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="error" onClick={() => props.deleteAppointment(item["id"])}>
                                        Remove
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
}

AppointmentsTable.propTypes = {
    patients: PropTypes.array.isRequired,
    appointments: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    patients: state.patientReducer.patients,
    appointments: state.appointmentReducer.appointments
});

export default connect(mapStateToProps, { getPatients, getAppointments, deleteAppointment })(AppointmentsTable);
