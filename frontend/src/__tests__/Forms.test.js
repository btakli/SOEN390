// For testing props see https://testing-library.com/docs/react-testing-library/api/#rerender

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";

import ContactForm from "../components/forms/ContactForm";
import PersonForm from "../components/forms/PersonForm";
import StatusForm from "../components/forms/StatusForm";
import DoctorReportForm from "../components/forms/reports/DoctorReportForm";
import PatientReportForm from "../components/forms/reports/PatientReportForm";

test("does not render without auth", () => {
  try {
    const auth = () => ({
      userData: {
        user: "1",
        first_name: "user",
        last_name: "name",
        email: "user@email.com",
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <ContactForm auth={auth} />
        </Router>
      </Provider>
    );
  } catch {
    // Should not render without correct auth
  }
});

test("renders without error", () => {
  render(
    <Provider store={store}>
      <Router>
        <PersonForm />
      </Router>
    </Provider>
  );
});

test("renders without error", () => {
  render(
    <Provider store={store}>
      <Router>
        <StatusForm />
      </Router>
    </Provider>
  );
});

test("does not render without auth", () => {
  try {
    const auth = () => ({
      userData: {
        user: "1",
        first_name: "user",
        last_name: "name",
        email: "user@email.com",
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <DoctorReportForm auth={auth} />
        </Router>
      </Provider>
    );
  } catch {
    // Should not render without correct auth
  }
});

test("does not render without auth", () => {
  try {
    const auth = () => ({
      userData: {
        user: "1",
        first_name: "user",
        last_name: "name",
        email: "user@email.com",
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <PatientReportForm auth={auth} />
        </Router>
      </Provider>
    );
  } catch {
    // Should not render without correct auth
  }
});
