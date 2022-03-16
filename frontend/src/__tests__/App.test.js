import React from 'react';
import { render } from "../test-utils";
import App from "../App";
import store from '../redux/store'

test("renders without error", () => {
    render (
        <App {...props} />
    );
});
