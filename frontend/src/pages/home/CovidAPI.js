import { React } from 'react';

import CovidAPI_national from "../../pages/CovidAPIs/CovidAPI_national";
import CovidAPI_perState from "../../pages/CovidAPIs/CovidAPI_perState"; 
import Box from '@mui/material/Box';
import { Card } from '@mui/material';

function CovidAPI() {
 
  return (
    <Card>
        <CovidAPI_national/> 
        <CovidAPI_perState/> 
    </Card>
   
  );
}
export default CovidAPI; 

