import React, { useState } from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SelectChargingSationId from './select/selectChargingStationId'
import Button from '@mui/material/Button';
import Card from './card'
import TableOffers from './table/tableOffers'
import TableWallet from './table/tableWallet'
import ProgressBar from './progressBar'


import TableHomeGrid1 from './table/tableGrid1' //import table
import TableHomeGrid2 from './table/tableGrid2'
import TableDataSource from './table/tableDataSource'
import TableServices from './table/tableServices'
import TableRichieste from './table/tableRichieste'

import SelectForecasted from './select/selectForecasted' //importo menu tendina per forecast
import SelectOptimized from './select/selectOptimized'   //importo menu tendina per optimized
import SelectEndUser from './select/selectEndUser'       //importo menu tendina per end user, sub dashboard

import Chart from './chart' //importo chart

import DateAndTime from './dateAndTime' //importo data e orario per gli chart

import ASMHQ from './ASMHQ'


import './Components.css';



function TabPanel(props) {
  const { children, value, index, ...other } = props;
  //console.log(props)
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  //console.log(index);
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const [valuesub, setValueSub] = useState(0);
  const [setValueDate] = useState();
  const [valueDateStart, setValueDateStart] = useState();
  const [valueDateEnd, setValueDateEnd] = useState();


  const handleChange = (event, newValue) => {
    //console.log(event.value);
    //console.log(newValue)
    setValue(newValue);
    setValueSub(0)
  };
  const handleChange1 = (event, newValue) => {
    //console.log(event.value);
    //console.log(newValue)
    setValueSub(newValue);
  };


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
          <Tab label="Home" {...a11yProps(0)} />
          <Tab label="Historical data" {...a11yProps(1)} />
          <Tab label="Forecasted data" {...a11yProps(2)} />
          <Tab label="Optimized data" {...a11yProps(3)} />
          <Tab label="DSO Dashboard" {...a11yProps(4)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}> {/* home */}
        <Typography variant="h5"
          sx={{ marginTop: "40px", color: "rgb(42, 182, 131)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
          Grid 1 main parameters
        </Typography>
        <TableHomeGrid1 title={'Value'} /> {/*components table*/ }
        <Typography variant="h5"
          sx={{ marginTop: "20px", color: "rgb(42, 182, 131)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
          Grid 2 main parameters
        </Typography>
        <TableHomeGrid2 /> {/*components table*/ }
        <Typography variant="h5"
          sx={{ marginTop: "30px", color: "rgb(42, 182, 131)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
          Data Source
        </Typography>
        <TableDataSource /> {/*components table*/ }
        <Typography variant="h5"
          sx={{ marginTop: "20px", color: "rgb(42, 182, 131)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
          Services
        </Typography>
        <TableServices /> {/*components table*/ }
      </TabPanel>

      <TabPanel value={value} index={1}> {/* historical data */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> {/* sub dashboard historical data */}
          <Tabs value={valuesub} onChange={handleChange1} aria-label="basic example">
            <Tab label="End user" {...a11yProps(0)} />
            <Tab label="ASM HQ" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value={valuesub} index={0}>  {/* end user */}
          <SelectEndUser /> {/*components select*/ }
          <Typography variant="h5"
            sx={{ marginTop: "20px", color: "rgb(42, 182, 131)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
            Historical data
          </Typography>
          <Box className="Inline">
            <DateAndTime label="Start date/time" setValueDate={setValueDate} /> {/*components*/ }
            <DateAndTime label="End date/time" setValueDate={setValueDate} />   {/*components*/ }
          </Box>
          <Chart /> {/*components*/ }
        </TabPanel>

        <TabPanel value={valuesub} index={1}> {/* asm hq */}
          <ASMHQ /> {/*components*/ }
        </TabPanel>
      </TabPanel>

      <TabPanel value={value} index={2}> {/* forecast data*/}
        <SelectForecasted /> {/*components select*/ }
        <Typography variant="h5"
          sx={{ marginTop: "20px", color: "rgb(42, 182, 131)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
          Forecasted data (At the moment these data are not yet available)
        </Typography>
        <Chart />{/*components*/ }
      </TabPanel>

      <TabPanel value={value} index={3}> {/* optimized data */}
        <SelectOptimized /> {/*components select*/ }
        <Typography variant="h5"
          sx={{ marginTop: "20px", color: "rgb(42, 182, 131)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
          Optimized trend (Data are not available)
        </Typography>
        <Box className="Inline">
          <DateAndTime label="Start date/time" setValueDate={setValueDate} />
          <DateAndTime label="End date/time" setValueDate={setValueDate} />
        </Box>
        <Chart />{/*components*/ }
      </TabPanel>
      <TabPanel value={value} index={4}> {/* componenti nuovi */}
      <Box className="Inline">
        <Typography variant="h5"
          sx={{ marginTop: "20px", color: "rgb(0, 0, 0)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
          Creazione di una richiesta di flessibilità energetica
        </Typography>
        <Typography variant="h5"
          sx={{ marginTop: "20px",marginLeft: "20px", color: "rgb(0, 0, 0)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
            Visualizzazione delle richieste
        </Typography>  
        </Box>
        <Box className="Inline">
        <Box //figura 1, etichetta con dateandtime e select
          sx={{
            display: 'flex',
            '& > :not(style)': {
              m: 1,
              width: 400,
              height: 450,
              backgroundColor: "#d3d3d3"
            },
          }}
        >
          <Paper variant="outlined">
            <Box className="Inline">
              <Typography variant="h5"
                sx={{ marginTop: "20px", color: "#000000", fontFamily: "Poppins, Roboto", fontSize: "20px", fontWeight: 700 }}>Start:</Typography>
              <DateAndTime setValueDateStart={setValueDateStart}  />
            </Box>
            <Box className="Inline">
              <Typography variant="h5"
                sx={{ marginTop: "20px", color: "#000000", fontFamily: "Poppins, Roboto", fontSize: "20px", fontWeight: 700 }}>End:</Typography>
              <DateAndTime setValueDateEnd={setValueDateEnd} />
            </Box>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
            </Box>
            <Box className="Inline">
              <Typography variant="h5"
                sx={{ marginTop: "20px", color: "#000000", fontFamily: "Poppins, Roboto", fontSize: "20px", fontWeight: 700 }}>Energy:</Typography>

              <FormControl sx={{ m: 1, width: '25ch', backgroundColor: "white" }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  endAdornment={<InputAdornment position="end">Wh</InputAdornment>}
                  aria-describedby="outlined-weight-helper-text"
                />
              </FormControl>
            </Box>
            <Box className="Inline">
              <Typography variant="h5"
                sx={{ marginTop: "20px", color: "#000000", fontFamily: "Poppins, Roboto", fontSize: "20px", fontWeight: 700 }}>MaxPrice:</Typography>
              <FormControl sx={{ m: 1, width: '25ch', backgroundColor: "white"}} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  endAdornment={<InputAdornment position="end">Token</InputAdornment>}
                  aria-describedby="outlined-weight-helper-text"
                />
              </FormControl>
            </Box>
            <Box className="Inline">
              <Typography variant="h5"
                sx={{ marginTop: "20px", color: "#000000", fontFamily: "Poppins, Roboto", fontSize: "20px", fontWeight: 700 }}>Charging Sation ID:</Typography>
              <SelectChargingSationId /> {/* aggiornare lista */}
            </Box>
            <Button onClick={() => { }} sx={{ marginTop: "20px", marginLeft: "250px" }} variant="contained">Submit</Button>
          </Paper>
        </Box>
        <TableRichieste />
        </Box>

        <Typography variant="h5"
          sx={{ marginTop: "20px", color: "rgb(0, 0, 0)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
          Visualizzazione del portafoglio in token del DSO 
        </Typography> 
        <TableWallet /> {/* quarta figura, tabella, wallet */}

        <Box className="Inline" style={{marginTop: "20px"}}>
        <Typography variant="h5"
          sx={{ marginTop: "20px", color: "rgb(0, 0, 0)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
           Visualizzazione dei dettagli di una richiesta di flessibilità creata
        </Typography> 
        <Typography variant="h5"
          sx={{ marginTop: "20px",marginLeft: "20px", color: "rgb(0, 0, 0)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
            Visualizzazione delle offerte ricevute per la richiesta di flessibilità creata 
        </Typography> 
        </Box>

        <Box className="Inline" style={{marginTop: "20px"}}>

          <Card /> {/* seconda figura, etichetta */}

          <TableOffers /> {/* terza figura, tabella */}
        </Box>

        <Box sx={{ marginLeft: "20px" }}> {/* quinta figura, bottoni */}
        <Typography variant="h5"
          sx={{ marginTop: "20px",marginLeft: "20px", color: "rgb(0, 0, 0)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
            I pulsanti per: chiudere l’asta e far vincere l’offerta migliore, sbloccare il pagamento a seguito della fornitura di flessibilità  
        </Typography> 

          <Button sx={{ marginTop: "20px" }} variant="contained">Get Winning Offer</Button>
          <Button sx={{ marginTop: "20px", marginLeft: "20px" }} variant="contained">Unlock payment</Button>

        </Box>
        <Typography variant="h5"
          sx={{ marginTop: "20px",marginLeft: "20px", color: "rgb(0, 0, 0)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
            Visualizzazione dell’avanzamento della fornitura di flessibilità energetica
        </Typography> 


        <ProgressBar /> {/* sesta figura, progressbar */}

      </TabPanel>
    </Box>
  );
}
