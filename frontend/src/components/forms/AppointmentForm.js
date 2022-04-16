import React, { Fragment, useState, useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAvailabilities } from "../../redux/actions/availabilityActions";
import { getAppointments, addAppointment } from "../../redux/actions/appointmentActions";
import { createMessage } from "../../redux/actions/messageActions";
import { addNotification } from "../../redux/actions/notifActions";

import moment from "moment";

// MUI
import {
    Box,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
  } from "@mui/material";

  const convertAvailabilityFromDatabase = (availability) => {
    const output = {};
    for (let range of availability) {
      let start = moment(range.start.slice(0, -1));
      let startTime = `${start.format("H")}:${start.format("mm")}`;
      let end = moment(range.end.slice(0, -1));
      let endTime = `${end.format("H")}:${end.format("mm")}`;
      let year = Number(start.format("YYYY"));
      let month = start.format("MMMM");
      let day = Number(start.format("D"));
      fillOutputWithDefaultTimes(output, year, month, day);
      let i = 0;
      while (
        i < output[year][month][day].length &&
        output[year][month][day][i].time !== startTime
      )
        i++;
      while (
        i < output[year][month][day].length &&
        output[year][month][day][i].time !== endTime
      ) {
        output[year][month][day][i].available = true;
        i++;
      }
    }

    return output;
  };

  function fillOutputWithDefaultTimes(output, year, month, day) {
    if (output.hasOwnProperty(year)) {
      if (output[year].hasOwnProperty(month)) {
        if (!output[year][month].hasOwnProperty(day)) {
          output[year][month][day] = getDefaultTimes();
        }
      } else {
        output[year][month] = {
          [day]: getDefaultTimes(),
        };
      }
    } else {
      output[year] = {
        [month]: {
          [day]: getDefaultTimes(),
        },
      };
    }
  };

  const getDefaultTimes = () => {
    const startTime = "8:00";
    const endTime = "20:00";

    const times = [
      {
        time: "0:00",
        available: false,
      },
      {
        time: "1:00",
        available: false,
      },
      {
        time: "2:00",
        available: false,
      },
      {
        time: "3:00",
        available: false,
      },
      {
        time: "4:00",
        available: false,
      },
      {
        time: "5:00",
        available: false,
      },
      {
        time: "6:00",
        available: false,
      },
      {
        time: "7:00",
        available: false,
      },
      {
        time: "8:00",
        available: false,
      },
      {
        time: "9:00",
        available: false,
      },
      {
        time: "10:00",
        available: false,
      },
      {
        time: "11:00",
        available: false,
      },
      {
        time: "12:00",
        available: false,
      },
      {
        time: "13:00",
        available: false,
      },
      {
        time: "14:00",
        available: false,
      },
      {
        time: "15:00",
        available: false,
      },
      {
        time: "16:00",
        available: false,
      },
      {
        time: "17:00",
        available: false,
      },
      {
        time: "18:00",
        available: false,
      },
      {
        time: "19:00",
        available: false,
      },
      {
        time: "20:00",
        available: false,
      },
      {
        time: "21:00",
        available: false,
      },
      {
        time: "22:00",
        available: false,
      },
      {
        time: "23:00",
        available: false,
      },
      {
        time: "0:00",
        available: false,
      },
    ];
    let include = false;
    return times.filter(time => {
      if (time.time === startTime) {
        include = true;
      }
      if (time.time === endTime) {
        include = false;
        return true;
      }
      return include;
    })
  };

  const getFormattedDate = (date) => {
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const time = `${date.getHours()}:${date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes()}`;

    return (`${month} ${day}, ${year} @ ${time}`);
  };

function AppointmentForm(props){    
  // Store form data in state
  const [avail, setAvail] = useState([]);

  useEffect(() => {
    props.getAvailabilities();
  }, []);

  useEffect(() => {
    setAvail(convertAvailabilityFromDatabase(props.avails));
  }, [props.avails]);

  const bookAppointment = (month, day, year, time1, time2) => {
    const month_n = new Date(`${month} ${day}, ${year} ${time1}`).getMonth()+1;

    const appData =  {
        "patient": props.auth.userData["user"],
        "doctor": props.auth.userData["doctor"],
        "start":`${year}-${month_n}-${day}T${time1}`,
        "end":`${year}-${month_n}-${day}T${time2}`
    }

    props.addAppointment(appData);
    props.getAppointments();
    props.createMessage({ bookAppointment: "Appointment Booked" });
    props.addNotification({
      type: "Appointment",
      user: props.auth.userData["doctor"],
      subject: "New Appointment Request",
      message: `[${getFormattedDate(new Date())}] Your patient ${props.auth.userData["first_name"]} ${props.auth.userData["last_name"]} has made an appointment request.`
    });
  }

  return (
    <Fragment>
        <h1>
            Book Appointment
        </h1>
        <Box sx={{ width: "80%", pb: 10 }}>
            <TableContainer component={Paper}>
            <Table
                size="small"
            >
                <TableHead sx={{ bgcolor: "#101F33", color: "#fff" }}>
                    <TableRow>
                        <TableCell sx={{ color: "#fff" }}>
                            Day
                        </TableCell>
                        <TableCell sx={{ color: "#fff" }}>
                            Time Slot
                        </TableCell>
                        <TableCell sx={{ color: "#fff" }}>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(avail).map(([year, months]) => (
                        Object.entries(months).map(([month, days]) => ( 
                            Object.entries(days).map(([day, hours]) => (
                                hours.map((hour, i) => (
                                    (hour.available) && 
                                    <TableRow
                                        key={`${month} ${day}, ${year} : ${hours[i].time}`}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {`${month} ${day}, ${year}`}
                                        </TableCell>
                                        <TableCell>
                                            {`${hours[i].time} - ${hours[i+1].time}`}
                                        </TableCell>
                                        <TableCell>
                                        <Button 
                                          size="small"
                                          variant="contained" 
                                          color="success" 
                                          onClick={() => bookAppointment(month, day, year, hours[i].time, hours[i+1].time)}
                                        >
                                            Book Now
                                        </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ))
                        ))
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Box>
    </Fragment> 
  ); 
}

AppointmentForm.propTypes = {
    auth: PropTypes.object.isRequired,
    avails: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.authReducer,
    avails: state.availabilityReducer.availabilities
});

export default connect(mapStateToProps, { getAvailabilities, getAppointments, addAppointment, createMessage, addNotification })(AppointmentForm);