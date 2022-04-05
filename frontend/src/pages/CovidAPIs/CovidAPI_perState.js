import { React, useState} from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function CovidAPI_perState () {

    const [usaState, setUsaState] = useState('default'); // usa state from user
    const [usa, setUSA] = useState([]); //pass state data from api call
    const [url, setURL] = useState(''); //set api path


    const handleChange = (event) => {
        setUsaState(event.target.value); 
        setURL(`https://api.covidtracking.com/v1/states/${event.target.value}/daily.json`);
    };

    const handleClose = () => { 
        fetch(url)
        .then(response => response.json())
        .then(data => {setUSA(data);}); 
    };

    return (
        <TableContainer component={Paper}  sx={{ width: 2/3, margin: 'auto', marginBottom: 3, marginTop: 3,}}>
        <h1>Data by State</h1>
        <FormControl sx={{ m: 1, minWidth: 130 }}>
            <InputLabel id="state_selector">States</InputLabel>
            <Select
                labelId="state_selector"
                id="state_selector"
                value={usaState}
                label="States" 
                onChange={handleChange}
                onClose={handleClose}
            >
                <MenuItem value="default">None</MenuItem>
                <MenuItem value="al">Alabama</MenuItem>
                <MenuItem value="ak">Alaska</MenuItem>
                <MenuItem value="as">American Samoa</MenuItem>
                <MenuItem value="az">Arizona</MenuItem>
                <MenuItem value="ar">Arkansas</MenuItem>
                <MenuItem value="ca">California</MenuItem>
                <MenuItem value="co">Colorado</MenuItem>
                <MenuItem value="ct">Connecticut</MenuItem>
                <MenuItem value="ce">Delaware</MenuItem>
                <MenuItem value="dc">District of Columbia</MenuItem>
                <MenuItem value="fm">Federated States of Micronesia</MenuItem>
                <MenuItem value="fl">Florida</MenuItem>
                <MenuItem value="ga">Georgia</MenuItem>
                <MenuItem value="gu">Guam</MenuItem>
                <MenuItem value="hi">Hawaii</MenuItem>
                <MenuItem value="id">Idaho</MenuItem>
                <MenuItem value="il">Illinois</MenuItem>
                <MenuItem value="in">Indiana</MenuItem>
                <MenuItem value="ia">Iowa</MenuItem>
                <MenuItem value="ks">Kansas</MenuItem>
                <MenuItem value="ky">Kentucky</MenuItem>
                <MenuItem value="la">Louisiana</MenuItem>
                <MenuItem value="me">Maine</MenuItem>
                <MenuItem value="mh">Marshall Islands</MenuItem>
                <MenuItem value="md">Maryland</MenuItem>
                <MenuItem value="ma">Massachusetts</MenuItem>
                <MenuItem value="mi">Michigan</MenuItem>
                <MenuItem value="mn">Minnesota</MenuItem>
                <MenuItem value="ms">Mississippi</MenuItem>
                <MenuItem value="mo">Missouri</MenuItem>
                <MenuItem value="mt">Montana</MenuItem>
                <MenuItem value="mp">Northern Mariana Islands</MenuItem>
                <MenuItem value="ne">Nebraska</MenuItem>
                <MenuItem value="nv">Nevada</MenuItem>
                <MenuItem value="nh">New Hampshire</MenuItem>
                <MenuItem value="nj">New Jersey</MenuItem>
                <MenuItem value="nm">New Mexico</MenuItem>
                <MenuItem value="ny">New York</MenuItem>
                <MenuItem value="nc">North Carolina</MenuItem>
                <MenuItem value="nd">North Dakota</MenuItem>
                <MenuItem value="oh">Ohio</MenuItem>
                <MenuItem value="ok">Oklahoma</MenuItem>
                <MenuItem value="or">Oregon</MenuItem>
                <MenuItem value="pw">Palau</MenuItem>
                <MenuItem value="pa">Pennsylvania</MenuItem>
                <MenuItem value="pr">Puerto Rico</MenuItem>
                <MenuItem value="ri">Rhode Island</MenuItem>
                <MenuItem value="sc">South Carolina</MenuItem>
                <MenuItem value="sd">South Dakota</MenuItem>
                <MenuItem value="tn">Tennessee</MenuItem>
                <MenuItem value="tx">Texas</MenuItem>
                <MenuItem value="ut">Utah</MenuItem>
                <MenuItem value="vt">Vermont</MenuItem>
                <MenuItem value="vi">Virgin Islands</MenuItem>
                <MenuItem value="va">Virginia</MenuItem>
                <MenuItem value="wa">Washington</MenuItem>
                <MenuItem value="wv">West Virginia</MenuItem>
                <MenuItem value="wi">Wisconsin</MenuItem>
                <MenuItem value="wy">Wyoming</MenuItem>
            </Select>
            <div>
                {url}
                </div>
    </FormControl>

    <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>State</TableCell>
                    <TableCell>Positive</TableCell>
                    <TableCell>Negative</TableCell>
                    <TableCell>Total Hospitalized</TableCell>
                    <TableCell>Total in ICU</TableCell>
                    <TableCell>Total on Ventilator</TableCell>
                    <TableCell>Total Deaths</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {usa.map((usaInfo) => (
                    <TableRow
                        key={usaInfo.date}   
                    >
                        <TableCell>{usaInfo.date}</TableCell>
                        <TableCell>{usaInfo.state}</TableCell>
                        <TableCell>{usaInfo.positive}</TableCell>
                        <TableCell>{usaInfo.negative}</TableCell>
                        <TableCell>{usaInfo.hospitalizedCumulative}</TableCell>
                        <TableCell>{usaInfo.inIcuCumulative}</TableCell>
                        <TableCell>{usaInfo.onVentilatorCumulative}</TableCell>
                        <TableCell>{usaInfo.death}</TableCell>  
                    </TableRow>
                ))}
            </TableBody>
        </Table>      
  </TableContainer>

    );

}
export default CovidAPI_perState;