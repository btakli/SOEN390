import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Register from "./Pages/Register";

import Requests from "./Pages/Requests";
import RequestApplicationTemplate from "./Pages/RequestApplicationTemplate";
import Template3 from "./Pages/Template3";

import PrivateRoute from "./PrivateRoute";
import PatientStatus from "./Pages/PatientStatus";

export default function RoutesManager() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/home" element={<Home />}>
          <Route path="/home/requests" element={<Requests />} />
          <Route path="/home/t2" element={<PatientStatus />} />
          <Route path="/home/t3" element={<Template3 />} />
        </Route>
      </Route>
      <Route
        path="/requestapplication"
        element={<RequestApplicationTemplate />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
