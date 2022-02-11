import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import { Provider } from "react-redux";
import store from "./store";

import { loadUser } from "./redux/actions/authActions";
import Alerts from "./Components/Alerts";

function Root() {
  const alertOptions = {
    timeout: 3000,
    position: "top center",
  };

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <React.StrictMode>
          <Alerts />
          <Router>
            {/* App is just the RouterManager at the moment */}
            <App />
          </Router>
          {/* <Footer /> */}
        </React.StrictMode>
      </AlertProvider>
    </Provider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
