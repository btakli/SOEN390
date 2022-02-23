// For testing props see https://testing-library.com/docs/react-testing-library/api/#rerender

import React from 'react';
import { Provider } from 'react-redux'
import { render } from "../test-utils";
import SignUp from "../Pages/SignUp";
import store from '../store'

test("renders without error", () => {
  render(
    <Provider store={store}>
      <SignUp />
    </Provider>);
});
