import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


import TableHomeGrid1 from './table/tableGrid1' //import table
import TableHomeGrid2 from './table/tableGrid2'
import TableDataSource from './table/tableDataSource'
import TableServices from './table/tableServices'

import SelectForecastedAndASMHQ from './selectForecastedAndASMHQ' //importo menu tendina per forecast
import SelectOptimized from './selectOptimized'   //importo menu tendina per optimized
import SelectEndUser from './selectEndUser'       //importo menu tendina per end user, sub dashboard

import Chart from './chart' //importo chart

import DateAndTime from './dateAndTime' //importo data e orario per gli chart




function TabPanel(props) {
  const { children, value, index, ...other } = props;
console.log(props)
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
  const [value, setValue] = React.useState(0);
  const [valuesub, setValueSub] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(event.value);
    console.log(newValue)
    setValue(newValue);
    setValueSub(0)
  };
  const handleChange1 = (event, newValue) => {
    console.log(event.value);
    console.log(newValue)
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
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}> {/* home */}
      <Typography variant="h5"
            sx={{ marginTop: "40px", color: "rgb(42, 182, 131)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
            Grid 1 main parameters
      </Typography>
      <TableHomeGrid1 title = { 'Value'} />
      <Typography variant="h5"
            sx={{ marginTop: "20px", color: "rgb(42, 182, 131)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
            Grid 2 main parameters
      </Typography>
      <TableHomeGrid2/>
      <Typography variant="h5"
            sx={{ marginTop: "30px", color: "rgb(42, 182, 131)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
            Data Source
      </Typography>
      <TableDataSource/>
      <Typography variant="h5"
            sx={{ marginTop: "20px", color: "rgb(42, 182, 131)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
            Services
      </Typography>
      <TableServices/>
      </TabPanel>
      <TabPanel value={value} index={1}> {/* historical data */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> {/* sub dashboard historical data */}
          <Tabs value={valuesub} onChange={handleChange1} aria-label="basic example">
          <Tab label="End user" {...a11yProps(0)} />
          <Tab label="ASM HQ" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={valuesub} index={0}>  {/* end user */}
          <SelectEndUser/>

          <Typography variant="h5"
            sx={{ marginTop: "20px", color: "rgb(42, 182, 131)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
            Historical data
          </Typography>
          <Box sx = {{display : "inline-block", textAlign : "center"}}> {/* importo data e orario per gli chart */}
          <Typography
            sx={{ marginTop: "20px", color: "rgb(255, 0, 0)", fontFamily: "Poppins, Roboto", fontSize: "20px", fontWeight: 700 }}>
              Start date/time
          </Typography>
          <DateAndTime/>
          <Typography
            sx={{ marginTop: "20px", color: "rgb(255, 0, 0)", fontFamily: "Poppins, Roboto", fontSize: "20px", fontWeight: 700 }}>
              End date/time
          </Typography>
          <DateAndTime/>
          </Box>
          <Chart/>
        </TabPanel>
        <TabPanel value={valuesub} index={1}> {/* asm hq */}
        <SelectForecastedAndASMHQ/>
        <Typography variant="h5"
            sx={{ marginTop: "20px", color: "rgb(42, 182, 131)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
            Historical data
        </Typography>
        <Box sx = {{display : "inline-block", textAlign : "center"}}> {/* importo data e orario per gli chart */}
          <Typography
            sx={{ marginTop: "20px", color: "rgb(255, 0, 0)", fontFamily: "Poppins, Roboto", fontSize: "20px", fontWeight: 700 }}>
              Start date/time
          </Typography>
          <DateAndTime/>
          <Typography
            sx={{ marginTop: "20px", color: "rgb(255, 0, 0)", fontFamily: "Poppins, Roboto", fontSize: "20px", fontWeight: 700 }}>
              End date/time
          </Typography>
          <DateAndTime/>
          </Box>
        <Chart/>
        </TabPanel>


      </TabPanel>
      
  
      <TabPanel value={value} index={2}> {/* forecast data*/}
        <SelectForecastedAndASMHQ/>
        <Typography variant="h5"
            sx={{ marginTop: "20px", color: "rgb(42, 182, 131)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
            Forecasted data
        </Typography>
        <Chart/>
      </TabPanel>
      


      <TabPanel value={value} index={3}> {/* optimized data */}
      <SelectOptimized/>
        <Typography variant="h5"
            sx={{ marginTop: "20px", color: "rgb(42, 182, 131)", fontFamily: "Poppins, Roboto", fontSize: "30px", fontWeight: 700 }}>
            Optimized trend
      </Typography>
      <Box sx = {{display : "inline-block", textAlign : "center"}}> {/* importo data e orario per gli chart */}
          <Typography
            sx={{ marginTop: "20px", color: "rgb(255, 0, 0)", fontFamily: "Poppins, Roboto", fontSize: "20px", fontWeight: 700 }}>
              Start date/time
          </Typography>
          <DateAndTime/>
          <Typography
            sx={{ marginTop: "20px", color: "rgb(255, 0, 0)", fontFamily: "Poppins, Roboto", fontSize: "20px", fontWeight: 700 }}>
              End date/time
          </Typography>
          <DateAndTime/>
          </Box>
      <Chart/>
      </TabPanel>
    </Box>
  );
}
