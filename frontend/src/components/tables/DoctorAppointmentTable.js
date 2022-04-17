import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAppointments, deleteAppointment } from '../../redux/actions/appointmentActions';
import { getPatients } from '../../redux/actions/patientActions';
import { createMessage } from "../../redux/actions/messageActions";
import { addNotification } from "../../redux/actions/notifActions";

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

        const start_date = new Date(a["start"].slice(0, -1));
        const end_date = new Date(a["end"].slice(0, -1));
        const day = start_date.getDate();
        const year = start_date.getFullYear();
        const month = start_date.toLocaleString('default', { month: 'long' });
        const start_time = `${start_date.getHours()}:${start_date.getMinutes() <= 9 ? '0' + start_date.getMinutes() : start_date.getMinutes()}`;
        const end_time = `${end_date.getHours()}:${end_date.getMinutes() <= 9 ? '0' + end_date.getMinutes() : end_date.getMinutes()}`;

        const adata = {
            "name": `${p["first_name"]} ${p["last_name"]}`,
            "date": `${month} ${day}, ${year}`,
            "time": `${start_time} - ${end_time}`,
            "id": a["id"],
            "patient_id": a["patient"]
        }

        aList.push(adata);
    }
    return aList;
}

const getFormattedDate = (date) => {
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const time = `${date.getHours()}:${date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes()}`;

    return (`${month} ${day}, ${year} @ ${time}`);
};

function DoctorAppointmentTable(props) {

    const [appointmentData, setAppointmentData] = useState([]);

    useEffect(() => {
        props.getPatients();
    }, []);

    useEffect(() => {
        props.getAppointments();
    }, []);

    useEffect(() => {
        if (props.patients.length > 0){
            setAppointmentData(generateAppointmentList(props.appointments, props.patients));
        }
    }, [props.appointments, props.patients]);

    const removeAppointment = (id, p_id) => {
        props.deleteAppointment(id);
        props.createMessage({ cancelAppointment: "Appointment Cancelled" });
        props.addNotification({
            type: "Appointment",
            user: p_id,
            subject: "Appointment Cancelled",
            message: `[${getFormattedDate(new Date())}] Dr. ${props.auth.userData["first_name"]} ${props.auth.userData["last_name"]} has cancelled an appointment.`
        });
    }

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
                            <TableCell>Patient</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell></TableCell>
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
                                <TableCell key={i+"3"}>{item["time"]}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="error" onClick={() => removeAppointment(item["id"], item["patient_id"])}>
                                        Cancel
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

DoctorAppointmentTable.propTypes = {
    auth: PropTypes.object.isRequired,
    patients: PropTypes.array.isRequired,
    appointments: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    auth: state.authReducer,
    patients: state.patientReducer.patients,
    appointments: state.appointmentReducer.appointments
});

export default connect(mapStateToProps, { getPatients, getAppointments, deleteAppointment, createMessage, addNotification })(DoctorAppointmentTable);
