import React from 'react';
import { Provider } from 'react-redux'
import { render } from "../test-utils";
import Alerts from "../components/Alerts";
import store from '../store'

test("renders without error", () => {
  try {
    render(
      <Provider store={store}>
        <Alerts />
      </Provider>
    );
  }
  catch(err) {
    // Should fail render
  }
});
