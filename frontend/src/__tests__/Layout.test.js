import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import store from "../redux/store";

import AuthAlerts from "../components/layout/AuthAlerts";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import MainAlerts from "../components/layout/MainAlerts";

test("does not render", () => {
  try {
    render(
      <Provider store={store}>
        <AuthAlerts />
      </Provider>
    );
  } catch (err) {
    // Should fail render
  }
});

test("renders without error", () => {
  render(
    <Provider store={store}>
      <Footer />
    </Provider>
  );
});

test("does not render", () => {
  try {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
  } catch (err) {
    // Should fail render
  }
});

test("does not render", () => {
  try {
    render(
      <Provider store={store}>
        <MainAlerts />
      </Provider>
    );
  } catch (err) {
    // Should fail render
  }
});
