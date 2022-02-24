import React from 'react';
import { Provider } from 'react-redux'
import { render } from "../test-utils";
import PersonForm from "../components/PersonForm";
import store from '../store'

test("renders without error", () => {
  render(
    <Provider store={store}>
      <PersonForm />
    </Provider>);
});
