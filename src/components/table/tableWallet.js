import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//import OffersService from '../../services/tableWalletSevices';

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
  OffersService.offers(payload) ?
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
        <TableContainer component={Paper} sx={{ width: "500px" }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: "#d3d3d3", fontWeight: 'bold', textAlign: "center" }}>DSO WALLET</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: "center" }}>966 ST</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: "#d3d3d3", textAlign: "center" }}> 0x5A...</TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer>
    );
}