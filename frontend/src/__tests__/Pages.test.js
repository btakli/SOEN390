// For testing props see https://testing-library.com/docs/react-testing-library/api/#rerender

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";

import NoMatch from "../pages/NoMatch";

test("renders without error", () => {
  render(
    <Provider store={store}>
      <Router>
        <NoMatch />
      </Router>
    </Provider>
  );
});
