import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';//grafico che voglio
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


import InputLabel from '@mui/material/InputLabel';

import FormControl from '@mui/material/FormControl';

import { Select, MenuItem } from '@mui/material';

import Typography from '@mui/material/Typography';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';



ChartJS.register( //caratteristiche chart
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement
)

export default function CreateChart() {

  //inizia il codice per le select, menu a tendina

  const [meter, setMeter] = useState(''); //attributo per le select, menu a tendina
  const [power, setPower] = useState('');//attributo per le select, menu a tendina
  const [labelCharter, setLabelCharter] = useState('')//per settare la legenda del charter
  const [valueStart, setValueStart] = useState(dayjs(new Date())); //setto valore iniziale
  const [valueEnd, setValueEnd] = useState(dayjs(new Date())); //setto valore iniziale
  const [failMessage, setFailMessage] = useState(false)

  const handleSelect1Change = (event) => { //funzione per settare lo stato iniziale
    const value = event.target.value;
    setMeter(value);
    // Effettua le modifiche ai valori della seconda select in base alla selezione nella prima select
    if (value === 'opzione1') {
      setPower('Power_P_1_7_0_W2.CV');
    } else if (value === 'opzione2') {
      setPower('Power_P_1_7_0_W4.CV'); // Modifica qui per assegnare un valore corretto
    } else if (value === 'opzione3') {
      setPower('Power_P_1_7_0_W5.CV'); // Modifica qui per assegnare un valore corretto
    } else if (value === 'opzione4') {
      setPower('Power_P_1_7_0_W6.CV'); // Modifica qui per assegnare un valore corretto
    }
  };

  const sendPoweDateStartAndDateEndBackend = () => { //funzione per mandare i dati al back-end per la select, menu a tendina
    //console.log("send data")
    const formattedDateStart = valueStart.toDate()
    const formattedDateEnd = valueEnd.toDate()
    fetch('http://localhost:8080/api/powerDateStartAndDateEnd', { //collegamento back-end
      method: 'POST',
      body: JSON.stringify({ power, formattedDateStart, formattedDateEnd }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Gestisci la risposta del backend se necessario
        //console.log(data);
      })
      .catch((error) => {
        // Gestisci gli errori se necessario
        console.error(error);
      });
  }
  //codice finito per select, menu a tendina
  const handleChangeDateAndTimeStart = (newValue) => { //funzione per settare un nuovo stato;
    setValueStart(newValue);
  };
  const handleChangeDateAndTimeEnd = (newValue) => { //funzione per settare un nuovo stato
    setValueEnd(newValue);
  };

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
  //console.log(values.datasets[0].data) //stampo valore data
  const [numbers, setNumbers] = useState([]) //stato per modificare le y, ossia il value
  const [dateTime, setDateTime] = useState([]) //stato per modificare le x, ossia il dateTime


  const changeLabels = () => {
    if (power === 'Power_P_1_7_0_W2.CV') {
      setLabelCharter('Active power [kW]')
    }
    else if (power === 'Power_Q_3_7_0_W2.CV') {
      setLabelCharter('Reactive power [kVAR]')
    }
    else if (power === 'Power_S_9_7_0_W2.CV') {
      setLabelCharter('Apparent power [kVA]')
    }
    else if (power === 'Power_P_1_7_0_W4.CV') {
      setLabelCharter('Active power [kW]')
    }
    else if (power === 'Power_Q_3_7_0_W4.CV') {
      setLabelCharter('Reactive power [kVAR]')
    }
    else if (power === 'Power_S_9_7_0_W4.CV') {
      setLabelCharter('Apparent power [kVA]')
    }
    else if (power === 'Power_P_1_7_0_W5.CV') {
      setLabelCharter('Active power [kW]')
    }
    else if (power === 'Power_Q_3_7_0_W5.CV') {
      setLabelCharter('Reactive power [kVAR]')
    }
    else if (power === 'Power_S_9_7_0_W5.CV') {
      setLabelCharter('Apparent power [kVA]')
    }
    else if (power === 'Power_P_1_7_0_W6.CV') {
      setLabelCharter('Active power [kW]')
    }
    else if (power === 'Power_Q_3_7_0_W6.CV') {
      setLabelCharter('Reactive power [kVAR]')
    }
    else if (power === 'Power_S_9_7_0_W6.CV') {
      setLabelCharter('Apparent power [kVA]')
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
      if (meter === '' || power === '' || valueStart === '' || valueEnd === '') {
        setFailMessage(true);
      } else {
        setFailMessage(false);
        const response = await fetch("http://localhost:8080/api/chartDateTime", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const responseData = await response.json();
          //console.log(responseData)
          let tempDateTime = [];
          let tempValue = [];
          responseData.forEach((element) => {
            tempDateTime.push(element.DATETIME); // Accesso al valore DateTime per ogni elemento
            tempValue.push(element.VALUE);
            //console.log(responseData);
          });
          //console.log(tempValue)
          //console.log(tempDateTime)
          setNumbers(tempValue); //setto valori per il grafico nuovo
          setDateTime(tempDateTime)
          newChart(); //avvio funzione per cambiare stato allo chart
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


  useEffect(() => { //per evitare di cliccare due volte il bottone per generare il grafico
    newChart();
  }, [numbers, dateTime, power, newChart]);



  return (
    <Box sx={{ minWidth: 60 }}> {/*box per la prima select, menu a tendina, meter */}
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-label">Meter</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select-meter" value={meter} onChange={handleSelect1Change}>
          <MenuItem value="opzione1">aggregated PV and EV charging station</MenuItem>{/*definisco i sensori */}
          <MenuItem value="opzione2">ASM headquarters</MenuItem>
          <MenuItem value="opzione3">EV charging station Fast</MenuItem>
          <MenuItem value="opzione4">PV plant 185 KW</MenuItem>
        </Select>
      </FormControl>
      <Box> {/*box per la seconda select, menu a tendina, power */}
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-simple-select-label" disabled={!meter}>Power</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select-power" value={power} disabled={!meter} onChange={(event) => setPower(event.target.value)}>
            {meter === 'opzione1' && [
              <MenuItem key="valore1" value="Power_P_1_7_0_W2.CV">Active power [kW]</MenuItem>,
              <MenuItem key="valore2" value="Power_Q_3_7_0_W2.CV">Reactive power [kVAR]</MenuItem>,
              <MenuItem key="valore3" value="Power_S_9_7_0_W2.CV">Apparent power [kVA]</MenuItem>
            ]}
            {meter === 'opzione2' && [
              <MenuItem key="valore4" value="Power_P_1_7_0_W4.CV">Active power [kW]</MenuItem>,
              <MenuItem key="valore5" value="Power_Q_3_7_0_W4.CV">Reactive power [kVAR]</MenuItem>,
              <MenuItem key="valore6" value="Power_S_9_7_0_W4.CV">Apparent power [kVA]</MenuItem>
            ]}
            {meter === 'opzione3' && [
              <MenuItem key="valore7" value="Power_P_1_7_0_W5.CV">Active power [kW]</MenuItem>,
              <MenuItem key="valore8" value="Power_Q_3_7_0_W5.CV">Reactive power [kVAR]</MenuItem>,
              <MenuItem key="valore9" value="Power_S_9_7_0_W5.CV">Apparent power [kVA]</MenuItem>
            ]}
            {meter === 'opzione4' && [
              <MenuItem key="valore10" value="Power_P_1_7_0_W6.CV">Active power [kW]</MenuItem>,
              <MenuItem key="valore11" value="Power_Q_3_7_0_W6.CV">Reactive power [kVAR]</MenuItem>,
              <MenuItem key="valore12" value="Power_S_9_7_0_W6.CV">Apparent power [kVA]</MenuItem>
            ]}
          </Select>
        </FormControl>
        <Typography variant="h5"
          sx={{ marginTop: "20px", color: "rgb(42, 182, 131)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
          Historical data
        </Typography> {/*serve per il testo visualizzato in pagina*/}
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}> {/*qui definisco i due componenti dateAndTime*/}
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
              <DateTimePicker sx={{ backgroundColor: "white" }}
                label="End date/time"
                value={valueEnd}
                onChange={handleChangeDateAndTimeEnd}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Box textAlign={"center"} sx={{ marginTop: 5 }}>
          <Button variant="contained" onClick={() => { sendPoweDateStartAndDateEndBackend(); handleSubmitClick() }}> Search</Button> {/*qui definisco il bottone search, dove al click sono collegati le funzioni per mandare i dati al server per eseguire la query(sendSelectBackend(); sendDataStartToBackend(); sendDataEndToBackend();) e la funzione per prendere i dati dalla query e metterli sullo chart (handleSubmitClick())*/}
          {failMessage && <p style={{ color: 'red' }}>Please, fill in the fields above.</p>}
          <Box sx={{ marginTop: '20px', height: '600px', width: '1300px' }}>
            <Line data={chart}></Line> {/*qui definisco il componente chart*/}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}


