import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Settings from "./pages/more/Settings";
import TermsAndConditions from "./pages/more/TermsAndConditions";
import About from "./pages/more/About";

import NoMatch from "./pages/NoMatch";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import DoctorIsAway from "./components/DoctorIsAway";

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
import Profile from "./pages/home/Profile";
import Dashboard from "./pages/home/Dashboard";
import RapidTest from "./pages/home/RapidTest";
import PatientStatus from "./pages/home/PatientStatus";
import Patients from "./pages/home/Patients";
import Immigrants from "./pages/home/Immigrants";
import AddressTracing from "./pages/home/AddressTracing";
import RequestHelp from "./pages/RequestHelpPage/RequestHelp";
import QRCodeDisplay from "./pages/home/QRCode/QRCodeDisplay";
import QRCodeInfo from "./pages/home/QRCode/QRCodeInfo";
import PatientAppointment from "./pages/home/PatientAppointment";
import USACovidAPI from "./pages/home/USACovidAPI";
import CANCovidAPI from "./pages/home/CANCovidAPI";


function App() {
  const homePath = "/";
  const admin_email = "delispeter19@gmail.com"
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={homePath} element={<PrivateRoute redirect={"/pre/login"} />} >
            <Route path="" element={<Home home={homePath} admin_email={admin_email} />} >
              <Route path={homePath} element={<DoctorIsAway />} >
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="patients" element={<Patients />} />
                <Route path="qr-code/:patient_uri" element={<QRCodeInfo />} />
                <Route path="doctor/appointments" element={<Dashboard />} />
              </Route>

              <Route path="profile" element={<Profile />} />
              <Route path="status" element={<PatientStatus />} />
              <Route path="addressTracing" element={<AddressTracing />} />
              <Route path="immigrants" element={<Immigrants />} />
              <Route path="rapid-test-result" element={<RapidTest />} />
              <Route path="qr-code" element={<QRCodeDisplay />} />
              <Route path="patient/appointments" element={<PatientAppointment />} />

              <Route path="patient/canada-CovidAPI" element={<CANCovidAPI />} />
              <Route path="patient/usa-CovidAPI" element={<USACovidAPI />} />
              <Route path="patient/requestHelp" element={<RequestHelp />} />

              <Route path="settings" element={<Settings />} />
              <Route path="terms-conditions" element={<TermsAndConditions />} />
              <Route path="about" element={<About />} />

              <Route path="*" element={<NoMatch />} />
            </Route>
          </Route>

          {/* Login and Register Pages */}
          <Route path={homePath} element={<PublicRoute redirect={homePath} />} >
            <Route path="pre/login" element={<PreLogin />} />
            <Route path="patient/login" element={<PatientLogin />} />
            <Route path="doctor/login" element={<DoctorLogin />} />
            <Route path="immigration-officer/login" element={<ImmigrationOfficerLogin />} />
            <Route path="patient/signup" element={<PatientSignUp redirect={"/pre/login"} />} />
            <Route path="doctor/signup" element={<DoctorSignUp redirect={"/pre/login"} />} />
            <Route path="immigration-officer/signup" element={<ImmigrationOfficerSignUp redirect={"/pre/login"} />} />
          </Route>

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
