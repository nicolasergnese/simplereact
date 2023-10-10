import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';//grafico che voglio
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

import FormControl from '@mui/material/FormControl';

import { Select, MenuItem } from '@mui/material';

import Typography from '@mui/material/Typography';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { useTheme } from '@mui/material/styles';

import axios from 'axios';


ChartJS.register( //caratteristiche chart
    Title, Tooltip, LineElement, Legend,
    CategoryScale, LinearScale, PointElement
)

export default function CreateChart() {

    //inizia il codice per le select, menu a tendina

    const [sensor, setSensor] = useState(''); //attributo per le select, menu a tendina
    const [serviceId, setServiceId] = useState('');//attributo per le select, menu a tendina 
    const [labelCharter, setLabelCharter] = useState('')//per settare la legenda del charter
    const [numbers, setNumbers] = useState([]) //stato per modificare le y, ossia il value
    const [dateTime, setDateTime] = useState([]) //stato per modificare le x, ossia il dateTime
    const [numberRecord, setNumberRecord] = useState(''); //attributo per le select, menu a tendina


    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const sensorID = [ //nomi dei sensori
        'ASMT03-0x0006',
    ];


    function getStyles(name, sensor, theme) {
        return {
            fontWeight:
                sensor === sensorID
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const theme = useTheme();
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSensor(value);
    };

    const handleSelectServiceIdChange = (event) => { //funzione per settare lo stato iniziale
        const value = event.target.value;
        setServiceId(value);
        // Effettua le modifiche ai valori della seconda select in base alla selezione nella prima select
    };

    const handleSelectNumberRecordChange = (event) => { //funzione per settare lo stato iniziale
        const value = event.target.value;
        setNumberRecord(value);
        // Effettua le modifiche ai valori della seconda select in base alla selezione nella prima select
    };

    const sendSelectNumberRecord = () => { //funzione per mandare i dati al back-end per la select, menu a tendina
        fetch('http://localhost:8080/api/numberRecord', { //collegamento back-end
            method: 'POST',
            body: JSON.stringify({ numberRecord }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .catch((error) => {
                // Gestisci gli errori se necessario
                console.error(error);
            });
    }
    //codice finito per select, menu a tendina

    //inizio codice per lo chart
    const [chart, setChart] = useState({//setto stto iniziale dello chart, attributi
        labels: [], // asse x
        datasets: [
            {
                label: "",
                // y-axis data plotting values
                data: [], //andamento grafico
                fill: false,
                borderWidth: 2, //spessore
                backgroundColor: "red", //colore punti
                borderColor: 'blue', //colore linea
                PointBorderColour: 'red',
                responsive: true
            },
        ],
    });

    const changeLabels = () => {
        if (serviceId === '1') {
            setLabelCharter('o.metric.current_calc')
        }
        else if (serviceId === '2') {
            setLabelCharter('o.metric.temperature.remote')
        }
    }

    function newChart() {
        changeLabels();
        setChart({ //funzione bottone per cambiare grafico
            labels: dateTime, // asse x
            datasets: [
                {
                    label: labelCharter,
                    // y-axis data plotting values
                    data: numbers, //andamento grafico
                    fill: false,
                    borderWidth: 2, //spessore
                    backgroundColor: "red", //colore punti
                    borderColor: 'blue', //colore linea
                    PointBorderColour: 'red',
                    responsive: true
                },
            ],
        })
    }

    const handleSubmitClick = async () => { //funzione per riempire il charter con il bottone search
        try {
            const response = await fetch("http://localhost:8080/api/chartDateTimeEnergiot", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData)
                let tempDateTime = [];
                let tempValue = [];
                if (serviceId === '1') {
                    responseData.forEach((element) => {
                        console.log(element['o.data.timestamp'])
                        const date = new Date(element['o.data.timestamp'] * 1000); // Moltiplica per 1000 per convertire da secondi a millisecondi
                        const options = {
                            year: 'numeric',
                            month: '2-digit', // Due cifre per il mese
                            day: '2-digit',   // Due cifre per il giorno
                            hour: '2-digit',  // Due cifre per l'ora
                            minute: '2-digit', // Due cifre per i minuti
                            second: '2-digit', // Due cifre per i secondi
                        };
                        const formattedDate = date.toLocaleString('it-IT', options); // Specifica il codice di lingua "it-IT"
                        //const formattedDate = date.toLocaleDateString(); // Puoi personalizzare il formato se lo desideri
                        console.log(formattedDate)
                        // Accedi agli attributi ontime e value per ciascun elemento e aggiungili agli array temporanei
                        tempDateTime.push(formattedDate);
                        tempValue.push(element['o.metric.current_calc']);
                    });
                } else if (serviceId === '2') {
                    responseData.forEach((element) => {
                        console.log(element['o.data.timestamp'])
                        const date = new Date(element['o.data.timestamp'] * 1000); // Moltiplica per 1000 per convertire da secondi a millisecondi
                        const options = {
                            year: 'numeric',
                            month: '2-digit', // Due cifre per il mese
                            day: '2-digit',   // Due cifre per il giorno
                            hour: '2-digit',  // Due cifre per l'ora
                            minute: '2-digit', // Due cifre per i minuti
                            second: '2-digit', // Due cifre per i secondi
                        };
                        const formattedDate = date.toLocaleString('it-IT', options); // Specifica il codice di lingua "it-IT"
                        //const formattedDate = date.toLocaleDateString(); // Puoi personalizzare il formato se lo desideri
                        console.log(formattedDate)
                        // Accedi agli attributi ontime e value per ciascun elemento e aggiungili agli array temporanei
                        tempDateTime.push(formattedDate);
                        tempValue.push(element['o.metric.temperature.remote']);
                        //tempValue.push(element['o.metric.temperature.ambient']);
                    });
                }
                console.log(tempValue)
                console.log(tempDateTime)
                setNumbers(tempValue); //setto valori per il grafico nuovo
                setDateTime(tempDateTime)
                newChart(); //avvio funzione per cambiare stato allo chart
                return responseData;
            }
        }
        catch (error) {
            // handle network error
            console.log(error);
            const errorResponse = {
                status: 503,
                message: "ERR_NETWORK",
            };
            return errorResponse;
        }
    }

    useEffect(() => { //per evitare di cliccare due volte il bottone per generare il grafico
        newChart();
    }, [numbers, dateTime, serviceId, newChart]);



    return (
        <Box sx={{ minWidth: 60 }}> {/*box per la prima select, menu a tendina, meter */}
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-multiple-name-label">Sensor</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={sensor}
                    onChange={handleChange}
                    input={<OutlinedInput label="Sensor" />}
                    MenuProps={MenuProps}
                >
                    {sensorID.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, sensor, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Box> {/*box per la seconda select, menu a tendina, power */}
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-simple-select-label" disabled={!sensor}>Service id</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select-meter" value={serviceId} onChange={handleSelectServiceIdChange} disabled={!sensor}>{/*Disabilita la seconda select se la prima select non è selezionata*/}
                        <MenuItem value="1">o.metric.current_calc </MenuItem>{/*definisco i sensori */}
                        <MenuItem value="2">o.metric.temperature.remote</MenuItem>
                        {/* <MenuItem value="2">o.metric.temperature.ambient</MenuItem> */}
                    </Select>
                </FormControl>
                <Typography variant="h5"
                    sx={{ marginTop: "20px", color: "rgb(42, 182, 131)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
                    Last n record
                </Typography> {/*serve per il testo visualizzato in pagina*/}
                <Box textAlign={"center"} sx={{ marginTop: 5 }}>
                    <Button variant="contained" onClick={() => { handleSubmitClick(); }}> Search</Button> {/*qui definisco il bottone search, dove al click sono collegati le funzioni per mandare i dati al server per eseguire la query(sendSelectBackend(); sendDataStartToBackend(); sendDataEndToBackend();) e la funzione per prendere i dati dalla query e metterli sullo chart (handleSubmitClick())*/}
                    <Box sx={{ marginTop: '20px', height: '600px', width: '1300px' }}>
                        <Line data={chart}></Line> {/*qui definisco il componente chart*/}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}


