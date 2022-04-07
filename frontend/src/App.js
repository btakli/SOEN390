import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import NoMatch from "./pages/NoMatch";
import RequestApplicationTemplate from "./pages/RequestApplicationTemplate";
import PrivateRoute from "./components/PrivateRoute";

// AUTH
import PreLogin from "./pages/auth/PreLogin";
import PatientLogin from "./pages/auth/PatientLogin";
import DoctorLogin from "./pages/auth/DoctorLogin";
import ImmigrationOfficerLogin from "./pages/auth/ImmigrationOfficerLogin";
import PatientSignUp from "./pages/auth/PatientSignUp";
import DoctorSignUp from "./pages/auth/DoctorSignUp";
import ImmigrationOfficerSignUp from "./pages/auth/ImmigrationOfficerSignUp";

// HOME
import Home from "./pages/home/Home";
import Dashboard from "./pages/home/Dashboard";
import RapidTest from "./pages/home/RapidTest";
import PatientStatus from "./pages/home/PatientStatus";
import Requests from "./pages/Requests";
import Patients from "./pages/Patients";
import Immigrants from "./pages/Immigrants";
import AddressTracing from "./pages/home/AddressTracing";
import QRCodeDisplay from "./pages/home/QRCode/QRCodeDisplay";
import QRCodeInfo from "./pages/home/QRCode/QRCodeInfo";
import PatientAppointment from "./pages/home/PatientAppointment";

function App() {
  const homePath = "/";
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Home Page and Outlets */}
          <Route
            path={homePath}
            element={<PrivateRoute redirect={"/pre/login"} />}
          >
            <Route path="" element={<Home home={homePath} />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="requests" element={<Requests />} />
              <Route path="status" element={<PatientStatus />} />
              <Route path="addressTracing" element={<AddressTracing />} />
              <Route path="patients" element={<Patients />} />
              <Route path="immigrants" element={<Immigrants />} />
              <Route path="rapid-test-result" element={<RapidTest />} />
              <Route path="qr-code" element={<QRCodeDisplay />} />
              <Route path="qr-code/:patient_uri" element={<QRCodeInfo />} />
              <Route path="patient/appointments" element={<PatientAppointment />} />
              <Route path="doctor/appointments" element={<Dashboard />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Route>

          <Route
            path="/requestapplication"
            element={<RequestApplicationTemplate />}
          />

          {/* Login and Register Pages */}
          <Route path="/pre/login" element={<PreLogin />} />
          <Route
            path="/patient/login"
            element={<PatientLogin redirect={homePath} />}
          />
          <Route
            path="/doctor/login"
            element={<DoctorLogin redirect={homePath} />}
          />
          <Route
            path="/immigration-officer/login"
            element={<ImmigrationOfficerLogin redirect={homePath} />}
          />
          <Route
            path="/patient/signup"
            element={<PatientSignUp redirect={homePath} />}
          />
          <Route
            path="/doctor/signup"
            element={<DoctorSignUp redirect={homePath} />}
          />
          <Route
            path="/immigration-officer/signup"
            element={<ImmigrationOfficerSignUp redirect={homePath} />}
          />

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
