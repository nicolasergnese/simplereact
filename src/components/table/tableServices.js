import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, totalNumber, forecast, optimization) {
  return { name, totalNumber, forecast, optimization };
}

const rows = [
  createData('ASM Headquarter', 5, 'number of devices that are actually included in the dashboard', ''),
  createData('Grid asset', 30, '', 'number of lines for which axtually exist the optimized data'),
  createData('Total', 35, 'number of devices that are actually included in the dashboard', 'number of lines for which axtually exist the optimized data'),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#38ACEC", fontWeight: 'bold' }}>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Total number</TableCell>
            <TableCell align="right">Forecast</TableCell>
            <TableCell align="right">Optimization</TableCell>
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
              <TableCell align="right">{row.forecast}</TableCell>
              <TableCell align="right">{row.optimization}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
