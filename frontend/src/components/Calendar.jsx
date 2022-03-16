import React from 'react'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';





export default function Calendar() {
  const [value, setValue] = useState(new Date());




  return (
    <div className='Appointment'>
    
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        orientation="landscape"
        openTo="day"
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
  
        }}

        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>

    </div>

    
  );


 
}


