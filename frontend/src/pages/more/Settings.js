import { Fragment } from "react";

import {
    Box,
    Typography,
    Grid,
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

function createData(name, value) {
    return { name, value };
}

const rows = [
    createData('Version', "1.0"),
    createData('Color Scheme', "Light"),
];

function Settings(){
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
                        Settings
                    </Typography>
                    <Divider />
                </Box>

                <TableContainer component={Paper} sx={{ width: "40%" }}>
                    <Table aria-label="a dense table">
                        <TableHead sx={{ bgcolor: "#2196f3" }}>
                            <TableRow>
                                <TableCell>Setting</TableCell>
                                <TableCell align="right">Value</TableCell>
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

export default Settings;