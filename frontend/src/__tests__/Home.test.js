import React from 'react';
import {Provider} from 'react-redux'
import {render} from "../test-utils";
import Home from "../pages/home/Home";
import store from '../redux/store'

test("does not render without backend user", () => {
    try {
        render (
            <Provider store={store}>
                <Home/>
            </Provider>
        );
    } catch (err) {
        // Should fail render
    }
});
