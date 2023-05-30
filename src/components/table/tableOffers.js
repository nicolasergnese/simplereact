import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

//import OffersService from '../../services/tableOffersSevices';

function createData(nameTab, auhthorTab, priceTab) {
  return { nameTab, auhthorTab, priceTab };
}

const rows = [
  createData(2, 2, 2), //name.author, price
  createData('5', 'fm: 0x...', 30),
  createData('6', 'fm: 0x...', 20),
  createData('7', 'fm: 0x...', 20),
];

/* const rowsList = rows.map(row => (
   key=row.nameTab
));

 */


/* useEffect(() => {//covine usare fecth
  const fetchData = async () => {
    const response = await fetch('http://localhost:3000//api//offer');
    const result = await response.json();
    setName(result);
    setAuthor(result);
    setPrice(result);
  };
  fetchData();
}, []);*/


/* const [name, setName] = useState([])
const [price, setPrice] = useState([])
const [author, setAuthor] = useState([]) */

/* const handleSubmitClick = (e) => { //questo metodo o fetch?
  console.log("send data")
  //e.preventDefault();
  const payload = {
    "name": createData[0],
    "author": createData[1],
    "price": createData[2],
  }
  OffersService.offers(payload)
    .then((response) => {
      console.log(response);
      setName(response.data)
      setAuthor(response.data)
      setPrice(response.data)
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
}  */


export default function BasicTable() {
  return (
    <TableContainer className="tableOffers">
      <Table style={{ width: '80%', marginLeft: "50px" }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#38ACEC", fontWeight: 'bold' }}>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">Price</TableCell>
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
              <TableCell align="right">{row.auhthorTab}</TableCell>
              <TableCell align="right">{row.priceTab}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}