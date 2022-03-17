// For testing props see https://testing-library.com/docs/react-testing-library/api/#rerender

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";

import DoctorLogin from "../pages/auth/DoctorLogin";
import DoctorSignUp from "../pages/auth/DoctorSignUp";
import PatientLogin from "../pages/auth/PatientLogin";
import PatientSignUp from "../pages/auth/PatientSignUp";
import PreLogin from "../pages/auth/PreLogin";

test("renders without error", () => {
  render(
    <Provider store={store}>
      <Router>
        <DoctorLogin />
      </Router>
    </Provider>
  );
});

test("renders without error", () => {
  render(
    <Provider store={store}>
      <Router>
        <DoctorSignUp />
      </Router>
    </Provider>
  );
});

test("renders without error", () => {
  render(
    <Provider store={store}>
      <Router>
        <PatientLogin />
      </Router>
    </Provider>
  );
});

test("renders without error", () => {
  render(
    <Provider store={store}>
      <Router>
        <PatientSignUp />
      </Router>
    </Provider>
  );
});

test("renders without error", () => {
  render(
    <Provider store={store}>
      <Router>
        <PreLogin />
      </Router>
    </Provider>
  );
});
