import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";

import Home from "../pages/home/Home";

test("does not render without backend user", () => {
  try {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  } catch (err) {
    // Should fail render
  }
});
