import React from 'react';
import { Provider } from 'react-redux'
import { render } from "../test-utils";
import App from "../App";
import store from '../store'

test("renders without error", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>);
  });
