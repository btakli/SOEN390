import React from 'react';
import { Provider } from 'react-redux'
import { render } from "../test-utils";
import Alerts from "../components/layout/Alerts";
import store from '../redux/store'

test("does not render", () => {
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
