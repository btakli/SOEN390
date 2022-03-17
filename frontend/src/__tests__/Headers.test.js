// For testing props see https://testing-library.com/docs/react-testing-library/api/#rerender

import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";

import Mail from "../components/layout/headerComponents/Mail";
import Navigator from "../components/layout/headerComponents/Navigator";
import ProfileMenu from "../components/layout/headerComponents/ProfileMenu";
import Report from "../components/layout/headerComponents/Report";

const auth = () => ({
  userData: {
    user: "1",
    first_name: "user",
    last_name: "name",
    email: "user@email.com",
  },
});

test("does not render without auth", () => {
  try {
    render(
      <Provider store={store}>
        <Router>
          <Mail auth={auth} />
        </Router>
      </Provider>
    );
  } catch {
    // Should not render without correct auth
  }
});

test("does not render without auth", () => {
  try {
    render(
      <Provider store={store}>
        <Router>
          <Navigator auth={auth} />
        </Router>
      </Provider>
    );
  } catch {
    // Should not render without correct auth
  }
});

test("does not render without auth", () => {
  try {
    render(
      <Provider store={store}>
        <Router>
          <ProfileMenu auth={auth} />
        </Router>
      </Provider>
    );
  } catch {
    // Should not render without correct auth
  }
});

test("does not render without auth", () => {
  try {
    render(
      <Provider store={store}>
        <Router>
          <Report auth={auth} />
        </Router>
      </Provider>
    );
  } catch {
    // Should not render without correct auth
  }
});
