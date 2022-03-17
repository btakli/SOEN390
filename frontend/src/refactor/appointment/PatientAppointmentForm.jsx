//needs to be dynamic to incorporate changes from doctor's availabilities
import React, { Component } from "react";

import { AppointmentPicker } from "react-appointment-picker";


export default class PatientAppointmentForm extends Component {
  state = {
    loading: false,
    continuousLoading: false,
  };


  //allows patient to select an available slot appointment slot and makes it unavailable to be selected again
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

  // allows user to deselect an appointment slot and makes the slot available again
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

  // generates the days the doctor is available
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

    //displays the doctor's availabilties and implements the functions to book appointment
    return (
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 15}}>
        <h1>Appointment Availibilities</h1>
      
        <AppointmentPicker
          addAppointmentCallback={this.addAppointmentCallback}
          removeAppointmentCallback={this.removeAppointmentCallback}
          initialDay={new Date(timeHour)}
          days={days}
          maxReservableAppointments={1}
          visible
          unitTime = {12 * 60 * 1000}
          selectedByDefault
          loading={loading}
        />

         
      </div>
    );
  }
}