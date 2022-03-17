import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import store from "../redux/store";

import Alerts from "../components/layout/Alerts";

test("does not render", () => {
  try {
    render(
      <Provider store={store}>
        <Alerts />
      </Provider>
    );
  } catch (err) {
    // Should fail render
  }
});
