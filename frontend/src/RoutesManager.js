import React from "react";
import { Route, Routes } from "react-router-dom";

import NoMatch from "./pages/NoMatch";
import RequestApplicationTemplate from "./pages/RequestApplicationTemplate";
import PrivateRoute from "./PrivateRoute";

// AUTH
import PreLogin from "./pages/auth/PreLogin";
import PatientLogin from "./pages/auth/PatientLogin";
import DoctorLogin from "./pages/auth/DoctorLogin";
import PatientSignUp from "./pages/auth/PatientSignUp";
import DoctorSignUp from "./pages/auth/DoctorSignUp";

// HOME
import Home from "./pages/Home";
import Dashboard from './pages/Dashboard';
import Requests from "./pages/Requests";
import PatientsList from "./pages/PatientsList";
import PatientStatus from "./pages/PatientStatus";

function RoutesManager() {
  
  const homePath = "/";

  return (
    <Routes>
      {/* Home Page and Outlets */}
      <Route path={homePath} element={<PrivateRoute redirect={"/pre/login"} />}>
        <Route path="" element={<Home home={homePath} />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="requests" element={<Requests />} />
          <Route path="status" element={<PatientStatus />} />
          <Route path="patients" element={<PatientsList />} />
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
  );
}

export default RoutesManager;
