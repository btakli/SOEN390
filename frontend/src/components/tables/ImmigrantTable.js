import { React, Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getImmigrants } from '../../redux/actions/immigrantActions';
import StatusViewRequest from '../StatusViewRequest';

import PriorityToggle from '../PriorityToggle';

// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


function ImmigrantTable(props) {
  const [open, setOpen] = useState(false);
  const [immigrantId, setImmigrantId] = useState(0);

  const handleDialogOpen = (id) => {
    setImmigrantId(id);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    props.getImmigrants();
  }, []);

  return (
    <Fragment>
      <StatusViewRequest open={open} onClose={handleDialogClose} immigrantId={immigrantId} />
      <TableContainer component={Paper}  sx={{ width: 2/3, margin: 'auto'}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First</TableCell>
              <TableCell>Last</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Immigrant Status</TableCell>
              <TableCell>View Status</TableCell>
              <TableCell>Priority</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.immigrants.map((immigrant) => (
            <TableRow
                key={immigrant.user}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell>{immigrant.first_name}</TableCell>
                <TableCell>{immigrant.last_name}</TableCell>
                <TableCell>{immigrant.email}</TableCell>
                <TableCell>{immigrant.date_of_birth}</TableCell>
                <TableCell>{immigrant.immigration_status}</TableCell>
                <TableCell>                  
                <Button variant="contained" color="success" onClick={() => handleDialogOpen(immigrant.user)}>
                    See Status
                </Button>
                </TableCell>
                <TableCell> <PriorityToggle value={immigrant.is_immigrant_priority} id={immigrant.user} is_immigrant={immigrant.is_immigrant}/> </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}

ImmigrantTable.propTypes = {
  immigrants: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  immigrants: state.patientReducer.patients
});

export default connect(mapStateToProps, { getImmigrants })(ImmigrantTable);
