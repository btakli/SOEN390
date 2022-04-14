import React, { Fragment, useState, useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAvailabilities } from "../../redux/actions/availabilityActions";

import moment from "moment";

// MUI
import {
    Box,
    Checkbox,
    Grid,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    InputLabel,
    MenuItem,
    Select
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

function AppointmentForm(props){    
      // Store form data in state
      const [avail, setAvail] = useState([]);

      useEffect(() => {
        props.getAvailabilities();
      }, []);
    
      useEffect(() => {
        setAvail(convertAvailabilityFromDatabase(props.avails));
      }, [props.avails]);

    // Change form data in state at each change
    const handleChange = (e) => {
        //in order for the checkbox value to be recognized, this line is mandatory
        // const value =
        // e.target.type === "checkbox" ? e.target.checked : e.target.value;
        // setState((prevState) => ({
        // ...prevState,
        // [e.target.name]: value,
        // }));
    };

    const onSubmit = (e) => {
        // e.preventDefault();
        // props.addStatus(state);
    
        // if(state.status == 'Infected'){
        //   props.getAtRiskPatients();
        // }
    
        // window.scrollTo(0, 0);
      };

      return (
        <Fragment>
            <h1>
                Doctor Availabilites
            </h1>
            <Box
                component="form"
                onSubmit={onSubmit}
                sx={{ width: "40%", pb: 10 }}
            >
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
                                                {/* <Checkbox
                                                labelid="checked"
                                                id="checked"
                                                name={symptoms.value}
                                                checked={state[symptoms.value]}
                                                onChange={handleChange}
                                                ></Checkbox> */}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ))
                            ))
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>

                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                SAVE
                </Button>
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

export default connect(mapStateToProps, { getAvailabilities })(AppointmentForm);