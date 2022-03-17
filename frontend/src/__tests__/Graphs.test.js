// For testing props see https://testing-library.com/docs/react-testing-library/api/#rerender

import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";

// npm install resize-observer
import { install } from "resize-observer";

import { BaseGraphStyle } from "../components/graphs/BaseGraphStyle";
// import InfectionsPerTypeGraph from "../components/graphs/InfectionsPerTypeGraph";
// import InfectionsPerWeekGraph from "../components/graphs/InfectionsPerWeekGraph";

install();

test("renders without error", () => {
  render(
    <Provider store={store}>
      <BaseGraphStyle />
    </Provider>
  );
});
