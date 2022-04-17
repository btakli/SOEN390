import { Fragment } from "react";

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

const rows = [
    createData('Version', "1.0"),
    createData('Color Scheme', "Light"),
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: theme.palette.common.white,
    },
  }));

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
                                <StyledTableCell><b>Setting</b></StyledTableCell>
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

export default Settings;