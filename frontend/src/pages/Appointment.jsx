import React, { Component } from "react";

import { AppointmentPicker } from "react-appointment-picker";

import Button from '@mui/material/Button';

import Calendar from "./src/components/Calendar";




export default class Appointment extends Component {
  state = {
    loading: false,
    continuousLoading: false,
  };



  //to do
  setRestrictions = ({restriction : { day, number, time, id }, addCb }) => {
    this.setState(
      {
        isReserved: true
      },
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log(
          `Added appointment ${number}, day ${day}, time ${time}, id ${id}`
        );
        addCb(day, number, time, id);
        this.setState({ isReserved: true });
      }
    );

  };

  addAppointmentCallback = ({
    addedAppointment: { day, number, time, id }, addCb }) => {
    this.setState(
      {
        loading: true
      },
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log(
          `Added appointment ${number}, day ${day}, time ${time}, id ${id}`
        );
        addCb(day, number, time, id);
        this.setState({ loading: false });
      }
    );
  };

  removeAppointmentCallback = ({ day, number, time, id }, removeCb) => {
    this.setState(
      {
        loading: true
      },
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log(
          `Removed appointment ${number}, day ${day}, time ${time}, id ${id}`
        );
        removeCb(day, number);
        this.setState({ loading: false });
      }
    );
  };

 

  render() {
    const days = [
      [
        { id: 9, number: 1, isReserved: true, periods: 5 },
        { id: 10, number: 2, isReserved: true, periods: 5 },
        { id: 11, number: 3, isReserved: true, periods: 5 },
        { id: 12, number: 4, isReserved: true,  periods: 5 },
        { id: 13, number: 5, isReserved: true,  periods: 5 }
      ],
      [
        { id: 9, number: 1, periods: 5 },
        { id: 10, number: 2, periods: 5 },
        { id: 11, number: 3, isReserved: true, periods: 5 },
        { id: 12, number: 4, periods: 5 },
        { id: 13, number: 5, isReserved: true,  periods: 5 }
      ],
      [
        { id: 9, number: 1, periods: 5 },
        { id: 10, number: 2, periods: 5 },
        { id: 11, number: 3, isReserved: true, periods: 5 },
        { id: 12, number: 4, periods: 5 },
        { id: 13, number: 5, isReserved: true,  periods: 5 }
      ],
      [
        { id: 13, number: 1, periods: 5 },
        { id: 14, number: 2, periods: 5 },
        { id: 15, number: 3, isReserved: true, periods: 5 },
        { id: 16, number: 4, periods: 5 },
        { id: 17, number: 5, periods: 5 }
      ],
      [
        { id: 9, number: 1, periods: 5 },
        { id: 10, number: 2, periods: 5 },
        { id: 11, number: 3, isReserved: true, periods: 5 },
        { id: 12, number: 4, periods: 5 },
        { id: 13, number: 5,  periods: 5 }
      ],
      [
        { id: 21, number: 1, isReserved: true, periods: 5 },
        { id: 22, number: 2, isReserved: true, periods: 5 },
        { id: 23, number: 3, isReserved: true, periods: 5 },
        { id: 24, number: 4, isReserved: true, periods: 5 },
        { id: 25, number: 5, isReserved: true, periods: 5 }
      ],
      [
        { id: 21, number: 1, isReserved: true, periods: 5 },
        { id: 22, number: 2, isReserved: true, periods: 5 },
        { id: 23, number: 3, isReserved: true, periods: 5 },
        { id: 24, number: 4, isReserved: true, periods: 5 },
        { id: 25, number: 5, isReserved: true, periods: 5 }
      ]
    ];

    const { loading, continuousLoading } = this.state;
    const timeHour = new Date();
    timeHour.setHours(9,0); 
   


    return (
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 15}}>
        <h1>Appointment Availibilities</h1>

        <h2>Set Week</h2> 
        <div><Calendar/></div>
      
 

          <Button variant="contained" onClick={() => {
              this.setRestrictions(); 
            }}>
            Set Restrictions</Button>
      
        <AppointmentPicker
          addAppointmentCallback={this.addAppointmentCallback}
          removeAppointmentCallback={this.removeAppointmentCallback}
          initialDay={new Date(timeHour)}
          days={days}
          maxReservableAppointments={1}
          visible
          unitTime = {12 * 60 * 1000}
          selectedByDefault
          loading={loading}>
            </AppointmentPicker>
        

         
      </div>
    );
  }
}