import { React } from 'react';

import CovidAPI_national from "../../pages/CovidAPIs/CovidAPI_national";
import CovidAPI_perState from "../../pages/CovidAPIs/CovidAPI_perState"; 
import Box from '@mui/material/Box';


function CovidAPI() {
 
  return (
    <Box>
        <CovidAPI_national/>
        <CovidAPI_perState/>
    </Box>
   
  );
}
export default CovidAPI; 