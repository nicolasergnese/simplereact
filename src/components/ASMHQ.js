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

  useEffect(() => { //Per evitare la duplicazione della stampa, utilizzo useEffect che si attiva solo quando power cambia. 
    //console.log(power);
  }, [power]);

  const sendSelectBackend = () => { //funzione per mandare i dati al back-end per la select, menu a tendina
    //console.log("send data")
    fetch('http://localhost:8080/api/power', { //collegamento back-end
      method: 'POST',
      body: JSON.stringify({ power }),
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

  //inizio codice per il DateAndTime
  const [valueStart, setValueStart] = useState(dayjs(new Date())); //setto valore iniziale
  const [valueEnd, setValueEnd] = useState(dayjs(new Date())); //setto valore iniziale

  const handleChangeDateAndTimeStart = (newValue) => { //funzione per settare un nuovo stato;
    setValueStart(newValue);
  };
  const handleChangeDateAndTimeEnd = (newValue) => { //funzione per settare un nuovo stato
    setValueEnd(newValue);
  };

  const sendDataStartToBackend = () => { //funzione per mandara la data al back-end
    //const formattedDate = valueStart.format("YYYY-MM-DD HH:mm:00"); // Formatta la data come necessario
    const formattedDate = valueStart.toDate()

    fetch("http://localhost:8080/api/datetimestart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ datestart: formattedDate }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Gestisci la risposta dal backend
        //console.log("Risposta dal backend:", data);
      })
      .catch((error) => {
        // Gestisci l'errore
        console.error("Errore durante la richiesta al backend:", error);
      });
    //console.log(formattedDate)
  };

  const sendDataEndToBackend = () => { //funzione per mandara la data al back-end
    //const formattedDate = valueEnd.format("YYYY-MM-DD HH:mm:00"); // Formatta la data come necessario
    const formattedDate = valueEnd.toDate()

    fetch("http://localhost:8080/api/datetimeend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dateend: formattedDate }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Gestisci la risposta dal backend
        //console.log("Risposta dal backend:", data);
      })
      .catch((error) => {
        // Gestisci l'errore
        console.error("Errore durante la richiesta al backend:", error);
      });
  };
  //codice finito per il Datetime

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
    if(power==='Power_P_1_7_0_W2.CV') {
      setLabelCharter('Active power [Watt]')
    }
    else if(power==='Power_Q_3_7_0_W2.CV') {
      setLabelCharter('Reactive power [VaR]')
    }
    else if(power==='Power_S_9_7_0_W2.CV') {
      setLabelCharter('Apparent power [Volt Ampere]')
    }
    else if(power==='Power_P_1_7_0_W4.CV') {
      setLabelCharter('Potenza attiva [Watt]')
    }
    else if(power==='Power_Q_3_7_0_W4.CV') {
      setLabelCharter('Reactive power [VaR]')
    }
    else if(power==='Power_S_9_7_0_W4.CV') {
      setLabelCharter('Reactive power [Volt Ampere]')
    }
    else if(power==='Power_P_1_7_0_W5.CV') {
      setLabelCharter('Active power [Watt]')
    }
    else if(power==='Power_Q_3_7_0_W5.CV') {
      setLabelCharter('Reactive power [VaR]')
    }
    else if(power==='Power_S_9_7_0_W5.CV') {
      setLabelCharter('Apparent power [Volt Ampere]')
    }
    else if(power==='Power_P_1_7_0_W6.CV') {
      setLabelCharter('Active power [Watt]')
    }
    else if(power==='Power_Q_3_7_0_W6.CV') {
      setLabelCharter('Reactive power [VaR]')
    }
    else if(power==='Power_S_9_7_0_W6.CV') {
      setLabelCharter('Apparent power [Volt Ampere]')
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
    //console.log(dateTime)
    //console.log(numbers)
  }

  const handleSubmitClick = async () => { //funzione per riempire il charter con il bottone search
    try {
      const response = await fetch("http://localhost:8080/api/chartDateTime", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        let tempDateTime = [];
        let tempValue = [];
        responseData.forEach((element) => {
          tempDateTime.push(element.DateTime); // Accesso al valore DateTime per ogni elemento
          tempValue.push(element.Value);
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

  



  return (
    <Box sx={{ minWidth: 60 }}> {/*box per la prima select, menu a tendina, meter */}
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-label">Meter</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select-meter" value={meter} onChange={handleSelect1Change}>
          <MenuItem value="opzione1">W2</MenuItem>{/*definisco i sensori */}
          <MenuItem value="opzione2">W4</MenuItem>
          <MenuItem value="opzione3">W5</MenuItem>
          <MenuItem value="opzione4">W6</MenuItem>
        </Select>
      </FormControl>
      <Box> {/*box per la seconda select, menu a tendina, power */}
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-simple-select-label">Power</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select-power" value={power} onChange={(event) => setPower(event.target.value)}>
            <MenuItem value="">Select meter</MenuItem> {/*questa è logica per associare ad ogni sensore il proprio tagname */}
            {meter === 'opzione1' && [ 
              <MenuItem key="valore1" value="Power_P_1_7_0_W2.CV">Power P (Potenza attiva [Watt])</MenuItem>,
              <MenuItem key="valore2" value="Power_Q_3_7_0_W2.CV">Power Q (Potenza reattiva [VaR])</MenuItem>,
              <MenuItem key="valore3" value="Power_S_9_7_0_W2.CV">Power S (Potenza apparente [Volt Ampere])</MenuItem>
            ]}
            {meter === 'opzione2' && [
              <MenuItem key="valore4" value="Power_P_1_7_0_W4.CV">Power P (Potenza attiva [Watt])</MenuItem>,
              <MenuItem key="valore5" value="Power_Q_3_7_0_W4.CV">Power Q (Potenza reattiva [VaR])</MenuItem>,
              <MenuItem key="valore6" value="Power_S_9_7_0_W4.CV">Power S (Potenza apparente [Volt Ampere])</MenuItem>
            ]}
            {meter === 'opzione3' && [
              <MenuItem key="valore7" value="Power_P_1_7_0_W5.CV">Power P (Potenza attiva [Watt])</MenuItem>,
              <MenuItem key="valore8" value="Power_Q_3_7_0_W5.CV">Power Q (Potenza reattiva [VaR])</MenuItem>,
              <MenuItem key="valore9" value="Power_S_9_7_0_W5.CV">Power S (Potenza apparente [Volt Ampere])</MenuItem>
            ]}
            {meter === 'opzione4' && [
              <MenuItem key="valore10" value="Power_P_1_7_0_W6.CV">Power P (Potenza attiva [Watt])</MenuItem>,
              <MenuItem key="valore11" value="Power_Q_3_7_0_W6.CV">Power Q (Potenza reattiva [VaR])</MenuItem>,
              <MenuItem key="valore12" value="Power_S_9_7_0_W6.CV">Power S (Potenza apparente [Volt Ampere])</MenuItem>
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
          <Button variant="contained" onClick={() => { sendSelectBackend(); sendDataStartToBackend(); sendDataEndToBackend(); handleSubmitClick() }}> Search</Button> {/*qui definisco il bottone search, dove al click sono collegati le funzioni per mandare i dati al server per eseguire la query(sendSelectBackend(); sendDataStartToBackend(); sendDataEndToBackend();) e la funzione per prendere i dati dalla query e metterli sullo chart (handleSubmitClick())*/}
          <Box sx={{ marginTop: '20px', height: '600px', width: '1300px' }}> 
            <Line data={chart}></Line> {/*qui definisco il componente chart*/}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}


