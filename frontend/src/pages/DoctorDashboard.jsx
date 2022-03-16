import { React } from "react";

import PatientTogglePage from "./src/pages/PatientTogglePage";
import Appointment from "./src/pages/Appointment"; 
import NavigationBar from "./src/components/layout/NavigationBar"; 
import Dashboard from "./src/pages/home/Dashboard";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function DoctorDashboard(){

  return (

      <Router>
        <NavigationBar />
        <Routes>
          <Route path= "/doctorDashboard" element={<Dashboard/>}/>
          <Route path="/patientList" element={<PatientTogglePage/>} />
          <Route path="/schedule" element={<Appointment/>} />
        </Routes>
      </Router>
  )
}




export default (DoctorDashboard);
