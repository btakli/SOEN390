import { React, useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function CovidAPI_national () {

    const [items, setItems] = useState([]); 

    useEffect (() => {
        fetch('https://api.covidtracking.com/v1/us/daily.json')
        .then(response => response.json())
        .then(items => {setItems(items);})  
    }, [])
  

    return (
        <TableContainer component={Paper}  sx={{ width: 2/3, margin: 'auto', marginTop: 3,}}>
            <h1>National Data</h1>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Positive</TableCell>
                        <TableCell>Negative</TableCell>
                        <TableCell>Total Hospitalized</TableCell>
                        <TableCell>Total in ICU</TableCell>
                        <TableCell>Total on Ventilator</TableCell>
                        <TableCell>Total Deaths</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((info) => (
                  <TableRow
                      key={info.date}   
                  >
                      <TableCell>{info.date}</TableCell>
                      <TableCell>{info.positive}</TableCell>
                      <TableCell>{info.negative}</TableCell>
                      <TableCell>{info.hospitalizedCumulative}</TableCell>
                      <TableCell>{info.inIcuCumulative}</TableCell>
                      <TableCell>{info.onVentilatorCumulative}</TableCell>
                      <TableCell>{info.death}</TableCell>
                      
                  </TableRow>
                  ))}
                </TableBody>
            </Table>  
     
        </TableContainer>

    );

}
export default CovidAPI_national; 