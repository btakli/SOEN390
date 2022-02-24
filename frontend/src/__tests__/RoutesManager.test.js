import React from 'react';
import { Provider } from 'react-redux'
import { render } from "../test-utils";
import RoutesManager from '../RoutesManager';
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Register from "../Pages/Register";
import store from '../store'

test("renders without error", () => {
  render(
    <Provider store={store}>
      <RoutesManager />
    </Provider>);
});

test("renders without error", () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>);
});

test("renders without error", () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>);
});

test("renders without error", () => {
  render(
    <Provider store={store}>
      <SignUp />
    </Provider>);
});

test("renders without error", () => {
  render(
    <Provider store={store}>
      <Register />
    </Provider>);
});
