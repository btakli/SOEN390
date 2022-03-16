// For testing props see https://testing-library.com/docs/react-testing-library/api/#rerender

import React from 'react';
import { Provider } from 'react-redux'
import { render } from '../test-utils';
import store from '../redux/store'

import { DoctorLogin } from '../pages/auth/DoctorLogin'
import { DoctorSignUp } from '../pages/auth/DoctorSignUp'
import { PatientLogin } from '../pages/auth/PatientLogin'
import { PatientSignUp } from '../pages/auth/PatientSignUp'
import { PreLogin } from '../pages/auth/PreLogin'

test("renders without error", () => {
    render (
        <Provider store={store}>
            <DoctorLogin />
        </Provider>
    );
});

test("renders without error", () => {
    render (
        <Provider store={store}>
            <DoctorSignUp />
        </Provider>
    );
});

test("renders without error", () => {
    render (
        <Provider store={store}>
            <PatientLogin />
        </Provider>
    );
});

test("renders without error", () => {
    render (
        <Provider store={store}>
            <PatientSignUp />
        </Provider>
    );
});

test("renders without error", () => {
    render (
        <Provider store={store}>
            <PreLogin />
        </Provider>
    );
});
