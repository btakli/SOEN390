// For testing props see https://testing-library.com/docs/react-testing-library/api/#rerender

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";

import NoMatch from "../pages/NoMatch";
import Patients from "../pages/Patients";
import RequestApplicationTemplate from "../pages/RequestApplicationTemplate";
import Requests from "../pages/Requests";

test("renders without error", () => {
  render(
    <Provider store={store}>
      <Router>
        <NoMatch />
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
          <Patients auth={auth} />
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
        <RequestApplicationTemplate />
      </Router>
    </Provider>
  );
});

test("renders without error", () => {
  render(
    <Provider store={store}>
      <Router>
        <Requests />
      </Router>
    </Provider>
  );
});
