import React, { useState } from "react";
import moment from "moment";

import { 
    IconButton,
    Grid,
    Card,
    Button,
    CircularProgress,
    Popover,
    Typography
} from '@mui/material';

import { ArrowLeft, ArrowRight } from "@mui/icons-material";

const CalendarTemplate = ({
  availability,
  setAvailability,
  startTime = "8:00",
  endTime = "20:00",
}) => {

  const useMonths = (year) => ({
    1: {
      lastDay: 31,
      month: "January",
      firstDay: moment(`01/01/${year}`, 'MM/DD/YYYY', true),
    },
    2: {
      lastDay: year % 4 === 0 ? 29 : 28,
      month: "February",
      firstDay: moment(`02/01/${year}`, 'MM/DD/YYYY', true),
    },
    3: {
      lastDay: 31,
      month: "March",
      firstDay: moment(`03/01/${year}`, 'MM/DD/YYYY', true),
    },
    4: {
      lastDay: 30,
      month: "April",
      firstDay: moment(`04/01/${year}`, 'MM/DD/YYYY', true),
    },
    5: {
      lastDay: 31,
      month: "May",
      firstDay: moment(`05/01/${year}`, 'MM/DD/YYYY', true),
    },
    6: {
      lastDay: 30,
      month: "June",
      firstDay: moment(`06/01/${year}`, 'MM/DD/YYYY', true),
    },
    7: {
      lastDay: 31,
      month: "July",
      firstDay: moment(`07/01/${year}`, 'MM/DD/YYYY', true),
    },
    8: {
      lastDay: 31,
      month: "August",
      firstDay: moment(`08/01/${year}`, 'MM/DD/YYYY', true),
    },
    9: {
      lastDay: 30,
      month: "September",
      firstDay: moment(`09/01/${year}`, 'MM/DD/YYYY', true),
    },
    10: {
      lastDay: 31,
      month: "October",
      firstDay: moment(`10/01/${year}`, 'MM/DD/YYYY', true),
    },
    11: {
      lastDay: 30,
      month: "November",
      firstDay: moment(`11/01/${year}`, 'MM/DD/YYYY', true),
    },
    12: {
      lastDay: 31,
      month: "December",
      firstDay: moment(`12/01/${year}`, 'MM/DD/YYYY', true),
    },
  });

  const getDefaultTimes = () => {
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

  function getDaysArray() {
    return [
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
    ];
  }

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

  const convertAvailabilityForDatabase = (availability) => {
    const output = [];
    for (let year in availability) {
      for (let month in availability[year]) {
        for (let day in availability[year][month]) {
          let activeDay = availability[year][month][day];
          addActiveDayToOutput(activeDay, output, month, day, year);
        }
      }
    }

    return output;
  };

  const combineTimeArrays = (a, b) => {
    for (let i = 0; i < a.length; i++) {
      a[i].available = a[i].available || b[i].available;
    }
    return a;
  };

  function addActiveDayToOutput(activeDay, output, month, day, year) {
    let activeRangeStart = null;
    for (let time of activeDay) {
      if (time.available && !activeRangeStart) activeRangeStart = time.time;
      else if (!time.available && activeRangeStart) {
        let start = new Date(`${month} ${day} ${year} ${activeRangeStart}`);
        start.setHours(start.getHours() - start.getTimezoneOffset() / 60);
        let end = new Date(`${month} ${day} ${year} ${time.time}`);
        end.setHours(end.getHours() - end.getTimezoneOffset() / 60);
        output.push({
          start: start.toJSON(),
          end: end.toJSON(),
        });
        activeRangeStart = null;
      }
    }
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

  function makeQuickAvailability(availability) {
    const output = {};
    for (let range of availability) {
      if (new Date(range.start) > new Date()) {
        let day = moment(range.start).format("MMMM D, YYYY");
        let time = `${moment(range.start).format("H:mm")} - ${moment(
          range.end
        ).format("H:mm")}`;
        if (output[day]) {
          output[day].push(time);
        } else {
          output[day] = [time];
        }
      }
    }
    return output;
  };

  return function Calendar() {
    const classes = {
      button: {
        minWidth: 200,
        mx: 2,
        my: 2,
      },
      buttonNoMargin: {
        minWidth: 200,
      },
      date:{
        minWidth: '45px',
      }
    };

    const today = moment();

    // STATES
    const [availabilityState, setAvailabilityState] = useState(
      convertAvailabilityFromDatabase(availability)
    );
    const [quickAvailability, setQuickAvailability] = useState(
      makeQuickAvailability(availability)
    );
    const [activeDay, setActiveDay] = useState(null);
    const [year, setYear] = useState(Number(today.format("YYYY")));
    const [monthNumber, setMonthNumber] = useState(Number(today.format("M")));
    const [settingMultiple, setSettingMultiple] = useState(false);
    const months = useMonths(year);
    const { firstDay, month, lastDay } = months[monthNumber];
    let dayOfWeek = Number(moment(firstDay).format("d"));
    const days = getDaysArray();
    const [times, setTimes] = useState(getDefaultTimes());
    const [saving, setSaving] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverContent, setPopoverContent] = useState(null);

    let week = 0;
    let dayOfMonth = 1;

    while (week < 6 && dayOfMonth <= lastDay) {
      days[week][dayOfWeek] = dayOfMonth;
      dayOfMonth++;
      dayOfWeek++;
      if (dayOfWeek === 7) {
        week++;
        dayOfWeek = 0;
      }
    }

    const createArrowHandler = (delta) => () => {
      let newMonth = monthNumber + delta;
      if (newMonth > 12) {
        setYear(year + 1);
        newMonth = 1;
      } else if (newMonth < 1) {
        setYear(year - 1);
        newMonth = 12;
      }
      setActiveDay(null);
      setTimes(getDefaultTimes());
      setMonthNumber(newMonth);
    };

    const createTimeHandler = (i) => () => {
      const newTimes = [...times];
      newTimes[i].available = !newTimes[i].available;
      if (activeDay) {
        addTimeToDay(newTimes);
      }
      setTimes(newTimes);
    };

    const createDayHandler = (day) => () => {
      if (settingMultiple) {
        addTimesToDay(day);
      } else {
        examineAvailabilityForDay(day);
      }
    };

    const handleSetMultiple = () => {
      setActiveDay(null);
      setSettingMultiple(!settingMultiple);
    };

    const handleSaveAvailability = () => {
      const data = convertAvailabilityForDatabase(availabilityState);
      setSaving(true);
      setAvailability(data);
    };

    const handleJumpToCurrent = () => {
      setYear(Number(today.format("YYYY")));
      setMonthNumber(Number(today.format("M")));
      setActiveDay(null);
      setTimes(getDefaultTimes());
    };
    
    const handleOpenPopover = (date) => {
      return (e) => {
        if (quickAvailability[date]) {
          setPopoverContent(
            quickAvailability[date].map((time, i) => <Typography key={i} >{time}</Typography>)
          );
          setAnchorEl(e.target);
        }
      };
    };

    const handleClosePopover = () => {
      setAnchorEl(null);
      setPopoverContent(null);
    };

    return (
      <Grid
        container
        direction="column"
        alignItems="center"
      >
        <Grid item>
          <Grid container direction="row" alignItems="center" justify="center">

            <Grid item>
              <IconButton
                disabled={
                  year === Number(today.format("YYYY")) &&
                  month === today.format("MMMM")
                }
                onClick={createArrowHandler(-1)}
              >
                <ArrowLeft />
              </IconButton>
            </Grid>

            {/* CALENDAR */}
            <Grid item>
              <Card style={{ padding: 10, margin: 10 }} variant="outlined">
                <Grid container direction="column" alignItems="center">
                  <h3>
                    {month} {year}
                  </h3>
                  {days.map((week, i) => (
                    <Grid key={i} item>
                      <Grid container direction="row">
                        {week.map((day, i) => (
                          <Grid key={year + month + i} item>
                            <IconButton
                              style={classes.date}
                              onClick={createDayHandler(day)}
                              color={
                                activeDay === day
                                  ? "primary"
                                  : availabilityState[year] &&
                                    availabilityState[year][month] &&
                                    availabilityState[year][month][day] &&
                                    availabilityState[year][month][
                                      day
                                    ].filter((x) => x.available).length > 0
                                  ? "secondary"
                                  : "default"
                              }
                              disabled={
                                !day ||
                                (year === Number(today.format("YYYY")) &&
                                  month === today.format("MMMM") &&
                                  day < Number(today.format("D")))
                              }
                              size="medium"
                              onMouseEnter={handleOpenPopover(
                                `${month} ${day}, ${year}`
                              )}
                              onMouseLeave={handleClosePopover}
                            >
                              {day}
                            </IconButton>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  ))}

                  <Popover
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    sx={{ pointerEvents: "none" }}
                    anchorEl={anchorEl}
                    open={!!anchorEl}
                  >
                    {popoverContent}
                  </Popover>

                  <Button
                    disabled={
                      year === Number(today.format("YYYY")) &&
                      month === today.format("MMMM")
                    }
                    onClick={handleJumpToCurrent}
                    sx={classes.buttonNoMargin}
                  >
                    Jump to Current Month
                  </Button>
                </Grid>
              </Card>
            </Grid>

            <Grid item>
              <IconButton onClick={createArrowHandler(1)}>
                <ArrowRight />
              </IconButton>
            </Grid>

            {/* HOUR BUTTONS */}
            <Grid item>
              <Grid container justify="center" alignItems="center" wrap="wrap">
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    wrap="wrap"
                  >
                    {times.map(
                      (time, i) =>
                        i < times.length - 7 && (
                          <Button
                              key={time.time}
                              onClick={createTimeHandler(i)}
                              color={time.available ? "primary" : "info"}
                              sx={classes.button}
                              variant={time.available ? "contained" : "outlined"}
                              >
                              {time.time} - {times[i + 1].time}
                          </Button>
                        )
                    )}
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    wrap="wrap"
                  >
                    {times.map(
                      (time, i) =>
                        i < times.length - 1 &&
                        i > 5 && (
                          <Button
                              key={time.time}
                              onClick={createTimeHandler(i)}
                              color={time.available ? "primary" : "info"}
                              sx={classes.button}
                              variant={time.available ? "contained" : "outlined"}
                          >
                              {time.time} - {times[i + 1].time}
                          </Button>
                        )
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container direction="row" alignItems="center" justify="center">
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={handleSetMultiple}
                sx={classes.button}
              >
                {settingMultiple
                  ? "Done"
                  : "Add Selected Times to Multiple Days"}
              </Button>

            </Grid>

            <Grid item>
              {saving ? (
                <CircularProgress />
              ) : (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleSaveAvailability}
                  sx={classes.button}
                >
                  Save Availability
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );

    function addTimeToDay(newTimes) {
      const newAvail = availabilityState;
      if (newAvail.hasOwnProperty(year)) {
        if (newAvail[year].hasOwnProperty(month)) {
          newAvail[year][month][activeDay] = newTimes;
        } else {
          newAvail[year][month] = {
            [activeDay]: newTimes,
          };
        }
      } else {
        newAvail[year] = {
          [month]: {
            [activeDay]: newTimes,
          },
        };
      }
      setAvailabilityState(newAvail);
      setQuickAvailability(
        makeQuickAvailability(convertAvailabilityForDatabase(newAvail))
      );
    };

    function examineAvailabilityForDay(day) {
      if (
        availabilityState[year] &&
        availabilityState[year][month] &&
        availabilityState[year][month][day]
      ) {
        setTimes(availabilityState[year][month][day]);
      } else {
        setTimes(getDefaultTimes());
      }
      setActiveDay(day);
    };

    function addTimesToDay(day) {
      const newAvail = { ...availabilityState };
      if (newAvail[year]) {
        if (newAvail[year][month]) {
          if (newAvail[year][month][day]) {
            newAvail[year][month][day] = combineTimeArrays(
              newAvail[year][month][day],
              times
            );
          } else {
            newAvail[year][month][day] = times;
          }
        } else {
          newAvail[year][month] = {
            [day]: times,
          };
        }
      } else {
        newAvail[year] = {
          [month]: {
            [day]: times,
          },
        };
      }
      setAvailabilityState(newAvail);
      setQuickAvailability(
        makeQuickAvailability(convertAvailabilityForDatabase(newAvail))
      );
    };
    
  };
};

export default CalendarTemplate;