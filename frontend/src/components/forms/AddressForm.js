import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addAddresses, getAddresses } from "../../redux/actions/addressActions";
import { createMessage } from "../../redux/actions/messageActions";

// MUI
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function AddressForm(props) {
  const emptyForm = {
    name: "",
    streetNumber: "",
    streetName: "",
    city: "",
    province: "",
    postalCode: "",
  };

  // Store form data in state
  const [state, setState] = useState(emptyForm);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //handle table rows and pages
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Change form data in state at each change
  const handleChange = (e) =>
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, streetNumber, streetName, city, province, postalCode } =
      state;

    const newAddress = {
      name,
      streetNumber,
      streetName,
      city,
      province,
      postalCode,
    };
    props.addAddresses(newAddress);
    setState({
      name: "",
      streetNumber: "",
      streetName: "",
      city: "",
      province: "",
      postalCode: "",
    });
    props.getAddresses();
  };

  useEffect(() => {
    props.getAddresses();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={4} sx={{ mt: 3 }} justifyContent="center">
        <Grid item xs={12} sm={3}>
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Add a New Address
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Place Name"
                    autoFocus
                    value={state.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="streetNumber"
                    required
                    fullWidth
                    id="streetNumber"
                    label="Street Number"
                    value={state.streetNumber}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="streetName"
                    required
                    fullWidth
                    id="streetName"
                    label="Street Name"
                    value={state.streetName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="city"
                    required
                    fullWidth
                    id="city"
                    label="City"
                    value={state.city}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="province"
                    required
                    fullWidth
                    id="province"
                    label="Province"
                    value={state.province}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="postalCode"
                    required
                    fullWidth
                    id="postalCode"
                    label="Postal Code"
                    value={state.postalCode}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ ml: 4 }} />
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
      </Grid>
    </ThemeProvider>
  );
}

AddressForm.propTypes = {
  addAddresses: PropTypes.func.isRequired,
  addresses: PropTypes.array.isRequired,
  createMessage: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  addresses: state.addressReducer.addresses,
});

export default connect(mapStateToProps, {
  addAddresses,
  getAddresses,
  createMessage,
})(AddressForm);
