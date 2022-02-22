import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLogin from "./Pages/UserLogin";
import DoctorLogin from "./Pages/DoctorLogin";
import PreLogin from "./Pages/PreLogin";
import Home from "./Pages/Home";
import UserSignUp from "./Pages/UserSignUp";
import DoctorSignUp from "./Pages/DoctorSignUp";

import Requests from "./Pages/Requests";
import RequestApplicationTemplate from "./Pages/RequestApplicationTemplate";
import Template2 from "./Pages/Template2";
import Template3 from "./Pages/Template3";

import PrivateRoute from "./PrivateRoute";

export default function RoutesManager() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/home" element={<Home />}>
          <Route path="/home/requests" element={<Requests />} />
          <Route path="/home/t2" element={<Template2 />} />
          <Route path="/home/t3" element={<Template3 />} />
        </Route>
      </Route>
      <Route
        path="/requestapplication"
        element={<RequestApplicationTemplate />}
      />
      <Route path="/userlogin" element={<UserLogin />} />
      <Route path="/doctorlogin" element={<DoctorLogin />} />
      <Route path="/prelogin" element={<PreLogin />} />
      <Route path="/usersignup" element={<UserSignUp />} />
      <Route path="/doctorsignup" element={<DoctorSignUp />} />
    </Routes>
  );
}
