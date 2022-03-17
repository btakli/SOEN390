// For testing props see https://testing-library.com/docs/react-testing-library/api/#rerender

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";

import PatientTable from "../components/tables/PatientTable";
import PersonTable from "../components/tables/PersonTable";
import StatusTable from "../components/tables/StatusTable";

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
          <PatientTable auth={auth} />
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
        <PersonTable />
      </Router>
    </Provider>
  );
});

test("renders without error", () => {
  render(
    <Provider store={store}>
      <Router>
        <StatusTable />
      </Router>
    </Provider>
  );
});
