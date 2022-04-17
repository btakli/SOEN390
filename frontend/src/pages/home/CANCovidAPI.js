import React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Card } from '@mui/material';

// http://api.opencovid.ca/#/default/get_summary_summary_get --> query
// http://api.opencovid.ca/summary?loc=prov&ymd=false&version=false same thing as http://api.opencovid.ca/summary

function CANCovidAPI() {

    const [provinces, setProvinces] = useState([]);

    useEffect (() => {
        fetch("http://api.opencovid.ca/summary?loc=prov&ymd=false&version=false",
            {
                 headers : { 
                            'Accept': 'application/json'
                           }
            }
        )
        .then(response => response.json())
        .then(provinces => setProvinces(provinces.summary)); 

    },[])

    return (
        <Card>
            <TableContainer component={Paper}  sx={{ width: 3/4, margin: 'auto', marginTop: 3,}}>
                <h1>Canada's Current Covid19 Summary</h1>
                <h3>http://api.opencovid.ca/summary</h3>
                <Table sx={{ minWidth: 800 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Province</TableCell>
                            <TableCell>Cases</TableCell>
                            <TableCell>Total Cases</TableCell>
                            <TableCell>Deaths</TableCell>
                            <TableCell>Total Deaths</TableCell>
                            <TableCell>Recovered</TableCell>
                            <TableCell>Total Recovered</TableCell>
                            <TableCell>Active Cases</TableCell>
                            <TableCell>Total Vaccinated</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {provinces.map((region) => (
                            <TableRow  
                                key={region.province}
                            >
                                <TableCell>{region.province}</TableCell>
                                <TableCell>{region.cases}</TableCell>
                                <TableCell>{region.cumulative_cases}</TableCell>
                                <TableCell>{region.deaths}</TableCell>
                                <TableCell>{region.cumulative_deaths}</TableCell>
                                <TableCell>{region.recovered}</TableCell>
                                <TableCell>{region.cumulative_recovered}</TableCell>
                                <TableCell>{region.active_cases}</TableCell>
                                <TableCell>{region.cumulative_avaccine}</TableCell>
                                                
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
}
export default CANCovidAPI;