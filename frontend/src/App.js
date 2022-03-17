import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import NoMatch from "./pages/NoMatch";
import RequestApplicationTemplate from "./pages/RequestApplicationTemplate";
import PrivateRoute from "./components/PrivateRoute";

// REFACTOR
import DoctorAppointment from "./refactor/appointment/DoctorAppointment";
import PatientAppointmentForm from "./refactor/appointment/PatientAppointmentForm";

// AUTH
import PreLogin from "./pages/auth/PreLogin";
import PatientLogin from "./pages/auth/PatientLogin";
import DoctorLogin from "./pages/auth/DoctorLogin";
import PatientSignUp from "./pages/auth/PatientSignUp";
import DoctorSignUp from "./pages/auth/DoctorSignUp";

// HOME
import Home from "./pages/home/Home";
import Dashboard from './pages/home/Dashboard';
import PatientStatus from "./pages/home/PatientStatus";
import Requests from "./pages/Requests";
import Patients from "./pages/Patients";

// import PatientListDisplay from "./refactor/patientTable/PatientListDisplay";

function App() {

  const homePath = "/";

  return (
    <div className="App">
      <Router>
        <Routes>

        {/* <Route path="/r" element={<PatientListDisplay />} /> */}

          {/* Home Page and Outlets */}
          <Route path={homePath} element={<PrivateRoute redirect={"/pre/login"} />}>
            <Route path="" element={<Home home={homePath} />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="requests" element={<Requests />} />
              <Route path="status" element={<PatientStatus />} />
              <Route path="patients" element={<Patients />} />
              <Route path="doctor/appointments" element={<DoctorAppointment />} />
              <Route path="patient/appointments" element={<PatientAppointmentForm />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Route>

          <Route path="/requestapplication"
            element={<RequestApplicationTemplate />} />

          {/* Login and Register Pages */}
          <Route path="/pre/login" element={<PreLogin />} />
          <Route path="/patient/login" element={<PatientLogin redirect={homePath} />} />
          <Route path="/doctor/login" element={<DoctorLogin redirect={homePath}/>} />
          <Route path="/patient/signup" element={<PatientSignUp redirect={homePath} />} />
          <Route path="/doctor/signup" element={<DoctorSignUp redirect={homePath} />} />

          

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
