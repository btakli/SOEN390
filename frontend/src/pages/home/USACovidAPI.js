import { React } from 'react';

import CovidAPI_national from "../../pages/CovidAPIs/CovidAPI_national";
import CovidAPI_perState from "../../pages/CovidAPIs/CovidAPI_perState"; 
import { Card } from '@mui/material';

function USACovidAPI() {
 
  return (
    <Card>
        <CovidAPI_national/> 
        <CovidAPI_perState/> 
    </Card>
   
  );
}
export default USACovidAPI; 

