import { React, useEffect, useState, Fragment } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const newStyles = makeStyles((theme) => ({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

function CovidAPI () {

    const [items, setItems] = useState({}); // national
    const [usa, setUSA] = useState({}); // by state
    const classes = newStyles();

    //user select state (filter)
    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        setUSA(event.target.value);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleOpen = () => {
        setOpen(true);
      };

 

    // national data by date
    useEffect(() => {
        fetch('https://api.covidtracking.com/v1/us/daily.json')
        .then(response => response.json())
        .then(items => {setItems(items);})    

    }
    )

    // data by state
    useEffect(() => {
        fetch('https://api.covidtracking.com/v1/states/daily.json')
        .then(response => response.json())
        .then(usa => {setUSA(usa);})    

    }
    )


        return (
            <Fragment>
            <TableContainer component={Paper}  sx={{ width: 2/3, margin: 'auto'}}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <h1>National Data</h1>
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

              <Pagination count={50} variant="outlined" color="primary" />
            </TableContainer>


            <Button className={classes.button} onClick={handleOpen}/>
            <FormControl className={classes.formControl}>
                <InputLabel id="state_selection">State</InputLabel>
                <Select
                    labelId="state_selection"
                    id="selection"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={usa}
                    onChange={handleChange}
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value="AL">Alabama</MenuItem>
                <MenuItem value="AK">Alaska</MenuItem>
                <MenuItem value="AS">American Samoa</MenuItem>
                <MenuItem value="AZ">Arizona</MenuItem>
                <MenuItem value="AR">Arkansas</MenuItem>
                <MenuItem value="CA">California</MenuItem>
                <MenuItem value="CO">Colorado</MenuItem>
                <MenuItem value="CT">Connecticut</MenuItem>
                <MenuItem value="DE">Delaware</MenuItem>
                <MenuItem value="DC">District of Columbia</MenuItem>
                <MenuItem value="FM">Federated States of Micronesia</MenuItem>
                <MenuItem value="FL">Florida</MenuItem>
                <MenuItem value="GA">Georgia</MenuItem>
                <MenuItem value="GU">Guam</MenuItem>
                <MenuItem value="HI">Hawaii</MenuItem>
                <MenuItem value="ID">Idaho</MenuItem>
                <MenuItem value="IL">Illinois</MenuItem>
                <MenuItem value="IN">Indiana</MenuItem>
                <MenuItem value="IA">Iowa</MenuItem>
                <MenuItem value="KS">Kansas</MenuItem>
                <MenuItem value="KY">Kentucky</MenuItem>
                <MenuItem value="LA">Louisiana</MenuItem>
                <MenuItem value="ME">Maine</MenuItem>
                <MenuItem value="MH">Marshall Islands</MenuItem>
                <MenuItem value="MD">Maryland</MenuItem>
                <MenuItem value="MA">Massachusetts</MenuItem>
                <MenuItem value="MI">Michigan</MenuItem>
                <MenuItem value="MN">Minnesota</MenuItem>
                <MenuItem value="MS">Mississippi</MenuItem>
                <MenuItem value="MO">Missouri</MenuItem>
                <MenuItem value="MT">Montana</MenuItem>
                <MenuItem value="MP">Northern Mariana Islands</MenuItem>
                <MenuItem value="NE">Nebraska</MenuItem>
                <MenuItem value="NV">Nevada</MenuItem>
                <MenuItem value="NH">New Hampshire</MenuItem>
                <MenuItem value="NJ">New Jersey</MenuItem>
                <MenuItem value="NM">New Mexico</MenuItem>
                <MenuItem value="NY">New York</MenuItem>
                <MenuItem value="NC">North Carolina</MenuItem>
                <MenuItem value="ND">North Dakota</MenuItem>
                <MenuItem value="OH">Ohio</MenuItem>
                <MenuItem value="OK">Oklahoma</MenuItem>
                <MenuItem value="OR">Oregon</MenuItem>
                <MenuItem value="PW">Palau</MenuItem>
                <MenuItem value="PA">Pennsylvania</MenuItem>
                <MenuItem value="PR">Puerto Rico</MenuItem>
                <MenuItem value="RI">Rhode Island</MenuItem>
                <MenuItem value="SC">South Carolina</MenuItem>
                <MenuItem value="SD">South Dakota</MenuItem>
                <MenuItem value="TN">Tennessee</MenuItem>
                <MenuItem value="TX">Texas</MenuItem>
                <MenuItem value="UT">Utah</MenuItem>
                <MenuItem value="VT">Vermont</MenuItem>
                <MenuItem value="VI">Virgin Islands</MenuItem>
                <MenuItem value="VA">Virginia</MenuItem>
                <MenuItem value="WA">Washington</MenuItem>
                <MenuItem value="WV">West Virginia</MenuItem>
                <MenuItem value="WI">Wisconsin</MenuItem>
                <MenuItem value="WY">Wyoming</MenuItem>
                </Select>
             </FormControl>

            <TableContainer component={Paper}  sx={{ width: 2/3, margin: 'auto'}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <h1>Data by State</h1>
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
                    {usa.map((stats) => (
                    <TableRow
                      key={stats.state}   //user input for which state to show
                    >
                        <TableCell>{stats.date}</TableCell>
                        <TableCell>{stats.positive}</TableCell>
                        <TableCell>{stats.negative}</TableCell>
                        <TableCell>{stats.hospitalizedCumulative}</TableCell>
                        <TableCell>{stats.inIcuCumulative}</TableCell>
                        <TableCell>{stats.onVentilatorCumulative}</TableCell>
                        <TableCell>{stats.death}</TableCell>
                        
                  </TableRow>
                  ))}
                </TableBody>
                </Table>
            </TableContainer>
            
            </Fragment>


          );
   
 
}
   
export default CovidAPI;




