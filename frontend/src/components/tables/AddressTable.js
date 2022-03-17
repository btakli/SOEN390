import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addAddress, getAddresses } from "../../redux/actions/addressActions";

// MUI
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";

const theme = createTheme();

function createData(
  name,
  streetNumber,
  streetName,
  city,
  province,
  postalCode
) {
  return { name, streetNumber, streetName, city, province, postalCode };
}

const rows = [createData("", "", "", "", "", "")];

function AddressForm(props) {

  useEffect(() => {
    props.getAddresses();
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //handle table rows and pages
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <ThemeProvider theme={theme}>
        <Grid item xs={12} sm={8}>
            <Box
            sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
            }}
            >
            <Typography component="h1" variant="h5">
                List of Addresses You Visited
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ bgcolor: "#101F33", color: "#fff" }}>
                    <TableRow>
                    <TableCell sx={{ color: "#fff" }}>Place Name</TableCell>
                    <TableCell align="right" sx={{ color: "#fff" }}>
                        Address
                    </TableCell>
                    <TableCell align="right" sx={{ color: "#fff" }}>
                        City
                    </TableCell>
                    <TableCell align="right" sx={{ color: "#fff" }}>
                        Province
                    </TableCell>
                    <TableCell align="right" sx={{ color: "#fff" }}>
                        Postal Code
                    </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.addresses.map((item, i) => (
                    <TableRow
                        hover
                        key={i}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                        {item.name}
                        </TableCell>
                        <TableCell align="right">
                            {item.streetNumber} {item.streetName}
                        </TableCell>
                        <TableCell align="right">{item.city}</TableCell>
                        <TableCell align="right">{item.province}</TableCell>
                        <TableCell align="right">{item.postalCode}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                sx={{ alignItems: "right" }}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Box>
        </Grid>
    </ThemeProvider>
  );
}

AddressForm.propTypes = {
  addresses: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  addresses: state.addressReducer.addresses,
});

export default connect(mapStateToProps, { getAddresses })(AddressForm);
