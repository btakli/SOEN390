// This is used for Doctors, Health staff, and Immigration officers only that displays their
// assigned patients' names, status, symptoms, and priority. 
//new patient list with symptoms, priority and appointment date

import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './src/components/layout/Title';

import PriorityToggle  from './src/components/PriorityToggle';
import SetDateTimeAppointment from "./components/SetDateTimeAppointment"; 


// Generate patient data (status and symptoms)
function createData(id, firstName, lastName, status, symptoms, priorityFlag, appointment) {
  return { id, firstName, lastName, status, symptoms, priorityFlag, appointment};
}



// data to be populated to appear in the list of patients.
// below is an example
const rows = [
  createData(
    0,
    'John',
    'Doe',
    'Infected',
    'Fever, Chills',
    <PriorityToggle/>,
    <SetDateTimeAppointment/>
  ),
  createData(
    1,
    'Muffy',
    'Crosswire',
    'Infected',
    'Fever, Chills, SOB',
    <PriorityToggle/>,
    <SetDateTimeAppointment/>
  ),
  createData(
    2,
    'Lee',
    'Smeed',
    'Recovered',
    '',
    <PriorityToggle/>,
    <SetDateTimeAppointment/>
  ), createData(
    3,
    'Christopher',
    'Smith',
    'Healthy',
    '',
    <PriorityToggle/>,
    <SetDateTimeAppointment/>
  ), createData(
    4,
    'John',
    'Economos',
    'Healthy',
    '',
    <PriorityToggle/>,
    <SetDateTimeAppointment/>
  ), createData(
    5,
    'Leota',
    'Adebayo',
    'Infected',
    'Cough',
    <PriorityToggle/>,
    <SetDateTimeAppointment/>
  ),
  createData(
    5,
    'Clemens',
    'Murn',
    'Healthy',
    '',
    <PriorityToggle/>,
    <SetDateTimeAppointment/>
  ),
  createData(
    5,
    'Sophie',
    'Song',
    'Healthy',
    '',
    <PriorityToggle/>,
    <SetDateTimeAppointment/>
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function PatientListDisplay() {
  return (
    <React.Fragment>
      <Title>Patient List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Symptoms</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Appointment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.symptoms}</TableCell>
              <TableCell>{row.priorityFlag}</TableCell>
              <TableCell>{row.appointment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more patients
      </Link>
    </React.Fragment>
  );
}
