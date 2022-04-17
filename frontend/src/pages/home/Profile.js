import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
    Box,
    Typography,
    Card,
    CardContent,
    Divider,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
} from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

function createData(name, value) {
    return { name, value };
}

function getUserTitle(user){
    if(user.is_doctor){
      return "Dr. ";
    } 
  
    if(user.is_immigration_officer){
      return "Officer ";
    } 
  
    return "";
}

function getUserType(user){
    if(user.is_doctor){
      return "Doctor";
    } 
  
    if(user.is_immigration_officer){
      return "Immigration Officer";
    } 
  
    return "Patient";
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: theme.palette.common.white,
    },
  }));

function Profile(props){

    const rows = [
        createData('Name', `${getUserTitle(props.auth.user)}${props.auth.userData.first_name} ${props.auth.userData.last_name}`),
        createData('User Type', `${getUserType(props.auth.user)}`),
        createData('Email', `${props.auth.user.email}`),
        createData('Date of Birth', `${props.auth.userData.date_of_birth}`),
        createData('Gender', `${props.auth.userData.gender}`),
        createData('Address', `${props.auth.userData.address}`),
        createData('City', `${props.auth.userData.city}`),
        createData('Postal Code', `${props.auth.userData.postal_code}`),
    ];

    return (
        <Card align="center">
            <CardContent>
                <Box sx={{ width: "100%" }} pb={2}>
                    <Typography
                    variant="h5"
                    align="left"
                    gutterBottom
                    component="div"
                    >
                        Profile
                    </Typography>
                    <Divider />
                </Box>

                <TableContainer component={Paper} sx={{ width: "40%" }}>
                    <Table aria-label="table">
                        <TableHead sx={{ bgcolor: "#2196f3" }}>
                            <TableRow>
                                <StyledTableCell><b>Information</b></StyledTableCell>
                                <StyledTableCell align="right"><b>Value</b></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.value}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
  
              
            </CardContent>
        </Card>
    )
}

Profile.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.authReducer,
});

export default connect(mapStateToProps)(Profile);