import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { Select, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


import TablePagination from '@mui/material/TablePagination';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { format } from 'date-fns';



import './Components.css';



export default function CreateDsoDahsboard() {


    //inizio codice per Energy
    const [energyValue, setEnergyValue] = useState("");
    const [maxPriceValue, setMaxPriceValue] = useState("");
    const [chargingStationId, setChargingStationId] = useState(''); //attributo per le select, menu a tendina
    const [failMessageSubmit, setFailMessageSubmit] = useState(false)
    const [failMessageWinning, setFailMessageWinning] = useState(false)

    const handleInputChangeEnergy = (event) => { //serve per modificare il valore e salvarlo
        setEnergyValue(event.target.value);
    };

    //codice  finito per Energy

    //inizio codice per il DateAndTime
    const [valueStart, setValueStart] = useState(dayjs(new Date())); //setto valore iniziale
    const [valueEnd, setValueEnd] = useState(dayjs(new Date())); //setto valore iniziale

    const handleChangeDateAndTimeStart = (newValue) => { //funzione per settare un nuovo stato;
        setValueStart(newValue);
    };
    const handleChangeDateAndTimeEnd = (newValue) => { //funzione per settare un nuovo stato
        setValueEnd(newValue);
    };

    const sendDataEnergyValueToBackend = () => {
        const epochDateEnd = valueEnd.unix(); //valore data in epoch
        const epochDateStart = valueStart.unix();
        fetch("http://localhost:8080/api/dataenergyvalue", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                dateend: epochDateEnd,
                datestart: epochDateStart,
                energyvalue: energyValue, // Valore dell'energia da inviare
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Gestisci la risposta dal backend
                console.log("Risposta dal backend:", data);
            })
            .catch((error) => {
                // Gestisci l'errore
                console.error("Errore durante la richiesta al backend:", error);
            });
    };

    //inizio codice per maxPrice
    const handleSelect1Change = (event) => { //funzione per settare lo stato iniziale
        const value = event.target.value;
        setChargingStationId(value);
    };
    //codice finito per select charging station id

    //inizio codice table richieste in verde
    const [rows, setRows] = useState([]);

    function createDataRequestNew(request_id, start, end, energy) {
        return { request_id, start, end, energy };
    }

    const columns = [
        { id: 'request_id', label: 'Request_ID', minWidth: 170 },
        { id: 'start', label: 'Start', minWidth: 100 },
        {
            id: 'end',
            label: 'End',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'energy',
            label: 'Energy',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toLocaleString('en-US'),
        },
    ];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = +event.target.value;
        setRowsPerPage(newRowsPerPage);
        setPage(0);
    };
    const addRowRequestNew = (requestID, valueStartRequest, valueEndRequest, valueEnergyRequest) => {
        if (requestID !== undefined && valueStartRequest !== undefined && valueEndRequest !== undefined && valueEnergyRequest !== undefined) {
            const formattedStartRequest = valueStartRequest.toLocaleString(); // Converte la data in una stringa leggibile con data e ora
            const newRow = createDataRequestNew(requestID, formattedStartRequest, valueEndRequest, valueEnergyRequest);
            setRows(prevRows => [...prevRows, newRow]);
        }
    };


    const tablerequest = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/tablerequeststart", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                setRows([]);
                const responseData = await response.json(); //prendo lista offers
                //console.log(responseData);
                const requests = responseData.requests;//prendo le request 
                //console.log('request', requests)
                requests.forEach((request) => { //prendo i dati da ciascuna request e setto attributi taballe
                    const tempRequestID = request.id;
                    const tempDateEnd = request.deadline;
                    const extraValues = request.extra;
                    const endRequest = tempDateEnd;
                    const energyRequest = extraValues[0];
                    const startDateRequest = new Date(extraValues[1] * 1000);
                    const formattedStartDateRequest = startDateRequest.toLocaleString(); // Converte la data in una stringa leggibile con data e ora
                    //console.log(request.id);
                    //console.log(startRequest);
                    addRowRequestNew(tempRequestID, formattedStartDateRequest, endRequest, energyRequest);
                    console.log('tablerequeststart')
                });
                return responseData;
            } else {
                // handle error
                console.log(response);
                const errorResponse = {
                    status: response.status,
                    message: response.statusText,
                };
                return errorResponse;
            }
        } catch (error) {
            // handle network error
            console.log(error);
            const errorResponse = {
                status: 503,
                message: "ERR_NETWORK",
            };
            return errorResponse;
        }
    };

    const handleSubmitClick = async () => {
        try {
            setFailMessageSubmit(false);
            const response = await fetch("http://localhost:8080/api/tablerequest", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                setRows([])
                const responseData = await response.json(); //prendo lista offers
                //console.log(responseData);
                const requests = responseData.requests;//prendo le request 
                //console.log('request', requests)
                requests.forEach((request) => { //prendo i dati da ciascuna request e setto attributi taballe
                    const tempRequestID = request.id;
                    const tempDateEnd = request.deadline;
                    const extraValues = request.extra;
                    const endRequest = tempDateEnd;
                    const energyRequest = extraValues[0];
                    const startDate = new Date(extraValues[1] * 1000);
                    const formattedStartDate = startDate.toLocaleString(); // Converte la data in una stringa leggibile con data e ora
                    //console.log(request.id);
                    //console.log(startRequest);
                    addRowRequestNew(tempRequestID, formattedStartDate, endRequest, energyRequest);
                });
                return responseData;
            } else {
                // handle error
                console.log(response);
                const errorResponse = {
                    status: response.status,
                    message: response.statusText,
                };
                return errorResponse;
            }

        } catch (error) {
            // handle network error
            console.log(error);
            const errorResponse = {
                status: 503,
                message: "ERR_NETWORK",
            };
            return errorResponse;
        }
    };
    //codice finito per table richieste in verde

    //inizio codice table offers in blu
    const [winnerID, setwinnerID] = useState('');
    const [minExtraValue, setminExtraValue] = useState('');

    function createDataOffers(nameTab, auhthorTab, priceTab) {
        return { nameTab, auhthorTab, priceTab };
    }
    const [rowsOffer, setRowsOffer] = useState([
    ]);

    const getWinningOffer = async () => {
        try {
            if (IDUser === '') {
                setFailMessageWinning(true);
            } else {
                setFailMessageWinning(false);
                setRowsOffer([]);
                sendDataIDUserToBackend();
                getRequestToBackend();
                fetch('http://localhost:8080/api/offers')
                    .then(response => response.json())
                    .then(data => {
                        setwinnerID(data.winnerID);
                        setminExtraValue(data.minExtraValue);
                        const dataOffer = data.dataOffer;
                        dataOffer.forEach(offer => {
                            // Accesso ai dati dell'offerta singolarmente
                            const author = offer.author;
                            const idValue = offer.idValue;
                            const extraValue = offer.extraValue;
                            // Fai qualcosa con winnerID e minExtraValue
                            // Esempio di output nel console.log per ciascun oggetto
                            //console.log('Author:', author);
                            console.log('ID Value:', idValue);
                            console.log('Extra Value:', extraValue);

                            // Puoi fare qualsiasi altra elaborazione necessaria con i dati qui

                            // Esempio di chiamata a una funzione per aggiungere una riga per ogni offerta
                            addRowOffer(author, idValue, extraValue);
                        });
                        //console.log('winnerID:', winnerID);
                        //console.log('minExtraValue:', minExtraValue);
                        setOpen(true)
                        //alert(`Referring to the choice of request ID =  ${IDUser}, the winning bid in the relevant list is : # = ${winnerID} - price = ${minExtraValue}. \n\nTo see the list of offers related to the request ID, click OK`);
                    })
                    .finally(() => {

                    });
            }
        } catch (error) {
            // handle network error
            console.log(error);
            const errorResponse = {
                status: 503,
                message: "ERR_NETWORK",
            };
            return errorResponse;
        }
    }
    //inizio codice id
    const [IDUser, setIDUser] = useState('');
    const handleInputChangeIDUser = (event) => { //serve per modificare il valore e salvarlo
        setIDUser(event.target.value);
    };

    const sendDataIDUserToBackend = async () => {
        const IDRequestForOffers = parseInt(IDUser)
        fetch("http://localhost:8080/api/IDRequestForOffers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: IDRequestForOffers
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Gestisci la risposta dal backend
                console.log("Risposta dal backend:", data);
            })
            .catch((error) => {
                // Gestisci l'errore
                console.error("Errore durante la richiesta al backend:", error);
            });
    };


    const addRowOffer = (author, idValue, extraValue) => {
        const newRowOffers = createDataOffers(idValue, author, extraValue);
        setRowsOffer(prevRows => [...prevRows, newRowOffers]);
    };
    //codice finito per table offers in blu


    //inizio codice card, details dell'offerta
    const [deadlineCard, setDeadlineCard] = useState('');
    const [quantityCard, setQuantityCard] = useState('');
    const [startDateCard, setStartDateCard] = useState('');

    const getRequestToBackend = () => {
        try {
            fetch("http://localhost:8080/api/carddetails")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Errore nella richiesta al server.");
                    }
                    return response.json();
                })
                .then((data) => {
                    // Accesso ai dati dell'offerta singolarmente
                    setDeadlineCard(data.deadline);
                    const extraValue = data.extra;
                    setQuantityCard(extraValue[0]);
                    const startDate = new Date(extraValue[1] * 1000);
                    const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd HH:mm:ss');

                    //const formattedStartDate = startDate.toLocaleString(); // Converte la data in una stringa leggibile
                    setStartDateCard(formattedStartDate);
                    // Esempio di output nel console.log
                    //console.log('End Date:', deadlineCard);
                    //console.log('Quantity:', quantityCard);
                    //console.log('Start Date:', startDateCard);

                    // Puoi fare ulteriori operazioni con i dati come desiderato

                    // Aggiorna lo stato o esegui altre operazioni che dipendono dai valori recuperati
                    // ...

                })
                .catch((error) => {
                    console.error("Errore durante la richiesta al backend:", error);
                });
        } catch (error) {
            // handle network error
            console.log(error);
            const errorResponse = {
                status: 503,
                message: "ERR_NETWORK",
            };
            return errorResponse;
        }
    };
    //fine codice card

    //inizio codice alertsDialog
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };



    useEffect(() => { //per evitare due valori di energy
        //console.log(energyValue) //mi stampa quello che  scrivo in energy
        //console.log(maxPriceValue) //mi stampa quello che scrivo in maxPrice
        //console.log(chargingStationId)//mi stampa quello che scrivo in chargingStatioID
        tablerequest();
    }, [valueStart, valueEnd, energyValue, maxPriceValue, chargingStationId, , minExtraValue, winnerID]);



    return (
        <Box>
            <Typography variant="h5"
                sx={{ marginTop: "20px", color: "rgb(0, 0, 0)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
                Creating a demand for energy:
            </Typography>
            <Box> {/*qui definisco i due componenti dateAndTime*/}
                <Box>
                    <Box className="classInline">
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DemoContainer components={['DateTimePicker']}> {/*qui definisco il componente dateAndTime  start*/}
                                    <DateTimePicker sx={{ backgroundColor: "white" }}
                                        label="Start date/time"
                                        value={valueStart}
                                        onChange={handleChangeDateAndTimeStart}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DemoContainer components={['DateTimePicker']}> {/*qui definisco il componente dateAndTime  end*/}
                                    <DateTimePicker sx={{ backgroundColor: "white", marginTop: "10px" }}
                                        label="End date/time"
                                        value={valueEnd}
                                        onChange={handleChangeDateAndTimeEnd}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </FormControl>
                        <Box> {/*qui definisco il componente energy*/}
                            <TextField
                                label="Energy"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '25ch' }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Wh</InputAdornment>,
                                }}
                                value={energyValue}
                                onChange={handleInputChangeEnergy}
                            />
                            <Box> {/*qui definisco il componente maxPrice*/}
                                <Box sx={{ minWidth: 60 }}> {/*box per la select, menu a tendina, charging station id */}
                                    <FormControl sx={{ m: 1, width: '25ch' }} size="small">
                                        <InputLabel id="demo-simple-select-label">Charging Station ID</InputLabel>
                                        <Select labelId="demo-simple-select-label" id="demo-simple-select-meter" value={chargingStationId} onChange={handleSelect1Change}>
                                            <MenuItem value="opzione1">18</MenuItem>{/*definisco i sensori */}
                                            <MenuItem value="opzione2">24</MenuItem>
                                            <MenuItem value="opzione3">25</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Box sx={{ marginLeft: "10px" }}>
                                        <Box>
                                            <Button onClick={() => { sendDataEnergyValueToBackend(); handleSubmitClick(); setEnergyValue(''); setMaxPriceValue(''); setChargingStationId(''); setValueStart(''); setValueEnd('') }} sx={{ marginTop: "10px", marginLeft: "100px" }} variant="contained">Submit</Button>
                                            {failMessageSubmit && <p style={{ color: 'red' }}>Please, fill in the fields above.</p>}
                                            <Box sx={{ marginTop: "20px" }}>
                                            </Box>
                                            <Box></Box>
                                            <Typography variant="h5"
                                                sx={{ marginTop: "20px", marginLeft: "20px", color: "rgb(0, 0, 0)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
                                                Visualization of requests:
                                            </Typography>
                                            <Box className="classInline">
                                                <Paper sx={{ width: '800px', overflow: 'hidden' }}>
                                                    <TableContainer sx={{ maxHeight: 440, width: "800px" }} >
                                                        <Table stickyHeader aria-label="sticky table">
                                                            <TableHead sx={{ backgroundColor: "#7CFC00", fontWeight: 'bold' }}>
                                                                <TableRow>
                                                                    {columns.map((column) => (
                                                                        <TableCell
                                                                            key={column.id}
                                                                            align={column.align}
                                                                            style={{ minWidth: column.minWidth, backgroundColor: "#7CFC00", fontWeight: 'bold' }}
                                                                        >
                                                                            {column.label}
                                                                        </TableCell>
                                                                    ))}
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {rows
                                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                                    .map((rowRequest) => {
                                                                        return (
                                                                            <TableRow hover role="checkbox" tabIndex={-1} key={rowRequest.request_id}>
                                                                                {columns.map((column) => {
                                                                                    const value = rowRequest[column.id];
                                                                                    return (
                                                                                        <TableCell key={column.id} align={column.align}>
                                                                                            {column.format && typeof value === 'number'
                                                                                                ? column.format(value)
                                                                                                : value}
                                                                                        </TableCell>
                                                                                    );
                                                                                })}
                                                                            </TableRow>
                                                                        );
                                                                    })}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                    <TablePagination
                                                        rowsPerPageOptions={[10, 25, 100]}
                                                        component="div"
                                                        count={rows.length}
                                                        rowsPerPage={rowsPerPage}
                                                        page={page}
                                                        onPageChange={handleChangePage}
                                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                                    />
                                                </Paper>
                                            </Box>
                                            <Box>
                                                <Box>
                                                    <Typography variant="h5"
                                                        sx={{ marginTop: "20px", color: "rgb(0, 0, 0)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
                                                        Viewing the details of an energy request created:
                                                    </Typography>
                                                </Box>
                                                <Card className="card"> {/*etichetta */}
                                                    <CardContent>
                                                        <Typography variant="h5" component="div" sx={{ textAlign: "center", color: "#000000", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
                                                            Details
                                                        </Typography>
                                                        <Box className="Inline">
                                                            <Typography variant="h5" sx={{ color: "#000000", fontFamily: "Poppins, Roboto", fontSize: "20px", fontWeight: 700 }}>
                                                                Delivery interval: {startDateCard} - {deadlineCard}
                                                            </Typography>
                                                        </Box>

                                                        <Box className="Inline">
                                                            <Typography variant="h5" sx={{ color: "#000000", fontFamily: "Poppins, Roboto", fontSize: "20px", fontWeight: 700 }}>
                                                                Quantity: {quantityCard}
                                                            </Typography>
                                                        </Box>

                                                        <Box className="Inline">
                                                            <Typography variant="h5" sx={{ color: "#000000", fontFamily: "Poppins, Roboto", fontSize: "20px", fontWeight: 700 }}>
                                                                Deadline: {deadlineCard}
                                                            </Typography>

                                                        </Box>
                                                    </CardContent>

                                                </Card>
                                            </Box>
                                            <Box>
                                                <Typography variant="h5"
                                                    sx={{ marginTop: "20px", marginLeft: "20px", color: "rgb(0, 0, 0)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
                                                    Viewing bids received for the energy created:
                                                </Typography>
                                            </Box>
                                            <TableContainer component={Paper} sx={{ width: "800px" }}> {/*qui definisco il componente table offers*/}
                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                    <TableHead sx={{ backgroundColor: "#38ACEC", fontWeight: 'bold' }}>
                                                        <TableRow>
                                                            <TableCell>#</TableCell>
                                                            <TableCell align="right">Author</TableCell>
                                                            <TableCell align="right">Price</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {rowsOffer.map((rowOffer) => (
                                                            <TableRow
                                                                key={rowOffer.nameTab}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell component="th" scope="row">
                                                                    {rowOffer.nameTab}
                                                                </TableCell>
                                                                <TableCell align="right">{rowOffer.auhthorTab}</TableCell>
                                                                <TableCell align="right">{rowOffer.priceTab}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                        <Box>
                                            <Box sx={{ marginLeft: "20px" }}> {/* bottoni */}
                                                <Typography variant="h5"
                                                    sx={{ marginTop: "20px", marginLeft: "20px", color: "rgb(0, 0, 0)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
                                                    Buttons to close the transaction and let the best bid win. Enter the ID of the Request of interest:
                                                </Typography>
                                            </Box>
                                            <TextField
                                                label="ID_Request:"
                                                id="outlined-start-adornment"
                                                sx={{ m: 1, width: '25ch' }}
                                                value={IDUser}
                                                onChange={handleInputChangeIDUser}
                                            />
                                            <Button onClick={() => { getWinningOffer() }} sx={{ marginTop: "20px" }} variant="contained">Get Winning Offer</Button>
                                            {failMessageWinning && <p style={{ color: 'red' }}>Please, fill in the ID_Request field.</p>}
                                        </Box>
                                        <div>
                                            <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >

                                                <DialogContent>
                                                    <DialogContentText sx={{ fontSize: "35px" }} id="alert-dialog-description">
                                                        Winner for the Request {IDUser} is Offer {winnerID}
                                                        {/*  Referring to the choice of request ID =  {IDUser}, the winning bid in the relevant list is : # = {winnerID} - price = {minExtraValue}. */}
                                                        {"\n"}
                                                        {/* To see the list of offers related to the request ID, click OK` */}
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleClose} autoFocus>
                                                        OK
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}