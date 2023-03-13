import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function Home({ setList, list }) {
  const [values, setValues] = useState({
    "Self consumption rate (%)": 0,
    'Self suffeiciency rate (%)': 0,
    'Reverse power Flow(kWh)': 0,
    'Flexibile energy shifted(kWh)': 0,
    'Voltage issues(#)': 0
  });
  function getRandom(max) {
    return (Math.random() * max);
  }

  useEffect(() => {
    setTimeout(() => {
      setValues({
        "Self consumption rate (%)": getRandom(100),
        'Self suffeiciency rate (%)': getRandom(100),
        'Reverse power Flow(kWh)': getRandom(100),
        'Flexibile energy shifted(kWh)': getRandom(100),
        'Voltage issues(#)': getRandom(100),
      });
    }, 2000);
    // Update count to be 5 after timeout is scheduled
    console.log(Object.keys(values));
  }, [values]);



  const table = () => {
    return(
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor:"#38ACEC", fontWeight: 'bold' }}>
          <TableRow>
            <TableCell>Monitoring Device</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(values).map((row) => (
            <TableRow
              key={row}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row}
              </TableCell>
              <TableCell align="right">{values[row]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
  }

  const handleClickClien = (e) => {

  }
  // if (list.length === 0) {

  // }

  return (
    <Box sx={{ flexGrow: 1, minHeight: "90vh" }}>
      <Paper elevation={0}
        sx={{ textAlign: "left" }} >
        <Container maxWidth="xl">
          <Typography variant="h5"
            sx={{ color: "rgb(42, 182, 131)", fontFamily: "Poppins, Roboto", fontSize: "16px", fontWeight: 700 }}>
            Homepage
          </Typography>
          <Typography variant="h4"
            sx={{ color: "rgba(0, 0, 0, 0.6)", fontFamily: "Poppins, Roboto", fontWeight: 400 }}>
            Welcome to Asm Monitoring Application
          </Typography>
        </Container>
      </Paper>
      <Container maxWidth="xl" sx={{ marginTop: "3vh", marginBottom: "3vh", padding: "5%" }}>
        <Box sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }}>
          {table()}
        </Box>
      </Container>
    </Box>
  );

}