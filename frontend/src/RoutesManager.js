import React from "react";
import { Route, Routes } from "react-router-dom";
import PatientLogin from "./pages/PatientLogin";
import DoctorLogin from "./pages/DoctorLogin";
import PreLogin from "./pages/PreLogin";
import Home from "./pages/Home";
import PatientSignUp from "./pages/PatientSignUp";
import DoctorSignUp from "./pages/DoctorSignUp";

import Requests from "./pages/Requests";
import RequestApplicationTemplate from "./pages/RequestApplicationTemplate";
import PatientsList from "./pages/PatientsList";

import PrivateRoute from "./PrivateRoute";
import PatientStatus from "./pages/PatientStatus";

export default function RoutesManager() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/requests" element={<PrivateRoute />}>
        <Route path="/requests" element={<Requests />} />
      </Route>
      <Route path="/t2" element={<PrivateRoute />}>
        <Route path="/t2" element={<PatientStatus />} />
      </Route>
      <Route path="/t3" element={<PrivateRoute />}>
        <Route path="/t3" element={<PatientsList />} />
      </Route>

      {/* <Route path="/contact" element={<ContactForm />} /> */}
      <Route path="/requestapplication"
        element={<RequestApplicationTemplate />} />

      {/* Login and Register Pages */}
      <Route path="/pre/login" element={<PreLogin />} />
      <Route path="/patient/login" element={<PatientLogin />} />
      <Route path="/doctor/login" element={<DoctorLogin />} />
      <Route path="/patient/signup" element={<PatientSignUp />} />
      <Route path="/doctor/signup" element={<DoctorSignUp />} />
    </Routes>
  );
}
