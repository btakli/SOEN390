// For testing props see https://testing-library.com/docs/react-testing-library/api/#rerender

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";

import AddressForm from "../components/forms/AddressForm";
import AppointmentForm from "../components/forms/AppointmentForm";
import AvailabilityForm from "../components/forms/AvailabilityForm";
import ContactForm from "../components/forms/ContactForm";
import DoctorReportForm from "../components/forms/DoctorReportForm";
import EmergencyForm from "../components/forms/EmergencyForm";
import PatientReportForm from "../components/forms/PatientReportForm";
import PersonForm from "../components/forms/PersonForm";
import RapidTestForm from "../components/forms/RapidTestForm";
import StatusForm from "../components/forms/StatusForm";
import StatusViewRequestForm from "../components/forms/StatusViewRequestForm";

test("renders without error", () => {
  render(
    <Provider store={store}>
      <Router>
        <AddressForm />
      </Router>
    </Provider>
  );
});

test("renders without error", () => {
  render(
    <Provider store={store}>
      <Router>
        <AppointmentForm />
      </Router>
    </Provider>
  );
});

test("renders without error", () => {
  render(
    <Provider store={store}>
      <Router>
        <AvailabilityForm />
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
          <ContactForm auth={auth} />
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
          <EmergencyForm auth={auth} />
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

test("renders without error", () => {
  render(
    <Provider store={store}>
      <Router>
        <PersonForm />
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
          <RapidTestForm auth={auth} />
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
          <StatusViewRequestForm auth={auth} />
        </Router>
      </Provider>
    );
  } catch {
    // Should not render without correct auth
  }
});
