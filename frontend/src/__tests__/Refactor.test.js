// For testing props see https://testing-library.com/docs/react-testing-library/api/#rerender

import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";

// npm install resize-observer
import { install } from "resize-observer";

import Calendar from "../refactor/appointment/Calendar";
import DoctorAppointment from "../refactor/appointment/DoctorAppointment";
import PatientAppointmentForm from "../refactor/appointment/PatientAppointmentForm";

import SetDateTimeAppointment from "../refactor/patientTable/SetDateTimeAppointment";

install();

test("renders without error", () => {
  render(
    <Provider store={store}>
      <Calendar />
    </Provider>
  );
});

test("renders without error", () => {
  render(
    <Provider store={store}>
      <DoctorAppointment />
    </Provider>
  );
});

test("renders without error", () => {
  render(
    <Provider store={store}>
      <PatientAppointmentForm />
    </Provider>
  );
});

test("renders without error", () => {
  render(
    <Provider store={store}>
      <SetDateTimeAppointment />
    </Provider>
  );
});
