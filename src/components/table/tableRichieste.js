
/*

export default function BasicTable() {
  return (
    <TableContainer className="tableOffers">
      <Table style={{ width: '80%', marginLeft: "50px" }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "green", fontWeight: 'bold' }}>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="right">Request_id</TableCell>
            <TableCell align="right">Start</TableCell>
            <TableCell align="right">End</TableCell>
            <TableCell align="right">Energy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nameTab}
              </TableCell>
              <TableCell align="right">{row.request_id}</TableCell>
              <TableCell align="right">{row.start}</TableCell>
              <TableCell align="right">{row.end}</TableCell>
              <TableCell align="right">{row.energy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
} */

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(request_id, start, end, energy) {
  return { request_id, start, end, energy };
}

const rows = [
  createData('0', 159, 6.0, 24),
  createData(1, 237, 9.0, 37),
  createData(2, 262, 16.0, 24),
  createData(3, 305, 3.7, 67),
  createData(4, 356, 16.0, 49),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper} sx={{ width: "800px" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#7CFC00", fontWeight: 'bold' }}>
          <TableRow>
          <TableCell align="right">Request_id</TableCell>
            <TableCell align="right">Start</TableCell>
            <TableCell align="right">End</TableCell>
            <TableCell align="right">Energy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.request_id}
              </TableCell>
              <TableCell align="right">{row.start}</TableCell>
              <TableCell align="right">{row.end}</TableCell>
              <TableCell align="right">{row.energy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
