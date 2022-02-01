import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";

export default function RoutesManager() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />}></Route>
      <Route exact path="/login" element={<Login />}></Route>
      <Route exact path="/signup" element={<SignUp />}></Route>
      <Route exact path="/home" element={<Home />}></Route>
    </Routes>
  );
}
