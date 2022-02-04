import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Register from "./Pages/Register";
import PrivateRoute from "./PrivateRoute";

export default function RoutesManager() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Home />}/>
      </Route>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/register" element={<Register />}/>
      
    </Routes>
  );
}
