import React from 'react';
import { Provider } from 'react-redux'
import { render } from "../test-utils";
import Home from "../Pages/Home";
import store from '../store'

test("renders without error", () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>);
});
