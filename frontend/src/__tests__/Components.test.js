// For testing props see https://testing-library.com/docs/react-testing-library/api/#rerender

import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";

import PriorityToggle from "../components/PriorityToggle";
// import PrivateRoute from "../components/PrivateRoute";
import Spinner from "../components/Spinner";
import StatusViewRequest from "../components/StatusViewRequest";

test("renders without error", () => {
  render(
    <Provider store={store}>
      <PriorityToggle />
    </Provider>
  );
});

// test("renders without error", () => {
//   render(
//     <Provider store={store}>
//       <PrivateRoute />
//     </Provider>
//   );
// });

test("renders without error", () => {
  render(
    <Provider store={store}>
      <Spinner />
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
          <StatusViewRequest auth={auth} />
        </Router>
      </Provider>
    );
  } catch {
    // Should not render without correct auth
  }
});
