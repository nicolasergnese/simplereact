import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, totalNumber, numberAvailable, totalInstalledPower, actualPowerOutput) {
  return { name, totalNumber, numberAvailable, totalInstalledPower, actualPowerOutput };
}

const rows = [
  createData('End user', 43, 'number of devices that are actually included in the dashboard', 129, 'sum  of the active power of all the devices from SYN'),
  createData('ASM Headquarter', 5, 'number of devices that are actually included in the dashboard', 0, 'sum  of the active power of all the devices from SYN'),
  createData('Total', 'some of the above values', 'some of the above values', 'some of the above values', 'some of the above values'),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#38ACEC", fontWeight: 'bold' }}>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Total number</TableCell>
            <TableCell align="right">Number available</TableCell>
            <TableCell align="right">Total installed power</TableCell>
            <TableCell align="right">Actual power output </TableCell>
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
              <TableCell align="right">{row.totalNumber}</TableCell>
              <TableCell align="right">{row.numberAvailable}</TableCell>
              <TableCell align="right">{row.totalInstalledPower}</TableCell>
              <TableCell align="right">{row.actualPowerOutput}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
